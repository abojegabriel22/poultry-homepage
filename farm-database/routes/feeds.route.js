import express from 'express'
import feedsModel from "../models/feeds.model"
import chalk from 'chalk'

const router = express.Router()

// Create a new feed record
router.post("/", async (req, res) => {
    const {quantity, totalPrice} = req.body
    try{
        const newFeed = new feedsModel({
            quantity,
            totalPrice
        })

        const savedFeed = await newFeed.save()
        console.log(chalk.hex("#00ff00")(savedFeed))
        return res.status(201).json({ message: "Feed record created successfully", data: savedFeed })
    } catch(err) {
        console.log(chalk.hex("#ff2314")(`Error creating feed record: ${err.message}`))
        return res.status(400).json({ message: "Error creating feed record", error: err.message})
    }
})

// get all feed records
router.get("/", async (req, res) => {
    try {
        const feedsData = await feedsModel.find()
        if(feedsData.length === 0){
            return res.status(404).json({
                message: "No records found",
                data: []
            })
        }
        return res.status(200).json({
            message: "Feeds fetched successfully",
            data: feedsData
        })
    } catch(err) {
        console.log(chalk.hex("#ff2314")(`Error fetching feedsData: ${err.message}`))
        return res.status(500).json({
            message: "Error fetching feed records",
            error: err.message
        })
    }
})

export default router