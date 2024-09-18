var mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    hasGivenFeedback: {
        type: Boolean,
        default: false
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;