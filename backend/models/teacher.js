var moongoose = require('mongoose');

const teacherSchema = new moongoose.Schema({
    teacherId: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Teacher = new moongoose.model('Teacher', teacherSchema);

module.exports = Teacher;