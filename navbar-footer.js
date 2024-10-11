// fungsi ini supaya navbar dan footer tidak perlu dicopy copy
const nav = document.querySelector('#nav-bar');
const footer = document.querySelector('#footer');

// Ngeload navbar
fetch('/navbar.html')
  .then(res => res.text())
  .then(data => {
    nav.innerHTML = data;
  })
  .catch(err => console.error('Failed to load navbar:', err));

// Ngeload footer
fetch('/footer.html')
  .then(res => res.text())
  .then(data => {
    footer.innerHTML = data;
  })
  .catch(err => console.error('Failed to load footer:', err));
