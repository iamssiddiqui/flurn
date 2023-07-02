const seatModel = require("../src/model/seatModel")

module.exports = seatPrice = async (seat, seat_identifier) => {
    /* Percentage of seat booked. */
    const class_of = await seatModel.find({seat_class:seatModel.seat_class})
    const booked_by_class = await seatModel.find({seat_identifier:seat_identifier, class:seatModel.seat_class})
    const percentage = (booked_by_class.length/class_of.length)*100
    var price = 0

    /* Get price value according to percentage */
    if (percentage<40){
        if (seatModel.min_price!="NaN"){
            price = seatModel.min_price
        }
        else{
            price = seatModel.normal_price
        }
    }
    else if (percentage>40 && percentage<60){
        if (seatModel.normal_price!="NaN"){
            price = seatModel.normal_price
        }
        else{
            price = seatModel.max_price
        }
    }
    else{
        if (seatModel.max_price!="NaN"){
            price = seatModel.max_price
        }
        else{
            price = seatModel.normal_price
        }
    }
    return price   
}