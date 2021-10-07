var express = require('express');
var router = express.Router();

const Student = require('../models/student');
const Registration = require('../models/resgistration');
const Admin = require('../models/admin');
const Teacher = require('../models/teacher');

router.get('/', async (req, res) => {
    try {
        const students = await Student.find({},{_id:0}).sort({"rollNo":1}).exec();
        res.json(students);
    } catch (err) {
        res.send('Error: ', err);
    }
});

router.post('/', async (req, res) => {
    const register = new Registration({
        'rollNo': req.body.rollNo,
        'password': req.body.password
    });

    const student = new Student({
        'name': req.body.name,
        'rollNo': req.body.rollNo,
    });


    try {
        await register.save();
        await student.save();
        res.send({ 'message': 'Student data saved successfully' });
    } catch (err) {
        res.send({ 'error': 'Error occured during save' });
    }
});

router.get('/student/:id', async function (req, res) {
    
    try{
        const studentInfo = await Student.find({'rollNo': req.params.id});
        res.send(studentInfo);
    }catch(err){
        res.send({"Error": "Error occured during fetching record!!"});
    }
});

router.put('/student/:id', async function (req, res) {
    const filter = { "rollNo": parseInt(req.params.id) };
    try{
        const studentInfo = await Student.findOne(filter);
        studentInfo.hasGivenFeedback = true;
        studentInfo.save();
        res.send(studentInfo);
    }catch(err){
        res.send({"Error": "Error occured during fetching record!!"});
    }
});

router.post('/student/', async (req, res) => {
    try {
        const isResgistered = await Registration.find({ rollNo: req.body.rollNo, password: req.body.password });
        const isNameAvailable = await Student.find({ name: req.body.name });
        if (isResgistered.length > 0 && isNameAvailable.length > 0) {
            if (isResgistered[0].rollNo == req.body.rollNo && isResgistered[0].password === req.body.password)
                res.send({ "registered": true });
            else
                res.send({ "registered": false });
        } else {
            res.send({ "registered": false });
        }
    } catch (err) {
        res.send({ 'error': 'Cannot find this record' });
    }
});

router.post('/admin/', async (req, res) => {
    try {
        const isValidAdmin = await Admin.find({ name: req.body.name, password: req.body.password });
        if (isValidAdmin.length > 0) {
            if (isValidAdmin[0].name === req.body.name && isValidAdmin[0].password === req.body.password)
                res.send({ "registered": true });
            else
                res.send({ "registered": false });
        } else {
            res.send({ "registered": false });
        }
    } catch (err) {
        res.send({ 'error': 'Cannot find this record' });
    }
});

router.get('/teachers', async (req,res)=>{
    try{
        const teacherList = await Teacher.find({},{_id:0}).sort({"teacherId":1}).exec();
        res.send(teacherList)
    } catch(err){
        res.send({'error':'Error occured while fetching teachers data'});
    }
})

router.post('/teacher', async(req,res)=>{
    const teacher = new Teacher({
        'teacherId': req.body.teacherId,
        'name': req.body.name,
        'rating': req.body.rating
    });
    try{
        await teacher.save();
        res.send({ 'message': 'Teacher data saved successfully' });
    }catch(err){
        res.send({'error':'Error occured while saving teachers data'})
    }
});

router.put('/score/:id', async(req,res) =>{
    const filter = { teacherId: parseInt(req.params.id) };
    try{
        const teacherInfo = await Teacher.findOne(filter);
        teacherInfo.rating = Math.floor((teacherInfo.rating + req.body.rating)/2);
        teacherInfo.save();
        res.send(teacherInfo);
    } catch(err){
        res.send(err);
    }
});

router.put('/reset/scores', async(req,res) =>{
    try{
        Teacher.updateMany(
            { },
            { $set: { rating: 0 } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
    } catch(err){
        res.send(err);
    }
});

router.put('/reset/feedback', async(req,res) =>{
    try{
        Student.updateMany(
            { },
            { $set: { hasGivenFeedback: false } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
    } catch(err){
        res.send(err);
    }
});

module.exports = router;