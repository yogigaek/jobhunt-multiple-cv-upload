'use strict';

const validate = require('validate.js')
const { MongoClient } = require('mongodb');
const { dbPass, dbName, dbPort, dbUser, dbHost0, dbHost1, dbHost2, dbSsl } = require("../config/config");
const { postDataPegawai, putDataPegawai } = require('../services/dataPegawai.service');
const DataPegawai = require('../model/dataPegawai.model');

const createDataPegawai = async (req, res) => {
  try {
    let payload = req.body;

    const constraints = {
      NamaLengkap: { presence: true },
      TanggalLahir: { presence: true },
      AlamatLengkap: { presence: true },
      Kodepos: { presence: true }
    };

    const validation = validate(payload, constraints);

    if (validation) {
      throw new Error(JSON.stringify(validation));
    };

    const existingDataPegawai = await DataPegawai.findOne({ NamaLengkap: payload.NamaLengkap });
    if (existingDataPegawai) {
      return res.status(500).json({ message: 'Nama Lengkap already in use' });
    };

    const birthDate = new Date(payload.TanggalLahir);
    const currentDate = new Date();
    const age = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365));

    payload.Umur = age;

    const dataPegawai = await postDataPegawai(payload);
    return res.status(200).json({ status: 200, data: dataPegawai, message: 'Successfully Add Employee Data' });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const viewDataPegawai = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    if (isNaN(skip) || isNaN(limit)) {
      return res.status(400).json({
        message: "Skip and limit are required and must be numbers",
      });
    }

    const matchQuery = {
      isDelete: false,
      isAktif: true,
      ...(req.query.NamaLengkap && {
        NamaLengkap: {
          $regex: req.query.NamaLengkap,
          $options: "i",
        },
      }),
    };

    const query = [
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "sertifikasipegawais",
          let: {
            idPegawai: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$Id_Pegawai", "$$idPegawai"],
                },
              },
            },
            {
              $lookup: {
                from: "bidangs",
                localField: "Id_Bidang",
                foreignField: "_id",
                as: "bidang",
              },
            },
            {
              $unwind: "$bidang",
            },
            {
              $project: {
                _id: 1,
                Id_Pegawai: 1,
                NamaLembaga: 1,
                Id_Bidang: 1,
                namaBidang: "$bidang.namaBidang",
                DokumentasiSertifikat: 1,
                Created_at: 1,
              },
            },
          ],
          as: "sertifikat",
        },
      },
      {
        $unwind: {
          path: "$sertifikat",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          namaLengkap: {
            $first: "$NamaLengkap",
          },
          total: {
            $sum: 1,
          },
          data: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $count: "total",
      },
    ];
    const client = new MongoClient(
      `mongodb://${dbUser}:${dbPass}@${dbHost0}:${dbPort},${dbHost1}:${dbPort},${dbHost2}:${dbPort}/${dbName}?${dbSsl}`
    );
    const coll = client.db(dbName).collection("datapegawais");
    const aggCursor = coll.aggregate(query);
    const [total] = await aggCursor.toArray();
    await aggCursor.close();

    const dataQuery = [
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "sertifikasipegawais",
          let: {
            idPegawai: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$Id_Pegawai", "$$idPegawai"],
                },
              },
            },
            {
              $lookup: {
                from: "bidangs",
                localField: "Id_Bidang",
                foreignField: "_id",
                as: "bidang",
              },
            },
            {
              $unwind: "$bidang",
            },
            {
              $project: {
                _id: 1,
                Id_Pegawai: 1,
                NamaLembaga: 1,
                Id_Bidang: 1,
                namaBidang: "$bidang.namaBidang",
                DokumentasiSertifikat: 1,
                Created_at: 1,
              },
            },
          ],
          as: "sertifikat",
        },
      },
      {
        $unwind: {
          path: "$sertifikat",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          namaLengkap: {
            $first: "$NamaLengkap",
          },
          total: {
            $sum: 1,
          },
          data: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $sort: {
          Created_at: -1,
        },
      },
    ];
    const dataCursor = coll.aggregate(dataQuery);
    const data = await dataCursor.toArray();
    await dataCursor.close();

    return res.status(200).json({
      total: total ? total.total : 0,
      data,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateDataPegawai = async (req, res) => {
  try {
    let payload = req.body;
    let { id } = req.params;

    const constraints = {
      TanggalLahir: { presence: true },
    };

    const validation = validate(payload, constraints);

    if (validation) {
      throw new Error(JSON.stringify(validation));
    };

    const existingDataPegawai = await DataPegawai.findOne({ NamaLengkap: payload.NamaLengkap });
    if (existingDataPegawai) {
      return res.status(500).json({ message: 'Nama Lengkap already in use' });
    };

    const birthDate = new Date(payload.TanggalLahir);
    const currentDate = new Date();
    const age = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365));

    payload.Umur = age;

    try {
      let dataPegawai = await putDataPegawai(id, payload)
      return res.status(200).json({ status: 200, data: dataPegawai, message: "Succesfully Update Data Pegawai" })
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    };

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
};

const deleteDataPegawai = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      isDelete: true,
      isAktif: false
    };

    const result = await DataPegawai.findOneAndUpdate({ _id: id }, updateData);

    if (!result) {
      const error = new Error('Data not found');
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      status: "success",
      message: `Berhasil Menghapus data ${result.NamaLengkap}`
    })
  } catch (error) {
    return res.status(404).json({
      message: error.message || "Internal server error"
    })
  }
};

module.exports = {
  viewDataPegawai,
  createDataPegawai,
  updateDataPegawai,
  deleteDataPegawai,
}