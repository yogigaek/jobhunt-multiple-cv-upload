const XLSX = require('xlsx');
const MongoClient = require('mongodb').MongoClient;
const {dbPass, dbName, dbPort, dbUser, dbHost0, dbHost1, dbHost2, dbSsl, dbColKota } = require("./config/config");

const file = './public/Excel/ms_kota.xls';
const databaseName = dbName;
const collectionName = dbColKota;

async function importData() {
  const workbook = XLSX.readFile(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  const client = await MongoClient.connect(`mongodb://${dbUser}:${dbPass}@${dbHost0}:${dbPort},${dbHost1}:${dbPort},${dbHost2}:${dbPort}/${dbName}?${dbSsl}`, { useUnifiedTopology: true });
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  await collection.insertMany(jsonData);

  client.close();

  console.log('Data imported Kota successfully!');
}

importData();
