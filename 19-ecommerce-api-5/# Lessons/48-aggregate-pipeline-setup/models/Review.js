const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating value'],
    },
    title: {
      type: String,
      required: [true, 'Please provide review title'],
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

// 3. create static method
ReviewSchema.statics.calculateAverageRating = async function (productID) {
  console.log(productID)
}

// 2a.
ReviewSchema.post('save', async function () {
  console.log(`post save hook called`)
  await this.constructor.calculateAverageRating(this.product) // 3b.
})

// 2b.
ReviewSchema.post('remove', async function () {
  console.log(`post remove hook called`)
  await this.constructor.calculateAverageRating(this.product) // 3c.
})

module.exports = mongoose.model('Review', ReviewSchema)
