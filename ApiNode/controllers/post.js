const Post = require("../models/post")

exports.getPosts = (req, res) =>{
    res.json({
        posts: [
            {title: 'First post'},
            {title: "second post"}
        ]
    })
};

exports.createPost = (req, res) => {
    const post = new Post(req.body)
    //console.log("Creating post:", req.body)
    post.save()
    .then(result => {
        res.status(200).json({
            post: result
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}