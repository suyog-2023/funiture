var express = require("express");
var router = express.Router();
var execute = require("./../connection");
var url = require("url");
router.get("/", function (req, res) {
    console.log(req.session);
        res.render("admin/home.ejs");
});




router.get("/manage_furniture", async function (req, res) {
    var furniture = await execute("SELECT * FROM furn_types");
    var obj = { "furniture": furniture }
    res.render("admin/manage_furniture.ejs", obj);
});


router.post("/save_furniture", async function (req, res) {
    var sql = `INSERT INTO furn_types(types) VALUES ('${req.body.furniture_type}')`;
    await execute(sql);
    res.redirect("/admin/manage_furniture");
});

router.get("/show_furniture", async function (req, res) {
    var furniture = await execute("SELECT * FROM furn_types");
    var obj = { "furniture": furniture };
    res.render("admin/show_furniture.ejs", obj);
});

router.post("/show_furniture", async function (req, res) {
    var fname = req.files.furniture_image.name;
    req.files.furniture_image.mv('public/uploads/' + fname);
    

    var re = req.body;
    var sql = `INSERT INTO furniture (furniture_type,furniture_material,furniture_price,furniture_image) VALUES ('${re.furniture_type}', '${re.furniture_material}','${re.furniture_price}','${fname}')`;

    await execute(sql);
    res.redirect("/admin/show_furniture");
});

module.exports = router;