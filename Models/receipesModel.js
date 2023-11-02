const database = require('../Utils/database')

const receipesModels = { // parents bernama carsModel yang menampung method untuk pengolahan database

  // method getAllCars untuk mengambil semua data dari table cars

  getAllReceipes: async () => {
    const request = await database`SELECT * FROM receipts`
    return request
  },

  getRecipesByParams: async (receiptUid) => {
    const request = await database`SELECT * FROM receipts WHERE receipt_uid = ${receiptUid}`
    return request
  }

}

module.exports = receipesModels
