/* imports */
const Article = require('../models/article');
const Comment = require('../models/comments');
const UserModel = require('../models/users');
const sequelize = require('../config/helper');

/* function to create article as a verified user*/
/* POST */
/* /article/create */
const post = async(req, res, next) => {

    if(!req.body.description || !req.body.title || !req.body.subject ){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }

    await sequelize.sync().then(async() => {
        await Article.create({
            posted_by: user.dataValues.email,
            description: req.body.description,
            title: req.body.title,
            subject: req.body.subject,
        })
        .then(async(r) => {
            res.status(200).json({ msg: "article posted"});
        }).catch((e) => {  res.status(200).json({ msg: e.message}) });
    })
}

/* function to add comment to a posted article as a verified user */
/* POST */ 
/* /article/add_comment */
const add_comment = async(req, res, next) => {
    if(!req.body.comment, !req.body.articleId){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }
    
    const article =  await Article.findOne({ where: {id: req.body.articleId}});

    if(article.dataValues.posted_by === user.dataValues.email){
        return res.status(400).json({ msg: "you cannot comment on your code" })
    }

    if(!article){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    await sequelize.sync().then(async() => {
        await Comment.create({
            comment: req.body.comment,
            comment_by: user.dataValues.email,
            parent_id:  req.body.articleId,
        });
    })

    res.status(200).json({ msg: "comment added"});
}

/* function to view a particular comment as a verified user */
/* GET */
/* /article/view_comment */
const view_comments = async(req, res, next) => {

    if(!req.params.commentId){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }

    const comment = await Comment.findOne({ where: {id: req.params.commentId}});

    if(!comment){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    const article =  await Article.findOne({ where: {id: comment.dataValues.parent_id}});

    if(!article){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    res.status(200).json(comment.dataValues);
}

/* finction to view a particular article as a verified user */
/* GET */
/* /article/view_article */
const view_article = async(req, res, next) => {

    if(!req.params.articleId){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }
    
    const article =  await Article.findOne({ where: {id: req.params.articleId}});

    if(!article){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    const comment = await Comment.findAll({ where: {parent_id: req.params.articleId}});

    let commentsList = [];

    for(let i = 0; i < comment.length; i++){
        commentsList.push(comment[i].dataValues);
    }

    res.status(200).json({
        comments: commentsList,
        details: article.dataValues
    });
}

/* function to edit a particular article as a verified user*/
/* PATCH */
/* /article/edit_article */
const edit_article = async(req, res, next) => {

    if(!req.params.articleId || !req.body.description){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }
    
    const article =  await Article.findOne({ where: {id: req.params.articleId}});

    if(!article){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    if(article.dataValues.posted_by !== user.dataValues.email){
        return res.status(301).json({ msg: "you have no permission to edit this article"})
    } 

    await Article.update({
        description: req.body.description
    }, {
        where: { id: article.id }
    }).then(() => {
        res.status(201).json({ msg: "articles updated" });
    }).catch((error) => { res.status(201).json({ msg: error.message }) })
}

/* function to delete a particular article as a verified user */
/* DELETE */
/* /article/delete_article*/
const delete_article = async(req, res, next) => {

    if(!req.body.articleId){
        return res.status(400).json({ msg: "confirm your details"})
    }

    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }
    
    const article =  await Article.findOne({ where: {id: req.body.articleId}});

    if(!article){
        return res.status(400).json({ msg: 'article does not exit'});
    }

    if(article.dataValues.posted_by !== user.dataValues.email){
        return res.status(301).json({ msg: "you have no permission to delete this article"})
    } 

    await Article.destroy({ where: { id: article.id } })
    .then( async() => {
        await Comment.destroy({ where: { parent_id: article.id }})
        .then(() => { res.status(201).json({ msg: "articles deleted" }); })
        
    }).catch((error) => { res.status(201).json({ msg: error.message }) })
}

/* function to view all posted article with their respective comment as a verified user */
/* GET */
/* /article/view_all_article */
const view_all_article = async(req, res, next) => {
    
    const user = await UserModel.findOne({ where: { id: req.header.id }});

    if(!user){
        return res.status(400).json({ msg: 'user does not exit'});
    }
    
    const article =  await Article.findAll();

    const comment = await Comment.findAll({ where: {parent_id: req.body.articleId}});

    console.log(article[0].dataValues);

    let commentsList = [];
    let articlesList = [];

    for(let i = 0; i < article.length; i++){
        const comment = await Comment.findAll(
            { where: {parent_id: article[i].dataValues.id}}
        );

        for(let j = 0; j < comment.length; j++){
            articlesList.push({
                details : article[i].dataValues,
                comments: comment[j].dataValues
            });
        }
    }

    res.status(200).json(articlesList);
}

/* exports */
module.exports = { 
    post, 
    add_comment, 
    view_comments, 
    view_article, 
    edit_article, 
    view_all_article,
    delete_article
}