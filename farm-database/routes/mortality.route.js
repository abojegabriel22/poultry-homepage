
import express from "express"
import mortalityModel from "../models/mortality.model"
import chalk from "chalk"
const router = express.Router()

// post mortality records
router.post("/", async (req, res) => {
    const { mortalityRate, mortalityAge } = req.body

    try{
        const newMortality = new mortalityModel({
            mortalityRate,
            mortalityAge
        })
        await newMortality.save()
        console.log(chalk.hex("#0034ff")(`Mortality recorded successfully: ${newMortality}`))
        return res.status(201).json({ message: "New record of mortality taken:", data: newMortality })
    } catch (err){
        console.log(chalk.hex("#ff2343")(`Error saving mortality record: ${err.message}`))
        return res.status(400).json({ message: "Could not save mortality records, please try again", error: err.message })
    }
})

// get all mortality records 
router.get("/", async (req, res) => {
    try {
        const mortalityRecords = await mortalityModel.find()
        return res.status(200).json({ message: "Mortality records fetched successfully", data: mortalityRecords })

    } catch(err){
        console.log(chalk.hex("#ff2334")(`Error trying to fetch mortality data: ${err.message}`))
        return res.status(500).json({ message: "Error while fetching mortality data:", error: err.message})
    }
})



export default router