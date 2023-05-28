const btns = document.querySelectorAll('.buttonContainer button');
btns.forEach((el, idx) => {
  el.addEventListener('click', () => {
    switch (idx) {
      case 0:
        location.href = 'studentLogin.html';
        break;

      default:
        break;
    }
  });
});
