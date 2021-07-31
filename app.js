//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to Tech Articles, here you can write artiles related to various fields which you love without any difficulties. For writing any article first visit compose page and then start writing article, Onces done with it you can publish it. *Be carefull articles cann't be edited or deleted*";
const aboutContent = "Hello, I am Sachchidanand Singh currently pursuing B.Tech in Chemical Engineering from National Institute of Technology, Warangal.";
const contactContent = "Feel free to contact me through mail ( sach4008@gmail.com ).";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/",function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});
app.get("/home",function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});
app.get("/about",function(req,res){
  res.render("about.ejs", {startingcontent : aboutContent} );
});
app.get("/contact",function(req,res){
  res.render("contact.ejs", {startingcontent : contactContent} );
});
app.get("/compose",function(req,res){
  res.render("compose.ejs");
});
app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});




app.post("/compose",function (req,res) {
  const post = new Post ({
    title : req.body.postTitle,
    content : req.body.postBody
  });
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
