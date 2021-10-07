var express = require('express');
var mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        unique: true
    },
    password: String
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;

