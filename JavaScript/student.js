const btns = document.querySelectorAll('.buttonContainer button');
btns.forEach((el, idx) => {
  el.addEventListener('click', () => {
    switch (idx) {
      case 0:
        location.href = 'studentLogin.html';
        break;
      case 1:
        location.href = 'reservationCheck.html';
        break;
      case 2:
        location.href = 'reservation.html';
        break;
      default:
        reserCancel();
        break;
    }
  });
});

const reserCancel = function () {
  const cancel = document.querySelector('.reservationContainer');
  const cancelBtns = document.querySelectorAll('.checkCancel button');
  cancel.style.display = 'block';

  cancelBtns.forEach((el, idx) => {
    el.addEventListener('click', () => {
      if (idx === 0) {
        cancelBtns[idx].style.display = 'none';
        document.querySelector('.checkCancel p').textContent =
          '예약이 취소 되었습니다.';
      } else {
        cancel.style.display = 'none';
      }
    });
  });
};
