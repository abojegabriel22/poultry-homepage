
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"
import dotenv from "dotenv"
import dbConnect from "./controller/dbController"
import chalk from "chalk"
import * as emoji from 'node-emoji';


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use("/chicken-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// example get api
app.get("/", async (req, res) => {
    res.send("this is database for recording chickens")
})

// port to listen
app.listen(port, async () => {
    await dbConnect()
    console.log(chalk.hex("#00aeffff")(`server listening on port ${port} ${emoji.get('rocket')}`))
})