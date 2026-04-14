const CrudRepository=require('./crud-repository');

const {Sequelize,Op} = require('sequelize');

const {Flight,Airplane,Airport} = require('../models');
const { response } = require('express');
const db = require('../models');
const {addRowLockOnFlights} = require('./queries');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where : filter,
            order:sort,
            include:[
                {
                model:Airplane,
                required:true,
                as : 'airplaneDetail'
            },
            {
                model : Airport,
                required:true,
                as : 'departure_Airport',
                on : {
                    col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=",Sequelize.col("departure_Airport.code"))
                }
               
            },
            {
                model : Airport,
                required:true,
                as: 'arrival_Airport',
                on : {
                    col1 : Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=",Sequelize.col("arrival_Airport.code"))
                }
               
            }
        ]
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec=true) {
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);   
        
        if(+dec ){
            const response =await flight.decrement('totalSeats',{by : seats});
            return response;
        }else{
            const response = await flight.increment('totalSeats',{by : seats});
            return response;
        } 

    }
}

module.exports = FlightRepository;