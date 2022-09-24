const express = require("express");

// Import articles controllers
const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");

// Import comments controller
const { createNewComment } = require("./../controllers/comments");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create articles router
const articlesRouter = express.Router();

/*
 * Testing Routes:
 * GET - POST ->  http://localhost:5000/articles/
 * POST ->        http://localhost:5000/articles/22/comments/
 * GET  ->        http://localhost:5000/articles/search_1?author=2
 * GET  ->        http://localhost:5000/articles/search_2?id=2
 * PUT  ->        http://localhost:5000/articles/2
 * DELETE ->      http://localhost:5000/articles/2
 * DELETE ->      http://localhost:5000/articles
 */

/*
 * Testing Objects:
 * Article: {
    "title":"Hello World",
    "description":"This is for testing",
    "author":"61d17b37d3a54990e227a549"
}

 *  Comment: {
    "comment":"wow",
    "commenter":"61d17b37d3a54990e227a549"
}
 */

articlesRouter.get("/",authentication, getAllArticles);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2", getArticleById);
articlesRouter.post("/",authentication,authorization("CREATE_ARTICLES"), createNewArticle);
articlesRouter.put("/:id", updateArticleById);
articlesRouter.delete("/:id", deleteArticleById);
articlesRouter.delete("/", deleteArticlesByAuthor);

articlesRouter.post(
  "/:id/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);

module.exports = articlesRouter;
