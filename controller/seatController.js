const seatBookingModel = require("../model/seatBookingModel");
const seatModel = require("../model/seatModel")
const seatPrice = require("../seatPrice")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  const isValidBody = function (body) {
    return Object.keys(body).length > 0;
  };



  const createBooking = async function(req, res){
    try{
        let data = req.body;
        let nameRegex = /^[a-zA-Z ]{2,30}$/;
        // let phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/

        if (!isValidBody(data)) {
            return res.status(400).send({status:false, message:"booking details required"})
        }

        let {seat_identifier, name, phone} = data

        if (!isValid(seat_identifier)) {
            return res.status(400).send({status:false, message:"Seat Identifier is required"})
        }

        if (!isValid(name)) {
            return res.status(400).send({status:false, message:"Name is required"})
        }

        if (!name.match(nameRegex))
        return res.status(400).send({
          status: false,
          msg: "Name should have alphabets only",
        });

        if (!isValid(phone)) {
            return res.status(400).send({status:false, message:"Phone Number is required"})
        }

        const phoneInUse = await seatBookingModel.findOne({ phone: phone })
        if (phoneInUse) {
          return res.status(400).send({status:false, message: "phone entered is already in use" })
        }

        const seat = await seatBookingModel.findOne({seat_identifier : seat_identifier})
        //console.log(seat)
    
        /* Check if seat is already booked or not ? */
        if (!seatModel.is_booked) {        
    
            /* Percentage of seat booked. */
            price = await seatPrice(seat, seat_identifier)
        }

        if(seatModel.is_booked == true){
          res.status(400).send({ status: false, msg: "already booked" })
        }

        const createdBooking = await bookedSeatModel.updateOne(data);
        res.status(201).send({ status: true, seat_identifier, "price": price, is_booked: true });
    }

    catch (err) {
        res.status(500).send({status:false, message:err.message})
      }
  }

  
  module.exports.createBooking = createBooking

// module.exports = router
