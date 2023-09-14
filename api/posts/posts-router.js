// implement your posts router here
const express = require('express')
const router = express.Router()

const Posts = require('./posts-model')

router.get('/', (req, res) => {
     Posts.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err=> {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
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

// router.post('/', (req, res) => {
//     Posts.insert(req.body)
//     .then(post => {
//         res.status(201).json(post)
       
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({message: 'There was an error while saving the post to the database'})
//     })
// })

router.post('/', (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.insert({title, contents})
        .then(({id}) => {
            return Posts.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            })
        })
    }
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

// router.delete('/:id', (req, res) => {
//     Posts.remove(req.params.id)
//     .then(count => {
//         if (count > 0) {
//             res.status(200).json({message: "The post has been deleted"})
//             Posts.findById(req.params.id)
//         } else {
//             res.status(404).json({message: 'The post with the specified ID does not exist'})
//         }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({message: 'The post could not be removed'})
//         })

//     })

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Posts.remove(req.params.id)
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed'
        })
    }
})

    router.get('/:id/comments', (req, res) => {
        Comments.findPostComments(req.params.id)
        .then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: "The comments information could not be retrieved"})
        })
    })


module.exports = router