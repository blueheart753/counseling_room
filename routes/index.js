var express = require("express");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
var router = express.Router();

const { OAuth2Client } = require("google-auth-library");

var DBManager = require("../rib/DBmanger");
var AdminDBManager = require("../rib/AdminDBmanger");
// import DBManager from "";
var connection = new DBManager();
var connecting = new AdminDBManager();

connection.connect();
connecting.connect();

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
let getDecodedOAuthJwtGoogle = async (token, res) => {
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
      res.cookie("studentAuth", ticket.payload.sub, { path: "/" });
      connection.executeQuery(`INSERT INTO studentTb (googleKey, student_name, isStudent) VALUES ("${ticket.envelope.kid}", "${ticket.payload.name}", true)`, [], (err, result) => {
        if (err) {
          console.error("Error executing SELECT query:", err);
          return;
        }
        console.log("Query result:", result);
      });

      res.render("studentLogin", { title: "학생 로그인 페이지 | Student Sign In Page" });
      return;
      // return { status: 200, data: ticket.envelope.kid };
      // localStorage.setItem("studentAuth", ticket.envelope.kid);
    } else {
      console.log("fail");
      res.render("studentLogin", { title: "학생 로그인 페이지 | Student Sign In Page" });
    }
    return ticket;
  } catch (error) {
    console.log(error.message);
    res.render("studentLogin", { title: "학생 로그인 페이지 | Student Sign In Page" });
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "WellCome To 상담실 | Counseling Room" });
});

router.get("/studentPage", function (req, res, next) {
  res.render("studentPage", { title: "학생용 페이지 | Student Page" });
});

router.get("/studentLogin", function (req, res, next) {
  res.render("studentLogin", { title: "학생 로그인 페이지 | Student Sign In Page" });
});

router.get("/reservation", function (req, res, next) {
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
    console.log("reservation", reservations);
    // 콜백 함수에서 렌더링하세요
    res.render("reservation", { title: "상담 예약 사이트", reservations });
  });
});

router.post("/reservation", function (req, res, next) {
  if (!!req.cookies.studentAuth) {
    connection.executeQuery(`SELECT * FROM studentTb WHERE googleKey = "${req.cookies.studentAuth}"`, [], (err, result) => {
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

      connection.executeQuery(
        `INSERT INTO reservationTb (student_name, id, reservation_date, reservation_time) VALUES ("${result[0].student_name}", ${result[0].student_id}, "${sqlDate}", "${req.body.time}")`,
        [],
        (err, result) => {
          if (err) {
            console.error("Error executing INSERT query:", err);
            return;
          }
          console.log("Query result:", result);
          res.redirect("/studentPage");
        }
      );
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
    res.render("reservationCheck", { title: "예약 확인 목록 페이지 | Reservation Check List Page", reservations });
  });
});

router.get("/teacherLogin", function (req, res, next) {
  res.render("teacherLogin", { title: "선생님용 로그인 페이지 | Teacher Sign In Page" });
});

router.get("/teacherDashBoard", function (req, res, next) {
  let reservations = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
    seventh: "",
  };

  let student_id = {
    firstId: "",
    secondId: "",
    thirdId: "",
    fourthId: "",
    fifthId: "",
    sixthId: "",
    seventhId: "",
  };

  let studentsName = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    fifthName: "",
    sixthName: "",
    seventhName: "",
  };

  connection.executeQuery(`SELECT * FROM reservationTb join studentTb On reservationTb.id = studentTb.student_id `, [], (err, result) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return;
    }
    console.log("Query result:", result);

    result.forEach((item) => {
      console.log(item.reservation_time);
      let studnets_name = item.student_name;
      reservations[studnets_name] = studnets_name;
      switch (item.reservation_time) {
        case "1교시":
          reservations["firstName"] = studnets_name;
          break;
        case "2교시":
          reservations["secondName"] = studnets_name;
          break;
        case "3교시":
          reservations["thirdName"] = studnets_name;
          break;
        case "4교시":
          reservations["fourthName"] = studnets_name;
          break;
        case "5교시":
          reservations["fifthName"] = studnets_name;
          break;
        case "6교시":
          reservations["sixthName"] = studnets_name;
          break;
        case "7교시":
          reservations["seventhName"] = studnets_name;
          break;
      }
    });

    console.log("teacherDashBoard", reservations);
    // 콜백 함수에서 렌더링하세요
    res.render("teacherDashBoard", { title: "AdminDashBoard", reservations });
  });

  connection.executeQuery(`SELECT * FROM reservationTb join studentTb On reservationTb.id = studentTb.student_id `, [], (err, result) => {
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

    console.log("teacherDashBoard", reservations);
    // 콜백 함수에서 렌더링하세요
    res.render("teacherDashBoard", { title: "AdminDashBoard", reservations });
  });
  connection.executeQuery(`SELECT * FROM reservationTb`, [], (err, result) => {
    result.forEach((item) => {
      const studentId = item.id; // student_id 값을 변수에 저장
      reservations[studentId] = studentId; // 변수 값을 사용하여 reservations 객체에 추가
      switch (item.reservation_time) {
        case "1교시":
          reservations["firstId"] = studentId;
          break;
        case "2교시":
          reservations["secondId"] = studentId;
          break;
        case "3교시":
          reservations["thirdId"] = studentId;
          break;
        case "4교시":
          reservations["fourthId"] = studentId;
          break;
        case "5교시":
          reservations["fifthId"] = studentId;
          break;
        case "6교시":
          reservations["sixthId"] = studentId;
          break;
        case "7교시":
          reservations["seventhId"] = studentId;
          break;
      }
      console.log("teacherDashBoard", studentId);
    });
  });
});

router.post("/teacherLogin", function (req, res, next) {
  const name = req.body.teacher_id;
  const pw = req.body.teacher_pw;
  console.log(name);
  connection.executeQuery(`SELECT EXISTS(SELECT * FROM teacherTb WHERE teacher_name = "${name}" and teacher_password = "${pw}") AS "Teacher"`, [], (err, result) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return;
    }
    const isTeacherExists = result[0]["Teacher"];
    if (isTeacherExists) {
      console.log("login successful");
      res.redirect("/teacherDashboard");
    } else {
      console.log("login failed");
      res.render("/teacherLogin", { title: "선생님 로그인 페이지 | Teacher Sign In Page", error: "Teacher not found" });
    }
  });
  res.render("teacherDashBoard", { title: "선생님 로그인 페이지 | Teacher Sign In Page" });
});

router.post("/studentLogin", function (req, res, next) {
  console.log("logins successful");
  getDecodedOAuthJwtGoogle(req.body.credential, res); // credentials === JWT token
});

router.post("/studentId", function (req, res, next) {
  if (!!req.cookies.studentAuth) {
    console.log(req.body.student_id);
    connection.executeQuery(`UPDATE studentTb SET student_id = ${req.body.student_id}`, [], (err, result) => {
      if (err) {
        console.error("Error executing UPDATE query:", err);
        return;
      }
      console.log("Query result:", result);
      res.redirect("/studentPage");
    });
  }
});

module.exports = router;
