const User = require('../model/user.model')

const getUser = async (email) => {
	try {
		let user = await User.findOne({email}).select('-__v -createdAt -updatedAt -cart_items -token')
		return user
	} catch(e) {
		console.log(e.message)
		throw Error('Error User Retrieved')
	}
}

const postUser = async (payload) => {
	try {
		let user = new User(payload)
		await user.save()
		return user
	} catch(e) {
		console.log(e.message)
		throw Error(e.message)
	}
}

const putUser = async (id, token) => {
	try {
		let user = await User.findByIdAndUpdate(id, token)
		return user
	} catch(e) {
		console.log(e.message)
		throw Error('Error User Updated')
	}
}

const deleteUser = async (token) => {
	try {
		let user = await User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token: token}}, {useFindAndModify: false})
		return user
	} catch(e) {
		console.log(e.message)
		throw Error('Error User Deleted')
	}
}

module.exports = { getUser, postUser, putUser, deleteUser }