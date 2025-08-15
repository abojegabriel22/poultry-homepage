
import express from 'express'
import purchaseModel from '../models/purchase.model.js'
import chalk from 'chalk'


const router = express.Router()

// Create a new purchase record
router.post("/", async (req, res) => {
    const { quantity, price, batchNumber } = req.body
    try {
        // create new purchase record
        const newPurchase = new purchaseModel({
            quantity,
            price,
            batchNumber
        })
        const savedPurchase = await newPurchase.save()
        console.log(chalk.green("Record created and saved success"))
         // Send success response
        return res.status(201).json({
            message: "Purchase record created successfully",
            data: savedPurchase
        })
    
    } catch(err){
        console.error(chalk.hex("#ff2314")(`Error creating purchase record: ${err.message}`))
        return res.status(400).json({message: "Error creating record", error: err.message})
    }
})

// Get all purchase records
router.get("/", async (req, res) => {
    try {
        const purchases = await purchaseModel.find()
        if(purchases.length === 0){
            return res.status(404).json({
                message: "No record found",
                data: []
            })
        }
        return res.status(200).json({
            message: "Purchases fetched successfully",
            data: purchases
        })
    } catch (err) {
        console.error(chalk.hex("#ff2314")(`Error fetching purchases: ${err.message}`))
        return res.status(500).json({
            message: "Error fetching records",
            error: err.message
        })
    }
})

export default router