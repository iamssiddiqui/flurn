const express = require("express");
const router = express.Router()
const Seats = require('../models/seats.js')
const seatPrice = require('../seatPrice.js')
var price;

router.get("/", async(req, res)=> {
    try{
        const seats = await Seats.find()
        console.log(seats)
        res.json(seats) 
    }
    catch(err){
        console.log(err)
    }
})

router.get("/seats/:id", async(req, res)=> {
    try{
        const seat = await Seats.findOne({seat_identifier:req.params["id"]})
        price = await seatPrice(seat, req.body.seat_identifier)
        is_booked = seat.is_booked

        console.log(seat)
        res.json({
            "seat_identifier": req.params["id"],
            "price": price,
            "is_booked": is_booked
        }) 
    }
    catch(err){
        console.log(err)
    }
})

router.post("/:id", async(req, res) => {

    const seats = await Seats.find({seat_identifier:req.params["id"]})
    seats.seat_identifier = req.body.seat_identifier
    seats.class = req.body.class
    seats.minPrice = req.body.minPrice
    seats.maxPrice = req.body.maxPrice
    seats.normalPrice = req.body.normalPrice
    seats.isBooked = req.body.isBooked
    
     new Seats({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
     })

     try{
        const a1 = await seats.save()
        res.json(a1)
     }
     catch(err){
        res.send(err)
     }
})

module.exports = router