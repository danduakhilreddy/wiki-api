const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const ejs=require('ejs');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB");
const articlesSchema={
    title:String,
    content:String
};
const Article=mongoose.model("Article",articlesSchema);
const article=new Article({
    title:"snake",
    content:"this a reptile"
});
article.save();
app.get("/",(req,res)=>{
    console.log("done");
})
//to get all the articles
app.get("/articles",(req,res)=>{
    Article.find().then(
        (foundArticle)=>{
            res.send(foundArticle);
        },
        (err)=>{console.log(err);}
    );
})
app.post("/articles",(req,res)=>{
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save();
    res.send("succesfully inserted")
})
app.delete("/articles",(req,res)=>{
    Article.deleteMany().then(
        (result)=>{
            res.send("deleted sucessfulyy");
        },
        (err)=>{
            console.log(err);
        }
    );
    res.send("sucessfully deleted all articles from the list");
})
app.listen(3000,()=>{
    console.log("server started at port 3000");
})