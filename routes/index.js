var express = require("express");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
var router = express.Router();

const { OAuth2Client } = require("google-auth-library");

var DBManager = require("../rib/DBmanger");
// import DBManager from "";
var connection = new DBManager();

connection.connect();

// connection.executeQuery("SELECT * from studentTb", [], (err, result) => {
//   if (err) {
//     console.error("Error executing SELECT query:", err);
//     return;
//   }
//   console.log("Query result:", result);
// });

// connection.disconnect();

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
const getDecodedOAuthJwtGoogle = async (token, res) => {
  const CLIENT_ID_GOOGLE = "297700983813-6bcnrhkujdtt7sbk4ai0e9jhr90kommk.apps.googleusercontent.com";
  console.log("start auth");

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    // console.log(ticket);

    console.log(ticket);

    if (ticket.payload.hd == "sdh.hs.kr") {
      console.log("success");
      // // 데이터 저장
      res.cookie("studentAuth", ticket.envelope.kid, { path: "/" });
      connection.executeQuery(`INSERT INTO studentTb (googleKey, student_name, isStudent) VALUES ("${ticket.envelope.kid}", "${ticket.payload.name}", true)`, [], (err, result) => {
        if (err) {
          console.error("Error executing SELECT query:", err);
          return;
        }
        console.log("Query result:", result);
      });

      res.render("studentLogin", { title: "Express" });
      return;
      // return { status: 200, data: ticket.envelope.kid };
      // localStorage.setItem("studentAuth", ticket.envelope.kid);
    } else {
      console.log("fail");
      res.render("studentLogin", { title: "Express" });
    }
    return ticket;
  } catch (error) {
    console.log(error.message);
    res.render("studentLogin", { title: "Express" });
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/studentPage", function (req, res, next) {
  res.render("studentPage", { title: "Express" });
});

router.get("/studentLogin", function (req, res, next) {
  res.render("studentLogin", { title: "Express" });
});

router.get("/reservation", function (req, res, next) {
  res.render("reservation", { title: "상담목록" });
});

router.post("/reservation", function (req, res, next) {
  if (!!req.cookies.studentAuth) {
    connection.executeQuery(`SELECT * FROM studentTb WHERE googleKey = "${req.cookies.studentAuth}" `, [], (err, result) => {
      if (err) {
        console.error("Error executing SELECT query:", err);
        return;
      }
      console.log("Query result:", result[0].student_id);
      let currentDate = new Date();

      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, "0");
      let day = String(currentDate.getDate()).padStart(2, "0");

      let sqlDate = year + "-" + month + "-" + day;

      connection.executeQuery(`insert into reservationTb values(${result[0].student_id}, "${sqlDate}", "${req.body.time}")`, [], (err, result) => {
        if (err) {
          console.error("Error executing SELECT query:", err);
          return;
        }
        console.log("Query result:", result);
        res.redirect("/studentPage");
      });
    });
  }
});

router.get("/reservationCheck", function (req, res, next) {
  let reservations = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
    seventh: "",
  };

  connection.executeQuery(`SELECT * FROM reservationTb`, [], (err, result) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return;
    }
    console.log("Query result:", result);

    result.forEach((item) => {
      console.log(item.reservation_time);
      switch (item.reservation_time) {
        case "1교시":
          reservations["first"] = "예약 중";
          break;
        case "2교시":
          reservations["second"] = "예약 중";
          break;
        case "3교시":
          reservations["third"] = "예약 중";
          break;
        case "4교시":
          reservations["fourth"] = "예약 중";
          break;
        case "5교시":
          reservations["fifth"] = "예약 중";
          break;
        case "6교시":
          reservations["sixth"] = "예약 중";
          break;
        case "7교시":
          reservations["seventh"] = "예약 중";
          break;
      }
    });
    console.log("reservationCheck", reservations);
    // 콜백 함수에서 렌더링하세요
    res.render("reservationCheck", { title: "Express", reservations });
  });
});

router.get("/reservation", function (req, res, next) {
  let reservations = {
    first: "12e23242413",
    second: "12e2324243",
    third: "12e23242413",
    fourth: "12e2324243",
    fifth: "12e23242413",
    sixth: "12e23242413",
    seventh: "12e23242413",
  };

  connection.executeQuery(`SELECT * FROM reservationTb`, [], (err, result) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return;
    }
    console.log("Query result:", result);

    result.forEach((item) => {
      console.log(item.reservation_time);
      switch (item.reservation_time) {
        case "1교시":
          reservations["first"] = "예약 중";
          break;
        case "2교시":
          reservations["second"] = "예약 중";
          break;
        case "3교시":
          reservations["third"] = "예약 중";
          break;
        case "4교시":
          reservations["fourth"] = "예약 중";
          break;
        case "5교시":
          reservations["fifth"] = "예약 중";
          break;
        case "6교시":
          reservations["sixth"] = "예약 중";
          break;
        case "7교시":
          reservations["seventh"] = "예약 중";
          break;
      }
    });
    console.log("reservation", reservations);
    // 콜백 함수에서 렌더링하세요
    res.render("reservation", { title: "Express", reservations });
  });
});

router.get("/teacherLogin", function (req, res, next) {
  res.render("teacherLogin", { title: "Express" });
});

router.get("/teacherDashBoard", function (req, res, next) {
  res.render("teacherDashBoard", { title: "Express" });
});

router.post("/studentLogin", function (req, res, next) {
  console.log("logins successful");
  getDecodedOAuthJwtGoogle(req.body.credential, res); // credentials === JWT token
});

router.post("/studentId", function (req, res, next) {
  if (!!req.cookies.studentAuth) {
    connection.executeQuery(`update studentTb set student_id = ${req.body.student_id} where googleKey = "${req.cookies.studentAuth}"`, [], (err, result) => {
      if (err) {
        console.error("Error executing SELECT query:", err);
        return;
      }
      console.log("Query result:", result);
      res.redirect("/studentPage");
    });
  }
});

module.exports = router;
