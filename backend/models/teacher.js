var moongoose = require('mongoose');
const baseUrl = 'mongodb://localhost:27027/Students';

moongoose.connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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