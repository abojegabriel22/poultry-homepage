
import express from "express"
import mortalityModel from "../models/mortality.model"
import chalk from "chalk"
import batchModel from "../models/batch.model"
const router = express.Router()

// post mortality records
router.post("/", async (req, res) => {
    const { mortalityRate, mortalityAge, batchId } = req.body

    try{
        if(!batchId){
            return res.status(400).json({message: "BatchId is required"})
        }
        const batchExists = await batchModel.findById(batchId)
        if(!batchExists){
            return res.status(404).json({message: "Batch does not exist"})
        }
        const newMortality = new mortalityModel({
            mortalityRate,
            mortalityAge,
            batchId
            // purchaseId
        })
        await newMortality.save()
        console.log(chalk.hex("#0034ff")(`Mortality recorded successfully and linked with batchId`))
        return res.status(201).json({ message: "New record of mortality taken:", data: newMortality })
    } catch (err){
        console.log(chalk.hex("#ff2343")(`Error saving mortality record: ${err.message}`))
        return res.status(400).json({ message: "Could not save mortality records, please try again", error: err.message })
    }
})

// get all mortality records 
router.get("/:batchId", async (req, res) => {
    try {
        const mortalityRecords = await mortalityModel.find({batchId: req.params.batchId}).populate("batchId", "name, startDate")
        // const mortalityRecords = await mortalityModel.find()
        if(mortalityRecords.length === 0){
            return res.status(404).json({
                message: "No records found",
                data: []
            })
        }
        return res.status(200).json({ message: "Mortality records fetched successfully", data: mortalityRecords })

    } catch(err){
        console.log(chalk.hex("#ff2334")(`Error trying to fetch mortality data: ${err.message}`))
        return res.status(500).json({ message: "Error while fetching mortality data:", error: err.message})
    }
})



export default router