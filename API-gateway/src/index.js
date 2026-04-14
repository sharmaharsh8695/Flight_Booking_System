const express = require('express');
const raeLimit = require('express-rate-limit');
const {createProxyMiddleware}  = require('http-proxy-middleware');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
const limiter = raeLimit({
    windowMs : 2*60*1000,
    max : 3
})
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/flightsService', createProxyMiddleware({target : ServerConfig.FLIGHT_SERVICE, changeOrigin : true })) 
app.use('/bookingService', createProxyMiddleware({target : ServerConfig.BOOKING_SERVICE, changeOrigin : true })) 

app.use(limiter);
 
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
}); 