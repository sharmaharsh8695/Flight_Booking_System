const axios = require('axios');

const { BookingRepository } = require('../repositories');
const db = require('../models')
const {ServerConfig}= require('../config');
const AppError = require('../utils/errors/app-error.');
const { StatusCodes } = require('http-status-codes');

const{Enums} = require('../utils/common');
const {booked,cancelled,initiated,pending} = Enums.Booking_Status;

const bookingRepository = new BookingRepository();
async function createBooking(data){
            console.log("inside booking services")
    const transaction = await db.sequelize.transaction();
    console.log("transaction made");
    try {
        console.log("calling flight service 3000")
        console.log(`URL IS : ${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${data.flightId}`)
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${data.flightId}`)
        const flightdata = flight.data.data;
        if(data.noOfSeats>flightdata.totalSeats){
            throw new AppError('Required no of seats not available',StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const bilingAmount=data.noOfSeats*flightdata.price; 
        const bookingPayload = {...data, totalCost:bilingAmount};
        const booking = await bookingRepository.createBooking(bookingPayload,transaction);
         
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${data.flightId}/seats`,{
            
             seats:data.noOfSeats
        });
        
        await transaction.commit();
        console.log("leaving booking services")
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }  
} 

async function makePayment(data){
    console.log("inside services");
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId,transaction);
       if(bookingDetails.status == cancelled){
            throw new AppError("booking time expired");
        }
        const bookingTime = new Date();
        const createdTime = new Date(bookingDetails.createdAt);
        if(bookingTime-createdTime>300000){
            console.log("condition not followed");
            await cancelBookig(data.bookingId);
            throw new AppError("booking time expired");
        }
        console.log("back in makepayment")
        if(bookingDetails.totalCost != data.totalCost){
            console.log("amount problem")
            throw new AppError('The amount of the payment doesnt match',StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId != data.userId){
            console.log("user id problem")
            throw new AppError('the user corresponding to the booking doesnt match');
        }
        const response = await bookingRepository.update(data.bookingId,{status:booked},transaction);
        await transaction.commit();
        return response;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelBookig(bookingId){
    const transaction=await db.sequelize.transaction();
    try {
        const bookingDetails=await bookingRepository.get(bookingId,transaction);
        // console.log(bookingDetails)
        if(bookingDetails.status ==cancelled){
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flight/${bookingDetails.flightId}/seats`,{
            seats: bookingDetails.noOfSeats,
            dec:0
        });
        console.log("patch req done");

        await bookingRepository.update(bookingId,{status:cancelled},transaction);
        await transaction.commit();
        
    } catch (error) { 
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings() {
    try {
        console.log("Inside service")
        const time = new Date( Date.now() - 1000 * 300 ); // time 5 mins ago
        const response = await bookingRepository.cancelOldBookings(time);
        
        return response;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    createBooking,
    makePayment,
    cancelOldBookings
}