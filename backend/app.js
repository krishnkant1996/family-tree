let express = require('express');
let HttpStatus = require('http-status-codes');
let bodyParser = require('body-parser');
let { Config,DbConn } = require('./config')
let DBConnection = DbConn.getSqlConnection()
let routes = require('./routes')

var cors = require('cors');

global.DB = DBConnection;
global.HTTP_STATUS = HttpStatus;

let app = express();
app.use(cors());

app.use(bodyParser.json())

routes.initialize(app)
app.listen(process.env.PORT,() => {
    console.log(`APP IS STARTED AT ${process.env.PORT}`)
});