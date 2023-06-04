const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataPegawaiSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    NamaLengkap: {
        type: String,
        maxlength: [75, 'Panjang nama lengkap maximal 75 karakter'],
        required: true
    },
    TanggalLahir: {
        type: Date,
        required: true
    },
    Umur: {
        type: Number,
        maxlength: [3, 'Panjang umur maximal 3 karakter'],
        required: true
    },
    AlamatLengkap: {
        type: String,
        maxlength: [150, 'Panjang Alamat Lengkap maximal 150 karakter'],
        required: true
    },
    Keahlian: {
		type: String,
        maxlength: [74, 'Panjang Keahlian maximal 74 karakter'],
	},
    LevelPekerjaan: {
        type: String,
        enum: ['Entry Level', 'Middle Level', 'Senior Level', 'Managerial Level', 'Executive Level']
    },
    Kd_Provinsi: {
        type: String,
        maxlength: [3, 'Panjang Kode untuk Provinsi maximal 3 karakter'],
        required: true
    },
    Kd_KotaKabupaten: {
        type: String,
        maxlength: [4, 'Panjang Kode untuk Kota Kabupaten maximal 4 karakter'],
        required: true
    },
    Kodepos: {
        type: String,
        maxlength: [5, 'Panjang Kode Pos maximal 5 karakter'],
        required: true
    },
    Created_at: {
        type: Date,
        default: Date.now
    },
    isAktif: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const DataPegawai = mongoose.model('DataPegawai', dataPegawaiSchema);

module.exports = DataPegawai;
