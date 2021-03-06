var express = require('express')
var router = express.Router()
router.use(express.json())
var {
  getReviews,
  getMetadata,
  createReview,
  markHelpful,
  reportReview
} = require('./models/ratingsandreviews.js')
const {
  getQuestions,
  postAnswer,
  postQuestion,
  markQAHR
} = require('./models/QAModels.js')
var {
  getAllProducts,
  getSpecificProduct,
  getStyleOfProduct,
  getRelatedProducts,
  getProductDetailsInfo
} = require('./models/productModels')
const { productSorter } = require('../client/ProductDetails/OnLoadData.js')

//PRODUCTS
router.get(`/products/:productId/styles`, (req, res) => {
  getStyleOfProduct(req.params.productId, (err, product) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got styles of product')
      res.send(product)
    }
  })
})

router.get(`/products/:productId/related`, (req, res) => {
  getRelatedProducts(req.params.productId, (err, product) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got related products')
      res.send(product)
    }
  })
})

router.get('/products/:productId', (req, res) => {
  getSpecificProduct(req.params.productId, (err, product) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got specific product')
      res.send(product)
    }
  })
})

router.get('/products', (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got products')
      res.send(products)
    }
  })
})

//for ProductDetails section
router.get(`/products/:productId/styles/details`, (req, res) => {
  getProductDetailsInfo(req.params.productId, (err, product) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got styles of product')
      let results = productSorter(product)
      res.send(results)
    }
  })
})
//end ProductDetailsSection

//REVIEWS
router.get('/reviews/meta', (req, res) => {
  getMetadata(req.query, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {

      console.log('got the reviews metadata!')
      res.send(result)

    }
  })
})

router.get('/reviews', (req, res) => {
  getReviews(req.query, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got the reviews!:')
      res.send(result)
    }
  })
})

router.post('/reviews', (req, res) => {
  createReview(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('created a review!')
      res.status(201).send('this worked')
    }
  })
})

router.put(`/reviews/:reviewId/helpful`, (req, res) => {
  markHelpful(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('marked as helpful!')
      res.status(204).send('this worked')
    }
  })
})

router.put(`/reviews/:reviewId/report`, (req, res) => {
  reportReview(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('reported a review!')
      res.status(204).send('this worked')
    }
  })
})

//Q&A
router.get(`/qa/questions/:questionId/answers`, (req, res) => {
  res.send('answers')
})
router.get('/qa/questions', (req, res) => {
  getQuestions(req.originalUrl, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('got the questions!')
      res.status(200).send(data)
    }
  })
})

router.post(`/qa/questions/:questionId/answers`, (req, res) => {
  postAnswer(req.originalUrl, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('sent an answer!')
      res.status(201).send(data)
    }
  })
  res.send('add answer')
})

router.post('/qa/questions', (req, res) => {
  //console.log(req.body)
  postQuestion(req.originalUrl, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('sent a question!')
      res.status(201).send(data)
    }
  })
  res.send('add question')
})

router.put(`/qa/questions/:questionId/helpful`, (req, res) => {
  console.log('Marked a question as helpful')
  markQAHR(req.originalUrl, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('marked helpful!')
      res.sendStatus(204)    }
  })
})

router.put(`/qa/questions/:questionId/report`, (req, res) => {
  console.log('reported a question')
  markQAHR(req.originalUrl, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('reported!')
      res.sendStatus(204)    }
  })
})

router.put(`/qa/answers/:answerId/helpful`, (req, res) => {
  console.log('Marked an answer as helpful')
  markQAHR(req.originalUrl, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('marked helpful!')
      res.sendStatus(204)
    }
  })
})

router.put(`/qa/answers/:answerId/report`, (req, res) => {
  console.log('reported an answer')
  markQAHR(req.originalUrl, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      console.log('reported!')
      res.sendStatus(204)    }
  })
})

//CART
router.get(`/cart`, (req, res) => {
  res.send('get cart')
})

router.post(`/cart`, (req, res) => {
  res.send('add to cart')
})

//INTERACTIONS
router.get(`/interactions`, (req, res) => {
  res.send('log interaction')
})

module.exports = router
