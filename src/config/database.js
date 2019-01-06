const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('../../env.json');

//connecting to database
const string_connection = `mongodb://${ env.host }/${ env.database_name }`;
mongoose.connect(string_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
})
    .then(db => console.log('conectada a db'))
    .catch(err => console.log(err));