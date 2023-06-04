const router = require('express').Router();
const authMiddleware = require('../middlewares/police');
const dataPegawaiController = require('../controller/dataPegawai.controller');

router.get('/Masyarakats/pegawai', authMiddleware, dataPegawaiController.viewDataPegawai);

router.post('/Masyarakats/pegawai', authMiddleware, dataPegawaiController.createDataPegawai);

router.put('/Masyarakats/pegawai/:id', authMiddleware, dataPegawaiController.updateDataPegawai);

router.post('/Masyarakats/pegawai/:id', authMiddleware, dataPegawaiController.deleteDataPegawai);

module.exports = router;