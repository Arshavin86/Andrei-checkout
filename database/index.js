const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://localhost/fetcher');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!')
});


const carSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  location: {carLocation: String, airport: String},
  time: { open: Number, close: Number },
  dates: [Date]
});

const Car = mongoose.model('Car', carSchema);

const addCar = (document, callback) => {
  let vehicle = new Car (document);
  vehicle.save((err, result) => {
    if (err) {
      console.log('Failed writing repo in db: ', err);
    } else {
      callback(result);
    }
  })
}

module.exports = {
  addCar: addCar,
  Car: Car
}