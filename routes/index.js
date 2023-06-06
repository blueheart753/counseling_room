var express = require('express');
var router = express.Router();

const { OAuth2Client } = require('google-auth-library');

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
const getDecodedOAuthJwtGoogle = async token => {
  const CLIENT_ID_GOOGLE =
    '297700983813-6bcnrhkujdtt7sbk4ai0e9jhr90kommk.apps.googleusercontent.com';
  console.log('start auth');

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    console.log(ticket);

    return ticket;
  } catch (error) {
    console.log(error.message);
    return { status: 500, data: error };
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/studentPage', function (req, res, next) {
  res.render('studentPage', { title: 'Express' });
});

router.get('/studentLogin', function (req, res, next) {
  res.render('studentLogin', { title: 'Express' });
});

router.get('/reservation', function (req, res, next) {
  res.render('reservation', { title: 'Express' });
});

router.get('/reservationCheck', function (req, res, next) {
  res.render('reservationCheck', { title: 'Express' });
});

router.get('/teacherLogin', function (req, res, next) {
  res.render('teacherLogin', { title: 'Express' });
});

router.get('/teacherDashBoard', function (req, res, next) {
  res.render('teacherDashBoard', { title: 'Express' });
});

router.post('/studentLogin', function (req, res, next) {
  console.log('logins successful');
  const realUserData = getDecodedOAuthJwtGoogle(req.body.credential); // credentials === JWT token
  // console.log(realUserData);
  const token = req.body.token;
  res.render('studentLogin', { title: 'Express' });
});

module.exports = router;
