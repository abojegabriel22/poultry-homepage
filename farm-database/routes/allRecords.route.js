
import express from "express"
import chalk from "chalk"
import salesModel from "../models/sales.model"
import feedsModel from "../models/feeds.model"
import mortalityModel from "../models/mortality.model"
import purchaseModel from "../models/purchase.model"
import vaccineModel from "../models/vaccine.model"
const router = express.Router()

router.get("/:batchId", async (req, res) => {
  try{
      const {batchId} = req.params

      const sales = await salesModel.find({batchId})
      const feeds = await feedsModel.find({batchId})
      const mortalities = await mortalityModel.find({batchId})
      const vaccine = await vaccineModel.find({batchId})
      const purchase = await purchaseModel.find({batchId})
      // const feeds = await feedsModel.find({batchId})

      res.json({
        sales,
        feeds,
        mortalities,
        vaccine,
        purchase
      })
  } catch(err){
    return res.status(500).json({message: "Error fetching batch data", error: err.message})
  }
})


export default router