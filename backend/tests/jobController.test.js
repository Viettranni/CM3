const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Assuming this is the express app
const User = require('../models/userModel');
const Job = require('../models/jobModel');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  // Mongoose connects once to the in-memory MongoDB
  await mongoose.disconnect(); // Ensure no open connections
  await mongoose.connect(uri, {});

  // Create a user in the DB and generate a JWT token
  const user = await User.create({
    name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    phone_number: '123456789',
    gender: 'Male',
    date_of_birth: new Date('1990-01-01'),
    membership_status: 'active',
    address: '123 Street',
    profile_picture: 'profile.jpg'
  });
  
  userId = user._id;
  token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Protected Routes: Job API', () => {
  
  // Test Unprotected Routes (GET all jobs and GET job by ID)
  describe('GET /api/jobs', () => {
    it('should return 200 and an empty array initially', async () => {
      const res = await request(app).get('/api/jobs').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /api/jobs/:id', () => {
    it('should return 404 for a non-existing job ID', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/jobs/${nonExistingId}`).expect(404);
      expect(res.body).toHaveProperty('message', 'Job not found');
    });
  });

  // Test Authentication Middleware
  describe('POST /api/jobs (Protected Route)', () => {
    it('should return 401 if no token is provided', async () => {
      const newJob = {
        title: 'Frontend Developer',
        type: 'Full-time',
        description: 'Develop frontend web applications',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '1234567890',
        },
        location: 'Remote',
        salary: 60000,
        postedDate: new Date(),
        status: 'open',
      };

      const res = await request(app).post('/api/jobs').send(newJob).expect(401);
      expect(res.body).toHaveProperty('error', 'Authorization token required');
    });

    it('should return 401 if an invalid token is provided', async () => {
      const newJob = {
        title: 'Frontend Developer',
        type: 'Full-time',
        description: 'Develop frontend web applications',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '1234567890',
        },
        location: 'Remote',
        salary: 60000,
        postedDate: new Date(),
        status: 'open',
      };

      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', 'Bearer invalidToken')
        .send(newJob)
        .expect(401);
      expect(res.body).toHaveProperty('error', 'Request is not authorized');
    });

    it('should allow creating a job if a valid token is provided', async () => {
      const newJob = {
        title: 'Frontend Developer',
        type: 'Full-time',
        description: 'Develop frontend web applications',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '1234567890',
        },
        location: 'Remote',
        salary: 60000,
        postedDate: new Date(),
        status: 'open',
      };

      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(newJob)
        .expect(201);

      expect(res.body).toHaveProperty('title', newJob.title);
      expect(res.body).toHaveProperty('location', newJob.location);
    });
  });

  describe('PUT /api/jobs/:id (Protected Route)', () => {
    let jobId;

    beforeEach(async () => {
      const job = await Job.create({
        title: 'Backend Developer',
        type: 'Full-time',
        description: 'Develop backend systems',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '1234567890',
        },
        location: 'Remote',
        salary: 70000,
        postedDate: new Date(),
        status: 'open',
      });
      jobId = job._id;
    });

    it('should return 401 if no token is provided', async () => {
      const updatedJob = { title: 'Updated Title' };
      const res = await request(app).put(`/api/jobs/${jobId}`).send(updatedJob).expect(401);
      expect(res.body).toHaveProperty('error', 'Authorization token required');
    });

    it('should update the job with a valid token', async () => {
      const updatedJob = { title: 'Updated Title' };

      const res = await request(app)
        .put(`/api/jobs/${jobId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedJob)
        .expect(200);

      expect(res.body).toHaveProperty('title', 'Updated Title');
    });

    it('should return 404 if job not found', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/jobs/${nonExistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Title' })
        .expect(404);
      expect(res.body).toHaveProperty('message', 'Job not found');
    });
  });

  describe('DELETE /api/jobs/:id (Protected Route)', () => {
    let jobId;

    beforeEach(async () => {
      const job = await Job.create({
        title: 'Frontend Developer',
        type: 'Full-time',
        description: 'Develop frontend systems',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '1234567890',
        },
        location: 'Remote',
        salary: 60000,
        postedDate: new Date(),
        status: 'open',
      });
      jobId = job._id;
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).delete(`/api/jobs/${jobId}`).expect(401);
      expect(res.body).toHaveProperty('error', 'Authorization token required');
    });

    it('should delete the job with a valid token', async () => {
      const res = await request(app)
        .delete(`/api/jobs/${jobId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('message', 'Job removed successfully');
    });

    it('should return 404 if job not found', async () => {
      const nonExistingId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/jobs/${nonExistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(res.body).toHaveProperty('message', 'Job not found');
    });
  });
});
