/* imports */
const express = require('express');
const UserFunctions = require('../controllers/article');
const protect = require('../subscribers/protect');

let articleRoute = express();

/* article route implementation, declaration of routes and its function */
articleRoute.post("/create", protect, UserFunctions.post);
articleRoute.post("/comment", protect, UserFunctions.add_comment);
articleRoute.get("/view_comment/:commentId", protect, UserFunctions.view_comments);
articleRoute.get("/view_article/:articleId", protect, UserFunctions.view_article);
articleRoute.patch("/edit_article/:articleId", protect, UserFunctions.edit_article);
articleRoute.get("/view_all_article", protect, UserFunctions.view_all_article);
articleRoute.delete("/delete_article", protect, UserFunctions.delete_article);

/* exports */
module.exports = articleRoute;