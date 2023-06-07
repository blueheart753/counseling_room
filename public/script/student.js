const btns = document.querySelectorAll(".buttonContainer button");
let isCancel = false;
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

btns.forEach((el, idx) => {
  el.addEventListener("click", () => {
    switch (idx) {
      case 0:
        if (btns[0].textContent === "로그인") {
          location.href = "/studentLogin";
        } else {
          deleteCookie("studentAuth");
          location.reload();
        }
        break;
      case 1:
        location.href = "/reservationCheck";
        break;
      case 2:
        location.href = "/reservation";
        break;
      default:
        reserCancel();
        break;
    }
  });
});

const reserCancel = function () {
  const cancel = document.querySelector(".reservationContainer");
  const cancelBtns = document.querySelectorAll(".checkCancel button");
  cancel.style.display = "block";

  cancelBtns.forEach((el, idx) => {
    el.style.display = "inline";
    el.addEventListener("click", () => {
      if (isCancel) cancelBtns[0].remove();
      if (idx === 0) {
        cancelBtns[idx].style.display = "none";
        document.querySelector(".checkCancel p").textContent = "예약이 취소 되었습니다.";
        isCancel = true;
      } else {
        cancel.style.display = "none";
        isCancel = false;
      }
    });
  });
};

const loginLogout = () => {
  console.log("check login");
  const studentAuth = getCookie("studentAuth");
  if (studentAuth) {
    btns[0].textContent = "로그아웃";
  } else {
    btns[0].textContent = "로그인";
  }
};
const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  console.log(cookies);
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(`${name}=`) === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};
loginLogout();
