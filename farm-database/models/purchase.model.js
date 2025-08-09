
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
    const now = new Date()
    const diffTime = now - this.dateOfPurchase
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
})

const purchaseModel = mongoose.model("purchase", purchaseSchema)
export default purchaseModel