const router = require('express').Router();
const Provience = require('../model/provinsi.model');

router.get('/RegionIndonesia/provinsi', async (req, res) => {
  try {
    let nama = req.query.nama || '';
    nama = nama.toLowerCase();

    const pipeline = [
      {
        $match: { NamaProvinsi: { $regex: nama, $options: 'i' } },
      },
      {
        $group: {
          _id: '$Kd_Provinsi',
          provinsi: { $push: '$$ROOT' },
        },
      },
      {
        $sort: {
           _id: 1 
        }
      }
    ];

    const provinsi = await Provience.aggregate(pipeline);

    res.json({ total: provinsi.length, data: provinsi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
