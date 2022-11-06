const express = require("express")
const app = express()
const articlesRouter = require("./routes/articles")
const mongoose = require("mongoose")

// connect to db
mongoose.connect("mongodb+srv://hardikralhan:Hrio123@cluster0.cl2wpdi.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("db cnnected"))
.catch(err =>console.log(err))

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

app.use('/articles',articlesRouter)

app.get('/',(req,res)=>{
    const articles = [{
        title:"title test",
        createdAt: new Date,
        description:"description test"
    },
    {
        title:"title test",
        createdAt: new Date,
        description:"description test"
    }]
    res.render('articles/index',{articles:articles})   // it automatically goes inside the views folder
})

app.listen(5000)

