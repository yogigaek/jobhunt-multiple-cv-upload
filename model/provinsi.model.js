const mongoose = require('mongoose');

const ProviensSchema = new mongoose.Schema({
  Kd_Provinsi: String,
  NamaProvinsi: String,
  Created_at: Date,
});

const Provience = mongoose.model('provinces', ProviensSchema);

module.exports = Provience;
