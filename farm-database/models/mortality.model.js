
import mongoose from "mongoose"

const mortalitySchema = new mongoose.Schema({
    mortalityRate: {
        type: Number,
        required: true
    },
    mortalityAge: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
            delete ret.id
            if(ret.date){
                // west african time and date 
                ret.date = new Date(ret.date).toLocaleString("en-NG", {timeZone: "Africa/Lagos"})
            } return ret
        }
    },
    toObject: {
        virtuals: true
    }
})

const mortalityModel = mongoose.model("mortality", mortalitySchema)
export default mortalityModel