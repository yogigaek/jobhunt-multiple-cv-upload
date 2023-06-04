const router = require('express').Router();
const authMiddleware = require('../middlewares/police');
const bidang = require('../controller/bidang.controller');

router.get('/Masyarakats/bidang', authMiddleware, bidang.view);
router.post('/Masyarakats/bidang', authMiddleware, bidang.create);
router.put('/Masyarakats/bidang/:id', authMiddleware, bidang.update);
router.delete('/Masyarakats/bidang/:id', authMiddleware, bidang.destroy);

module.exports = router;