var express=require("express");
var router=express.Router();
var execute=require("./../connection");
var url=require("url");
router.get("/",async function(req,res)
{   var furniture_list=await execute("SELECT * FROM furniture");
    var obj={"current_page":"home","furniture_list":furniture_list};
    res.render("user/home.ejs", obj);
});

router.get("/blog", (req, res) => {
    var obj = { "current_page": "blog" };
    res.render("user/blog.ejs", obj);
});
router.get("/contact", (req, res) => {
    var obj = { "current_page": "contact" };
    res.render("user/contact.ejs", obj);
});
module.exports = router;