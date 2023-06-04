'use strict';

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const { getSertifikasiPegawai } = require('../services/sertifikasiPegawai.service');
const SertifikasiPegawai = require('../model/sertifikasiPegawai.model');
const DataPegawai = require('../model/dataPegawai.model');
const Bidang = require('../model/bidang.model');

const createSertifikasiPegawai = async (req, res) => {
    try {
        const idPegawai = req.params.id;
        const payload = req.body;
        const idBidang = payload.Id_Bidang;

        const countSertifikasi = await SertifikasiPegawai.countDocuments({ Id_Pegawai: idPegawai });
        if (countSertifikasi >= 3) {
            return res.status(400).json({ message: "Maximum limit reached for the number of certifications" });
        };

        const createSertifikat = await DataPegawai.findOne({
        _id: idPegawai,
        isDelete: false,
        });

        if (!createSertifikat) {
            return res.status(500).json({ message: "Employee Data Not Found" });
        };

        const bidang = await Bidang.findOne({ _id: idBidang });
        if (!bidang) {
            return res.status(500).json({ message: "Invalid Bidang ID" });
        };

        if (req.file) {
            const imageMaxSize = 5 * 1024 * 1024;

            if (req.file.size > imageMaxSize) {
                throw new Error('Image size must not exceed 5MB.');
            };

            let tmp_path = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let filename = req.file.filename + '.' + originalExt
            let target_path = path.resolve(config.rootPath, `public/images/sertifikasi/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
            src.pipe(dest)

            src.on('end', async () => {
                try {
                    const sertifikasiPegawai = new SertifikasiPegawai({
                        Id_Pegawai: createSertifikat._id,
                        NamaLembaga: payload.NamaLembaga,
                        Id_Bidang: idBidang,
                        DokumentasiSertifikat: filename,
                      });
                    await sertifikasiPegawai.save();
                    console.log(sertifikasiPegawai);
                    return res.status(200).json({ status: 200, data: sertifikasiPegawai, message: "Successfully Add Employee Certification Data" })
                } catch (e) {
                    fs.unlinkSync(target_path)
                    return res.status(400).json({ status: 400, message: e.message });
                }
            });
        } else {
            const sertifikasiPegawai = new SertifikasiPegawai({
                Id_Pegawai: createSertifikat._id,
                NamaLembaga: payload.NamaLembaga,
                Id_Bidang: idBidang,
                DokumentasiSertifikat: filename,
              });
            console.log(sertifikasiPegawai);
            await sertifikasiPegawai.save();
            return res.status(200).json({ status: 200, data: sertifikasiPegawai, message: "Successfully Add Employee Certification Data" })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const deleteSertifikasiPegawai = async (req, res) => {
	let { id } = req.params

	try {
		let sertifikasiPegawai = await SertifikasiPegawai.findByIdAndDelete(id)
		let currentImage = `${config.rootPath}/public/images/sertifikasi/${sertifikasiPegawai.DokumentasiSertifikat}`
		if(fs.existsSync(currentImage)) {
			fs.unlinkSync(currentImage)
		};
		return res.status(200).json({ status: 200, data: sertifikasiPegawai, message: "Succesfully Sertikasi Pegawai Deleted" })
	} catch(e) {
		return res.status(500).json({ status: 500, message: e.message });
	}
};

const viewSertifikasiPegawai = async (req, res, next) => {	
	let { skip = 0, limit = 50 } = req.query

	let sort = {}

	try {
		const count = await SertifikasiPegawai.countDocuments();
		let criteria = {};

		let { sertifikasiPegawai } = await getSertifikasiPegawai(criteria, skip, limit, sort);
		return res.status(200).json({ status: 200, totalData: count, data: sertifikasiPegawai, message: "Successfully Get Sertifikasi Pegawai" });
	} catch(e) {
		return res.status(500).json({ message: e.message });
	}
};


module.exports = {
    createSertifikasiPegawai,
    viewSertifikasiPegawai,
    deleteSertifikasiPegawai
};