const express = require('express');

const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares')
const router = express.Router();

router.post('/',CityMiddlewares.validateCreateRequest,CityController.createCity);// this refers to -> /api/v1/airplanes/

router.delete('/:id',CityController.destroyCity);

router.patch('/',CityController.updateCity);

module.exports = router;