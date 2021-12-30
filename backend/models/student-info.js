var mongoose = require('mongoose');

const StudentInfoSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    stream: String,
    cls: String,
    div: String
});

const StudentInfo = mongoose.model('StudentInfo', StudentInfoSchema);

module.exports = StudentInfo;

