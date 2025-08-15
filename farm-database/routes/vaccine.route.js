
import express from "express"
import vaccineModel from "../models/vaccine.model"
import chalk from "chalk"
const router = express.Router()

// post vaccine and take record
router.post("/", async (req, res) => {
    const { vaccineName, vaccinePrice, quantity } = req.body

    try {
        const newVaccine = new vaccineModel({
            vaccineName,
            vaccinePrice,
            quantity
        })
        const savedVaccine = await newVaccine.save()
        console.log(chalk.hex("#2335ff")(`new vaccine record taken: ${savedVaccine._id}`))
        return res.status(201).json({
            message: "New vaccine record taken successfully",
            data: savedVaccine
        })
    } catch(err){
        console.log(chalk.hex("#ff2335")(`Error saving new vacine record: ${err.message}`))
        return res.status(400).json({
            message: "Error trying to save vaccine record",
            error: err.message
        })
    }
})

// get all vaccine records
router.get("/", async (req, res) => {
    try{
        const vaccineR = await vaccineModel.find()
        if(vaccineR.length === 0){
            return res.status(404).json({
                message: "No records found",
                data: []
            })
        }
        console.log(chalk.hex("#2325ff")(`fetched vaccine records successfully`))
        return res.status(200).json({
            message: "Vaccine records fetched successfully",
            data: vaccineR
        })
    } catch(err){
        console.error(chalk.hex("#ff2435")(`Error fetching vaccine records: ${err.message}`))
        return res.status(500).json({
            message: "Could not fetch vaccine records",
            error: err.message
        })
    }
})

export default router