const commentsModel = require("../models/comments");
const articlesModel = require("../models/articles");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const articleId = req.params.id;
  const { comment } = req.body;
  const newComment = new commentsModel({
    comment,
    commenter: req.token.userId,
  });
  newComment
    .save()
    .then((result) => {
      articlesModel
        .updateOne({ _id: articleId }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createNewComment,
};
