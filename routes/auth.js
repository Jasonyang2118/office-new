const path = require("path");

const express = require("express");

const adminController = require('../controllers/auth');

const router = express.Router();

router.post("/auth/login", adminController.postLogin);
router.get("/", adminController.getLogin);

module.exports = router;