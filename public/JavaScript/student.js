const btns = document.querySelectorAll('.buttonContainer button');
let isCancel = false;
btns.forEach((el, idx) => {
  el.addEventListener('click', () => {
    switch (idx) {
      case 0:
        location.href = '/studentLogin';
        break;
      case 1:
        location.href = '/reservationCheck';
        break;
      case 2:
        location.href = '/reservation';
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
    el.style.display = 'inline';
    el.addEventListener('click', () => {
      if (isCancel) cancelBtns[0].remove();
      if (idx === 0) {
        cancelBtns[idx].style.display = 'none';
        document.querySelector('.checkCancel p').textContent =
          '예약이 취소 되었습니다.';
        isCancel = true;
      } else {
        cancel.style.display = 'none';
        isCancel = false;
      }
    });
  });
};

const loginLogout = function () {
  if (window.student_id != '') {
    btns[0].textContent = '로그아웃';
  } else {
    btns[0].textContent = '로그인';
  }
};
