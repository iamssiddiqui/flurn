const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    seat_identifier:{
        type: String,
        unique: true,
        required: true
    },

    seat_class:{
        type: String,
        required: true
    },

    min_price:{
        type: String,
    },

    max_price:{
        type: String,
    },

    normal_price:{
        type: String,
    },

    is_booked:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model("Bookings", bookingSchema) 