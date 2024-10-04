const requireAuth = require("../middleware/requireAuth");
const express = require("express");
const router = express.Router();

const { loginUser, signupUser, getAllUsers } = require("../controllers/userControllers");
  
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);

router.use(requireAuth);

router.get("/me", getAllUsers);
  
module.exports = router;