const DataPegawai = require('../model/dataPegawai.model');

const getDataPegawai = async (criteria, skip, limit) => {
	try {
		const count = await DataPegawai.find().countDocuments()
		const dataPegawai = await DataPegawai.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).sort({createdAt: -1})
		return data = {dataPegawai, count}
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
};

const showDataPegawai = async (id) => {
	try {
		let dataPegawai = await DataPegawai.findById(id)
		return dataPegawai
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
};

const postDataPegawai = async (payload, filename) => {
	try {
		let dataPegawai = {}
		if (filename) {
			dataPegawai = new DataPegawai({
				...payload,
				image_url: filename
			})	
		} else {
			dataPegawai = new DataPegawai(payload)
		}
		await dataPegawai.save()
		return dataPegawai
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
};

const putDataPegawai = async (id, payload, filename) => {
	try {
		let dataPegawai = {}
		if (filename) {
			dataPegawai = await DataPegawai.findByIdAndUpdate(id, {
				...payload,
				image_url: filename
			}, { new: true, runValidators: true })	
		} else {
			dataPegawai = await DataPegawai.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		}
		return dataPegawai
	} catch(e) {
		console.log(e.message+'db')
		throw Error(e.message)
	}
};

module.exports = { 
	getDataPegawai,
    showDataPegawai,
    postDataPegawai,
    putDataPegawai
};