
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"
import dotenv from "dotenv"
import dbConnect from "./controller/dbController"
import chalk from "chalk"
// import * as emoji from 'node-emoji';
import feedsRoute from "./routes/feeds.route"
// import mortalityRoute from "./routes/mortality.route"
import purchaseRoute from "./routes/purchase.route"
// import salesRoute from "./routes/sales.route"
// import summaryRoute from "./routes/summary.route"
// import vaccinationRoute from "./routes/vaccine.route"


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use("/chicken-api/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// routes
app.use("/chicken-api/feeds", feedsRoute)
// app.use("/chicken-api/mortality", mortalityRoute)
app.use("/chicken-api/purchase", purchaseRoute)
// app.use("/chicken-api/sales", salesRoute)
// app.use("/chicken-api/summary", summaryRoute)
// app.use("/chicken-api/vaccination", vaccinationRoute)

// example get api
app.get("/", async (req, res) => {
    res.send("this is database for recording chickens")
})

// port to listen
app.listen(port, async () => {
    await dbConnect()
    console.log(chalk.hex("#00aeffff")(`server listening on port ${port}`))
})