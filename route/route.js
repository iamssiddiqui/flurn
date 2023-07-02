const express = require("express")

const router = express.Router()

const seatController = require("../controller/seatController")

router.post("/booking", seatController.createBooking)

module.exports = router;