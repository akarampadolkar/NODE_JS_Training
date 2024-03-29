const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
    try{
        const tours = await Tour.find();

        res.status(200).json({
            status : 'Success',        
            results : tours.length,
            tours : {
                tours
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        });
    }
};


// get single tour
exports.getTour = async (req, res) => {
    try{     
      //  Tour.findOne({_id: req.params.id})  
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status : 'Success',
            data :{
                tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        });
    }
};

exports.createTour = async (req, res) => {
    try{
     // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201)
        .json({
            status : 'Success',
            data : {
                tour :  newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message : err
        });
    }

};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
             runValidators: true
        });
         res.status(200).json({
            status : 'Success',
            data :{
                tour
            }
        });
    } catch (err) {
         res.status(400).json({
            status: 'Fail',
            message: err
        });       
    }

};

exports.deleteTour = async (req, res) => {

    try{
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status : 'Success',
            data : null
        });
    } catch(err) {
        res.status(404).json({
            status : 'Fial',
            data : err
        });
    }

};

