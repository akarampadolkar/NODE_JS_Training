const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path :'./config.env'});
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => { console.log('DB Connection Successful!')})
.catch((err) => { console.log('Error', err)});


//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully Loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

//DELETE ALL DATA FROM DB
const deleteData =  async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}