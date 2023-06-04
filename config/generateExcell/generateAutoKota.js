const XLSX = require('xlsx');
const MongoClient = require('mongodb').MongoClient;
const { dbHost, dbName, dbColKota } = require("../config");

const file = '../../public/Excel/ms_kota.xls';
const databaseName = dbName;
const collectionName = dbColKota;

async function importData() {
  const workbook = XLSX.readFile(file);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  const client = await MongoClient.connect(`mongodb://${dbHost}/${dbName}`, { useUnifiedTopology: true });
  const db = client.db(databaseName);
  const collection = db.collection(collectionName);

  await collection.insertMany(jsonData);

  client.close();

  console.log('Data imported Kota successfully!');
}

importData();
