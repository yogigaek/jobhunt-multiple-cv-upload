const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sertifikasiPegawaiSchema = new Schema({
    Id_Pegawai: {
        type: Schema.Types.ObjectId,
        ref: 'DataPegawai',
        required: true
    },
    NamaLembaga: {
        type: String,
        maxlength: [75, 'Panjang nama lembaga maximal 75 karakter'],
        required: true
    },
    Id_Bidang: {
		type: Schema.Types.ObjectId,
		ref: 'Bidang',
        required: true
	},
    
    DokumentasiSertifikat: String,

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

const SertifikasiPegawai = mongoose.model('SertifikasiPegawai', sertifikasiPegawaiSchema);

module.exports = SertifikasiPegawai;
