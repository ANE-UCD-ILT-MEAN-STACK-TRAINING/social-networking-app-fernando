const express = require('express');
// const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/posts');

const extractFile = require('../middleware/file');

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });

router.get("", PostController.getPost);

router.get("/:id", PostController.getPostById);

router.post("", checkAuth, extractFile, PostController.createPost);

router.delete("/:id", checkAuth, PostController.deletePost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// router.post(
//   "",
//   checkAuth,
//   multer({ storage: storage }).single("image"),
//   (req, res, next) => {
//   const url = req.protocol + '://' + req.get('host');
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//     imageURL: url + "/images/" + req.file.filename,
//     creator: req.userData.userId
//   });
//
//     console.log('post path url' + url);
//     console.log('post imagePath: ' + url + "/images/" + req.file.filename)
//     console.log('post path fileName' + req.file.filename);
//     console.log('post path' +JSON.stringify(post));
//
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       post: {
//         ...createdPost,
//         id: createdPost._id
//       }
//     });
//   }).then(console.log("added new record"));
// });
//
// router.get("", (req, res, next) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   let fetchedPosts;
//
//   const postQuery = Post.find();
//   // if input are invalid
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   // Post.find().then((documents) => {
//   //   res.status(200).json({
//   //     message: "Post fetched successfully",
//   //     posts: documents,
//   //   });
//   // });
//   postQuery.find().then((documents) => {
//     fetchedPosts = documents;
//     return Post.count();
//   })
//     .then((count) => {
//       res.status(200).json({
//         message: "Posts fetched successfully!",
//         posts: fetchedPosts,
//         maxPosts: count,
//       })
//     })
// });
//
// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     }
//     else {
//       res.status(404).json({
//         message: 'post not found'
//       });
//     }
//
//   });
// });
//
// router.put('/:id', checkAuth, multer({storage: storage}).single("image"),
//   (req, res, next) => {
//   let imagePath = req.body.imagePath;
//   if (req.file) {
//     const url = req.protocol + '://' + req.get('host');
//     imagePath = url + '/images/' + req.file.filename;
//   }
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//     imagePath: imagePath,
//     creator: req.userData.userId
//   });
//   console.log(post);
//
//   Post.updateOne({_id:req.params.id, creator: req.userData.userId}, post)
//     .then(result => {
//       console.log(result);
//       if (result.nModified > 0) {
//         res.status(200).json({ message: 'Update successful!'});
//       } else {
//         res.status(401).json({ message: 'Not authorize!' });
//       }
//     });
//
// });
//
// router.delete("/:id", checkAuth, (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
//     .then((result) => {
//       console.log(result);
//       if (result > 0) {
//         res.status(200).json({ message: "Post deleted"});
//       } else {
//         res.status(401).json({ message: 'Not Authorized!' });
//       }
//
//   });
// })

module.exports = router;
