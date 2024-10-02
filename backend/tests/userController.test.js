const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Your express app entry point
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
     // Mongoose connects once to the in-memory MongoDB
  await mongoose.disconnect(); // Ensure no open connections
  await mongoose.connect(uri, {});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Helsinki1!", salt);
  
    // Create a user in the DB and generate a JWT token
    const user = await User.create({
      name: 'John Doe',
      username: 'johndoe',
      password: hashedPassword, // You may want to hash this for realism
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

describe('User API', () => {
  
  describe('POST /api/users/signup', () => {
    it('should create a new user and return a token', async () => {
      const newUser = {
        name: 'Jane Doe',
        username: 'janedoe',
        password: 'password123',
        phone_number: '987654321',
        gender: 'Female',
        date_of_birth: new Date('1995-01-01'),
        membership_status: 'active',
        address: '456 Avenue',
        profile_picture: 'profile2.jpg'
      };

      const res = await request(app).post('/api/users/signup').send(newUser).expect(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('username', newUser.username);
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteUser = {
        username: 'janedoe',
        password: 'password123'
      };

      const res = await request(app).post('/api/users/signup').send(incompleteUser).expect(400);
      expect(res.body).toHaveProperty('error', 'Please add all fields');
    });

    it('should return 400 if user already exists', async () => {
      const existingUser = {
        name: 'John Doe',
        username: 'johndoe', // This username already exists
        password: 'password123',
        phone_number: '123456789',
        gender: 'Male',
        date_of_birth: new Date('1990-01-01'),
        membership_status: 'active',
        address: '123 Street',
        profile_picture: 'profile.jpg'
      };

      const res = await request(app).post('/api/users/signup').send(existingUser).expect(400);
      expect(res.body).toHaveProperty('error', 'User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user and return a token', async () => {
      const userLogin = {
        username: 'johndoe',
        password: 'Helsinki1!' // Use the same password you used for signup
      };

      const res = await request(app).post('/api/users/login').send(userLogin).expect(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('username', userLogin.username);
    });

    it('should return 400 for invalid credentials', async () => {
      const invalidLogin = {
        username: 'johndoe',
        password: 'wrongpassword' // Incorrect password
      };

      const res = await request(app).post('/api/users/login').send(invalidLogin).expect(400);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should return 400 for missing credentials', async () => {
      const incompleteLogin = {
        username: 'johndoe'
      };

      const res = await request(app).post('/api/users/login').send(incompleteLogin).expect(400);
      expect(res.body).toHaveProperty('error', 'Illegal arguments: undefined, string');
    });
  });
});
