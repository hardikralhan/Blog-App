const express = require("express");
const { default: mongoose } = require("mongoose");
const Article = require("../models/articles");
const router = express.Router();

router.get('/new',(req,res)=>{   // whenever localhost:5000/articles/new  goes
    res.render('articles/new',{articleCreated : new Article()})   // go to views -> articles -> new.ejs
})

router.get('/:articleId',async (req,res)=>{
    const id = req.params.articleId;
    try{
        const article = await Article.findById(id);
        res.render('articles/show',{article:article})
    }
    catch(e){       // wrong id entered will be redirected to first page
        res.redirect('/')
    }
    
})

router.post('/',async (req,res)=>{
    let articleCreated = new Article({
        _id:mongoose.Types.ObjectId(),
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    try{
        articleCreated = await articleCreated.save()
        res.redirect(`/articles/${articleCreated.id}`)
    }
    catch(e){
        res.render('articles/new', {articleCreated : articleCreated})   // if it doesnt work, it will re render the page to new and old informatiion stored will be saved
    }
    // articleCreated.save()
    // .then(res.redirect(`/articles/${articleCreated.id}`))
    // .catch(res.render('articles/new', {articleCreated : articleCreated}))  // if it doesnt work, it will re render the page to new and old informatiion stored will be saved
})

module.exports = router