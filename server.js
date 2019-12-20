const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path :'./config.env'});

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => { console.log('DB Connection Successful!')})
.catch((err) => { console.log('Error', err)});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port$ : ${port}`);
});