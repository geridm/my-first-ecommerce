function loader () {
  window.addEventListener('load', function () {
    const loader = document.querySelector('.loader')
    loader.classList.add('loader--hidden')
  })
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.remove('nav--black');
    } else {
      nav.classList.add('nav--black');
    }
  });
}

export default loader