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

router.put('/:id', (req, res) => {
    const post = req.body;
    Posts.update(req.params.id, post)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be modified"})
    })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "The post has been deleted"})
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'The post could not be removed'})
        })

    })

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