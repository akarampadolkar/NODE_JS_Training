const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log('Tour is is', val);
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status : 'Fail',
            message : 'Invalid Id'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Missing name or price'
        });
    }
    next();
};

exports.getAllTours =  (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status : 'Success',
        requestAt : req.requestTime,
        results : tours.length,
        tours : tours
    });
};



// get single tour
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);
    //if(id > tours.length) {
       
    res.status(200).json({
        status : 'Success',
        data :{
            tour
        }
    });
};

exports.createTour =  (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id : newId}, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201)
            .json({
                status : 'Success',
                data : {
                    tour :  newTour
                }
            });
        });
};

exports.updateTour = (req, res) => {

    res.status(200).json({
        status : 'Success',
        data :{
            tour : '<Updated here....>'
        }
    });
};

exports.deleteTour = (req, res) => {

    res.status(200).json({
        status : 'Success',
        data : null
    });
};

