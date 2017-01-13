var express = require('express');
var router = express.Router();

/* Initialize the individual routers here */
/******************************/

var userRoute = require('./userRoute');
var categoryRoute = require('./categoryRoute');
var expenseRoute = require('./expenseRoute');
var tagRoute = require('./tagRoute');

/* define routes for each router */
/******************************/

router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/expense', expenseRoute);
router.use('/tag', tagRoute);

module.exports = router;
