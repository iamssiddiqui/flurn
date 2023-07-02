const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const seatBookingSchema = new mongoose.Schema({
    seat_id: {
        type: ObjectId,
        ref:  "Bookings",
    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("SeatBooking", seatBookingSchema)