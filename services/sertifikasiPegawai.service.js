const SertifikasiPegawai = require('../model/sertifikasiPegawai.model');

const getSertifikasiPegawai = async (criteria, skip, limit) => {
	try {
		const count = await SertifikasiPegawai.find().countDocuments()
		const sertifikasiPegawai = await SertifikasiPegawai.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).sort({createdAt: -1})
		return data = {sertifikasiPegawai, count}
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
};

const showSertifikasiPegawai = async (id) => {
	try {
		let sertifikasiPegawai = await SertifikasiPegawai.findById(id)
		return sertifikasiPegawai
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
};

const postSertifikasiPegawai = async (payload, filename) => {
	try {
		let sertifikasiPegawai = null;
		if (filename) {
			sertifikasiPegawai = new SertifikasiPegawai({
				...payload,
				DokumentasiSertifikat: filename
			});
		} else {
			sertifikasiPegawai = new SertifikasiPegawai(payload);
		}
		await sertifikasiPegawai.save();
		return sertifikasiPegawai;
	} catch (e) {
		console.log(e.message);
		throw new Error(e.message);
	}
};

const putSertifikasiPegawai = async (id, payload, filename) => {
	try {
		let sertifikasiPegawai = {}
		if (filename) {
			sertifikasiPegawai = await SertifikasiPegawai.findByIdAndUpdate(id, {
				...payload,
				DokumentasiSertifikat: filename
			}, { new: true, runValidators: true })	
		} else {
			sertifikasiPegawai = await SertifikasiPegawai.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		}
		return sertifikasiPegawai
	} catch(e) {
		console.log(e.message+'db')
		throw Error(e.message)
	}
};

module.exports = { 
	getSertifikasiPegawai,
    showSertifikasiPegawai,
    postSertifikasiPegawai,
    putSertifikasiPegawai
};