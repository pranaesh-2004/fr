var mongoose = require('mongoose');
const baseUrl = 'mongodb://localhost:27017/Students';
mongoose.connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
});
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;