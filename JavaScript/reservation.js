const reservtionButton = document.querySelector('.reservation button');
const select = document.querySelector('#time');
const popupLayer = document.querySelector('.popup');
const user_name = '김미남';
reservtionButton.addEventListener('click', () => {
  const selectTime = select.options[select.selectedIndex].value;
  if (selectTime == 'select') {
    alert(selectTime);
  } else {
    const result = document.querySelector('.Result');
    result.innerHTML = `${user_name}님 <br> ${selectTime} 상담 예약이 완료되었습니다.`;
    popupLayer.style.display = 'flex';
  }
});

const popupBtn = document.querySelectorAll('.popupLayer button');

popupBtn.forEach((el, idx) => {
  el.addEventListener('click', () => {
    switch (idx) {
      case 0:
        location.href = '../public/studentPage.html';
        break;

      default:
        location.href = '../public/reservationCheck.html';
        break;
    }
  });
});
