function addRowLockOnFlights(flightId){
    return `Select 8 from Flights Where Flights.id = ${flightId} For Update`;
}

module.exports ={
    addRowLockOnFlights
}