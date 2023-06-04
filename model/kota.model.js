const mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({
    Kd_Kota: String,
    Kd_Provinsi: String,
    NamaKota: String,
    Created_at: Date,
});

const City = mongoose.model('cities', citiesSchema);

module.exports = City;
