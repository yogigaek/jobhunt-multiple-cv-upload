const router = require("express").Router();
const City = require("../model/kota.model");

router.get("/RegionIndonesia/kota", async (req, res) => {
    try {
        let namaKota = req.query.namaKota || "";
        namaKota = namaKota.toLowerCase();

        let kdProvinsi = req.query.kdProvinsi || "";
        kdProvinsi = kdProvinsi.toLowerCase();

        let query = {};

        if (namaKota) {
            query.NamaKota = { $regex: namaKota, $options: "i" };
        }

        if (kdProvinsi) {
            query.Kd_Provinsi = kdProvinsi;
        }

        const pipeline = [
            { $match: query },
            { $sort: { Kd_Kota: 1 } }
        ];

        const city = await City.aggregate(pipeline);

        res.json({total: city.length, data: city });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

module.exports = router;
