const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const sertifikasiPegawaiController = require('../controller/sertifikasiPegawai.controller');

router.post('/Masyarakats/sertifikasi/:id',
    multer({ dest: os.tmpdir() }).single('DokumentasiSertifikat'),
    sertifikasiPegawaiController.createSertifikasiPegawai
);

router.delete('/Masyarakats/sertifikasi/:id',
	sertifikasiPegawaiController.deleteSertifikasiPegawai
);

router.get('/Masyarakats/sertifikasi', sertifikasiPegawaiController.viewSertifikasiPegawai);

// router.post('/Masyarakats/pegawai/sertifikasi/:id', sertifikasiPegawaiController.deleteSertifikasiPegawai);

module.exports = router;