document.addEventListener('DOMContentLoaded', function () {
  const categoryButtons = document.querySelectorAll('.category-pill');
  categoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      categoryButtons.forEach(function (item) {
        item.classList.remove('active');
        item.classList.remove('btn-success');
        item.classList.add('btn-outline-secondary');
      });
      button.classList.add('active');
      button.classList.remove('btn-outline-secondary');
      button.classList.add('btn-success');
    });
  });

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Thanks for subscribing!');
        input.value = '';
      }
    });
  }
});