const btns = document.querySelectorAll('button');

btns.forEach((el, idx) => {
  el.addEventListener('click', () => {
    if (idx == 0) {
      location.href = './studentPage.html';
    } else {
      location.href = './teacherPage.html';
    }
  });
});
