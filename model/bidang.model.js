const mongoose = require('mongoose');

const BidangSchema = new mongoose.Schema({
	namaBidang: {
		type: String,
		minlength: [3, 'Panjang nama bidang minimal 3 karakter'],
		maxlength: [75, 'Panjang nama bidang maximal 75 karakter'],
		required: [true, 'Nama bidang harus diisi']
	}
})

const Bidang = mongoose.model('Bidang', BidangSchema);

module.exports = Bidang;