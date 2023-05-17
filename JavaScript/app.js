const selectBtn = document.querySelectorAll('.select');

selectBtn.forEach((items, idx) => {
  const exBox = document.querySelectorAll('.examBox');
  selectBtn[idx].addEventListener('mouseenter', () => {
    if (idx == 0) {
      exBox[0].setAttribute('style', 'display:block; opacity:1;');
    } else {
      exBox[1].setAttribute('style', 'display:block; opacity:1');
    }
  });

  selectBtn[idx].addEventListener('mouseleave', () => {
    if (idx == 0) {
      exBox[0].setAttribute('style', 'display:block; opacity:0');
    } else {
      exBox[1].setAttribute('style', 'display:block; opacity:0');
    }
  });
});
