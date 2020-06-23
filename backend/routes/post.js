const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const pic = req.body.pic;
  const name = req.body.name;
  const date = Date.parse(req.body.date);
  const caption = req.body.caption;
  const media = req.body.media
  const likes = Number(req.body.likes)

  const newPost = new Post({
    pic,
    name,
    date,
    caption,
    media,
    likes
  });

  newPost.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then(post => {
        post.pic = req.body.pic;
        post.name = req.body.name;
        post.date = Date.parse(req.body.date);
        post.caption = req.body.caption;
        post.media = req.body.media
        post.likes = Number(req.body.likes)

      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;