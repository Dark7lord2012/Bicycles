'use strict';

(() => {
  // Открытие / закрытие мобильной шапки
  const header = document.querySelector('.header');
  const headerToggle = document.querySelector('.header__toggle');

  header.classList.remove('header--no-js');

  headerToggle.addEventListener('click', () => {
    header.classList.toggle('header--opened');
  });
});
