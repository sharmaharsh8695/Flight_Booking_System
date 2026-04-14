const {StatusCodes} = require('http-status-codes');
const {BookingService} = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common');
const { message } = require('../utils/common/error-response');

const inMemDB = {};
async function createBooking(req,res){
    try {
        console.log("inside booking contoller")
        const response = await BookingService.createBooking({
            flightId : req.body.flightId,
            noOfSeats : req.body.noOfSeats,
            userId : req.body.userId,
        });
        SuccessResponse.data=response;
        console.log("leaving booking contoller")

        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
} 

async function makePayment(req,res){

    try {
        
    const imdempotencyKey = req.headers['x-idempotency-key'];
    if(!imdempotencyKey){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message : 'Idempotency key missing'});
    }
    if(inMemDB[imdempotencyKey]){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message : 'cannot retry on a succesful payment'});
    }
        console.log("inside payment contoller")
        const response = await BookingService.makePayment({
            bookingId : req.body.bookingId,
            totalCost : req.body.totalCost,
            userId : req.body.userId,
        });
        SuccessResponse.data=response;
        console.log("leaving booking contoller")

        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

    module.exports = {
        createBooking,
        makePayment
    }