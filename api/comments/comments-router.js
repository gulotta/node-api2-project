const express = require('express')

const Comments = require('../posts/posts-model')

const router = express.Router()

router.get('/:id', (req, res) => {
    Comments.findCommentById(req.params.id)
    .then(comment => {
        if(comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "The comments information could not be retrieved"})
    })
})

module.exports = router