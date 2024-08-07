const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ name: 'a first wooden table' })
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured } = req.query // get "featured" from query param
  const queryObject = {} // create an object

  // add "featured" to queryObject
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  console.log(queryObject)

  const products = await Product.find(queryObject)

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
