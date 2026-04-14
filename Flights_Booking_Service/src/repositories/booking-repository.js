const { StatusCodes } = require("http-status-codes");
const {Booking} = require("../models");

const AppError = require('../utils/errors/app-error.')
const  CrudRepository = require('./crud-repository');

const {Op}=require('sequelize')
const{Enums} = require('../utils/common');
const {booked,cancelled,initiated,pending} = Enums.Booking_Status;

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }
    

    async createBooking(data,transaction){
        console.log("inside the booking repo");
        const response = await Booking.create(data,{transaction:transaction});
        console.log("leaving repo")
        return response;
    }
    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }


    async cancelOldBookings(timestamp) {
        console.log("in repo")
        const response = await Booking.update({status: cancelled},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    }, 
                    {
                        status: {
                            [Op.ne]: booked
                        }
                    },
                    {
                        status: {
                            [Op.ne]: cancelled
                        }
                    }
                ]
                
            }
        });
        return response;
    }
}
module.exports = 
    BookingRepository
