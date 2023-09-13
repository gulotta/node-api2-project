// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req)
    .then(post => {
        res.status(200).json(post)
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
       if (post) {
        res.status(200).json(post)
       } else {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
       }
    })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post)
       
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'There was an error while saving the post to the database'})
    })
})



module.exports = router