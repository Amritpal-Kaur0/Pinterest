var express = require('express');
var router = express.Router();
const User = require('./users');
const Post = require('./posts');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(User.authenticate()));
const upload=require('./multer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  const errors=req.flash('error');
  console.log("data sent" ,{error:errors});
  res.render('login', {error:errors});
});

router.get('/feed', function(req, res, next) {
  res.render('feed');
});


router.get('/profile',isLoggedIn, async function(req, res, next) {
  const user=await User.findOne({
    username:req.session.passport.user
  }).populate('posts');
  console.log(req.user);
  res.render('profile',{user});
});

router.post('/register',(req,res)=>{
  const {username,email,fullname}=req.body;
  let userData= new User({
    username,email,fullname
  })
  User.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
  })
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true,
}),(req,res)=>{
})

router.post('/upload',isLoggedIn,upload.single('file'),async(req,res)=>{
 if(!req.file){
   res.status(404).send(" No File were uploaded");
 }
//the file we uploaded save it as a post and give its post id to the user and post id should get saved in user's post array
const user=await User.findOne({username:req.session.passport.user});
const postData= await Post.create({
  image:req.file.filename,
  user:user._id,
  postText:req.body.caption,
})
  user.posts.push(postData._id);
  await user.save();  
  res.redirect('/profile');

} ) 


//logout
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
