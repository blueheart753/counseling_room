const btns = document.querySelectorAll('.btn');
const cancelBtns = document.querySelectorAll('.checkCancel button');
let isCancel = false;

btns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    if (idx === 1) {
      reserCancel();
    }
  });
});

function reserCancel() {
  const cancel = document.querySelector('.reservationContainer');
  cancel.style.display = 'block';

  cancelBtns.forEach((cancelBtn, idx) => {
    cancelBtn.style.display = 'inline';
    cancelBtn.addEventListener('click', () => {
      if (isCancel) cancelBtns[0].remove();
      if (idx == 0) {
        cancelBtn.style.display = 'none';
        document.querySelector('.checkCancel p').textContent =
          '예약이 취소되었습니다.';
        isCancel = true;
        cancelBtns[0].style.display = 'none'; // '예약 취소' 버튼 숨김
      } else {
        cancel.style.display = 'none';
        isCancel = false;
        cancelBtns[0].style.display = 'inline'; // '예약 취소' 버튼 보이기
      }
    });
  });
}
