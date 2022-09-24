const articlesModel = require("../models/articles");

// This function returns the articles
const getAllArticles = (req, res) => {
  const userId = req.token.userId;
  articlesModel
    .find({})
    .populate("comments")
    .then((articles) => {
      if (articles.length) {
        res.status(200).json({
          success: true,
          message: `All the articles`,
          userId: userId,
          articles: articles,
          comments: articles.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Articles Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {
  let authorName = req.query.author;

  articlesModel
    .find({ author: authorName })
    .then((articles) => {
      if (!articles.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${authorName} has no articles`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the articles for the author: ${authorName}`,
        articles: articles,
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

// This function returns article by its id
const getArticleById = (req, res) => {
  let id = req.query.id;
  articlesModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The article is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The article ${id} `,
        article: result,
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

// This function creates new article
const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const newArticle = new articlesModel({
    title,
    description,
    author: req.token.userId,
  });

  newArticle
    .save()
    .then((article) => {
      res.status(201).json({
        success: true,
        message: `Article created`,
        article: article,
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

// This function updates article by its id
const updateArticleById = (req, res) => {
  const _id = req.params.id;

  articlesModel
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article: ${_id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Article updated`,
        article: result,
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

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  articlesModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Article deleted`,
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

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;

  articlesModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Deleted articles for the author: ${author}`,
        result,
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
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
