
import mongoose from "mongoose"

const purchaseSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pricePerChick: {
        type: Number,
        default: 0,
    },
    batchNumber: {
        type: Number,
        required: true
    },
    dateOfPurchase: {
        type: Date,
        default: Date.now,
    },
},{
    toJSON: { virtuals: true, versionKey: false, transform: (_, ret) => {
      delete ret.id // remove duplicate id
      if(ret.dateOfPurchase){
        // convert dateOfPurchase to local time
        ret.dateOfPurchase = new Date(ret.dateOfPurchase).toLocaleString("en-NG", {timeZone: "Africa/Lagos"})
      }
      return ret
  }},
    toObject: { virtuals: true } // include virtuals when converting to object
})

// Pre-save middleware to calculate fields automatically
purchaseSchema.pre("save", function (next) {
  // Auto-calculate pricePerChick before saving
  if (this.quantity && this.price) {
    this.pricePerChick = this.price / this.quantity;
  }
  next();
});

purchaseSchema.virtual("daysSincePurchase").get(function () {
    if (!this.dateOfPurchase) return 0

    // Get local time for both now and dateOfPurchase
    const now = new Date()
    const purchaseDate = new Date(this.dateOfPurchase)

    // Adjust to system's local timezone by using toLocaleString and then back to Date
    const localNow = new Date(now.toLocaleString())
    const localPurchaseDate = new Date(purchaseDate.toLocaleString())

    const diffTime = localNow - localPurchaseDate

    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
})

const purchaseModel = mongoose.model("purchase", purchaseSchema)
export default purchaseModel