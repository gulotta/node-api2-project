// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req)
    .then(posts => {
        res.status(200).json(posts)
    })
})

module.exports = router