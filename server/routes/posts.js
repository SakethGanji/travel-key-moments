const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { Post, User } = new PrismaClient();

router.get('/', async (req, res) => {
    const posts = await Post.findMany()
    res.json(posts)
})

router.get('/:user_id', async (req, res) => {

    const { user_id } = req.params

    let posts = await Post.findMany({
        where: {
            user_id: Number(user_id)
        }, select: {
            title: true,
            createdAt: true,
            post: true,
            user: true,
        }
    });

    res.send(posts);
})

router.post('/', async (req, res) => {

    const { title, user_id, content, rating, longitude, latitude } = req.body;

    let userExists = await User.findUnique({
        where: {
            id: user_id
        }
    });
    if(!userExists) {
        return res.status(400).json({
            msg: "user not found"
        })
    }

    let newPost = await Post.create({
        data: {
            title,
            user_id,
            post: content,
            rating,
            longitude,
            latitude
        }
    });

    res.json(newPost)
});

module.exports = router