const express = require('express');

const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares')
const router = express.Router();

router.post('/',FlightMiddlewares.validateCreateRequest,FlightController.createFlight);// this refers to -> /api/v1/airplanes/

router.get('/',FlightController.getAllFlights);

router.get('/:id',FlightController.getFlight);

router.patch('/:id/seats',FlightMiddlewares.validateUpdateRequest,FlightController.updateSeats);

module.exports = router;