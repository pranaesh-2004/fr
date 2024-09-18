
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 8000;
const studentsRouter = require('./routing/route');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function () {
    console.log('Connected Successfully');
});

const baseUrl = 'mongodb://localhost:27017/Students';
mongoose.connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        return res.status(200).json({});
    }
    next();
});

// app.use(cors());
app.use('/students', studentsRouter);

app.listen(port, () => { console.log(`Serving on port : ${port}`) });

