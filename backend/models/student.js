var mongoose = require('mongoose');
const baseUrl = 'mongodb://localhost:27017/Students';
mongoose.connect(baseUrl, {useNewUrlParser: true, 
useUnifiedTopology: true});

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