'use strict';

(() => {
  // Открытие / закрытие мобильной шапки
  const header = document.querySelector('.header');
  const headerToggle = document.querySelector('.header__toggle');
  header.classList.remove('header--no-js');

  headerToggle.addEventListener('click', () => {
    header.classList.toggle('header--opened');
    const body = document.querySelector('body');
    const selector = 'input, button:not(.header__toggle), .header__nav>a:not(a[href])';
    const interactiveElements = document.querySelectorAll(selector);
    const headerNav = document.querySelectorAll('header_nav a');

    // Закрытие меню по нажатию Esc
    const onToggleHeaderPressEsc = (evt) => {
      if (evt.key == 'Escape') {
        evt.preventDefault();
        header.classList.remove('header--opened');
        headerToggle.removeEventListener('keydown', onToggleHeaderPressEsc);
      }
    };

    if (header.classList.contains('header--opened')){
      header.addEventListener('keydown', onToggleHeaderPressEsc);
      body.style.overflow = "hidden";
      body.style.height = "100vh";

      for (let i of interactiveElements) {
        i.tabIndex = -1;
      };

      for (let j of headerNav) {
        j.tabIndex = -1;
      }
    }

    body.style.overflow = "auto";
    body.style.height = "auto";

    for (let i of interactiveElements) {
      i.tabIndex = 0;
    };

    for (let j of headerNav) {
      j.tabIndex = -1;
    }
  });

  // Маска для телефона
  Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);

  function applyDataMask(field) {
    var mask = field.dataset.mask.split('');

    // For now, this just strips everything that's not a number
    function stripMask(maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    }

    // Replace `_` characters with characters from `data`
    function applyMask(data) {
        return mask.map(function(char) {
            if (char != '_') return char;
            if (data.length == 0) return char;
            return data.shift();
        }).join('')
    }

    function reapplyMask(data) {
      return applyMask(stripMask(data));
    }

    function changed() {
      var oldStart = field.selectionStart;
      var oldEnd = field.selectionEnd;

      field.value = reapplyMask(field.value);

      field.selectionStart = oldStart;
      field.selectionEnd = oldEnd;
    }

    field.addEventListener('click', changed);
    field.addEventListener('keyup', changed);
  }
})();
