const { getBidang, postBidang, putBidang, deleteBidang } = require('../services/bidang.service');

const view = async (req, res, next) => {
	try {
		let bidang = await getBidang()
		return res.status(200).json({ status: 200, total: bidang.length, data: bidang, message: "Succesfully Get Bidang" })
	} catch(e) {
		return res.status(500).json({ status: 500, message: e.message });
	}
};

const create = async (req, res, next) => {
	let payload = req.body

	try {
		let bidang = await postBidang(payload)
		return res.status(200).json({ status: 200, data: bidang, message: "Succesfully Create New Bidang" })
	} catch(e) {
		return res.status(500).json({ status: 500, message: e.message });
	}
};

const update = async (req, res, next) => {
	let payload = req.body;
	let id  = req.params.id;

	try {
		let bidang = await putBidang(id, payload)
		return res.status(200).json({ status: 200, data: bidang, message: "Succesfully Update Bidang" })
	} catch(e) {
		return res.status(500).json({ status: 500, message: e.message });
	}
};

const destroy = async (req, res, next) => {
	let id  = req.params.id

	try {
		let bidang = await deleteBidang(id)
		return res.status(200).json({ status: 200, data: bidang, message: "Succesfully Deleted Bidang" })
	} catch(e) {
		return res.status(500).json({ status: 500, message: e.message });
	}
};

module.exports = { view, create, update, destroy }