const Bidang = require('../model/bidang.model');

const getBidang = async (keyword) => {
	try {
		let bidang = await Bidang.find(keyword)
		return bidang
	} catch(e) {
		throw Error(e.message);
	}
}

const postBidang = async (payload) => {
	try {
		let bidang = new Bidang(payload)
		await bidang.save()
		return bidang
	} catch(e) {
		throw Error(e.message);
	}
}

const putBidang = async (id, payload) => {
	try {
		let bidang = await Bidang.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		return bidang
	} catch(e) {
		throw Error(e.message);
	}
}

const deleteBidang = async (id) => {
	try {
		let bidang = await Bidang.findByIdAndDelete(id)
		return bidang
	} catch(e) {
		throw Error(e.message);
	}
}

module.exports = { getBidang, postBidang, putBidang, deleteBidang }