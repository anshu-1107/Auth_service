const express = require("express")
const UserController = require("../../controllers/user_controller")

const router = express.Router();

router.post('/signup',UserController.create)
router.get('/user/:id',UserController.getById)

module.exports = router;