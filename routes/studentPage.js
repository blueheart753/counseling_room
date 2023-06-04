var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("studentPage", { title: "학생 예약 페이지" });
});

module.exports = router;
