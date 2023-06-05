const reservtionButton = document.querySelector(".reservation button");
const select = document.querySelector("#time");
const popupLayer = document.querySelector(".popup");
const user_name = "김미남";
reservtionButton.addEventListener("click", () => {
  const selectTime = select.options[select.selectedIndex].value;
  if (selectTime == "select") {
    alert("시간대를 선택해주세요");
  } else {
    const result = document.querySelector(".Result");
    result.innerHTML = `${user_name}님 <br> ${selectTime} 상담 예약이 완료되었습니다.`;
    popupLayer.style.display = "flex";
  }
});

const popupBtn = document.querySelectorAll(".popupLayer button");

popupBtn.forEach((el, idx) => {
  el.addEventListener("click", () => {
    switch (idx) {
      case 0:
        location.href = "studentPage";
        break;

      default:
        location.href = "reservationCheck";
        break;
    }
  });
});
