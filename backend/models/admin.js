var mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
});
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;