var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '상담실 | Counseling Room' });
});

router.get('/', function (req, res, next) {
  res.render('studentPage', { title: '학생용 예약 사이트' });
});

module.exports = router;
