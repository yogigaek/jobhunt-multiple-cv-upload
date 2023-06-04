const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

module.exports = {
	rootPath: path.resolve( __dirname, '..'),
	secretkey: process.env.SECRET_KEY,
	serviceName: process.env.SERVICE_NAME,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbColProv: process.env.DB_COL_PROV,
	dbColKota: process.env.DB_COL_KOTA,
}