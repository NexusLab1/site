// Анимация при прокрутке
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Если это терминал — запускаем печать
        if (entry.target.id === 'terminal') {
          setTimeout(() => {
            typeHTMLCode();
          }, 500);
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

// Печать HTML в терминале
function typeHTMLCode() {
  const terminal = document.getElementById('terminal-code');
  const cursor = document.querySelector('.terminal-cursor');
  
  if (!terminal || terminal.hasAttribute('data-typed')) return;
  terminal.setAttribute('data-typed', 'true');

  const codeLines = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Космос веб-студия</title>',
    '  <link rel="stylesheet" href="css/style.css">',
    '</head>',
    '<body>',
    '  <header class="hero">',
    '    <h1>Разработка сайтов с высокой конверсией</h1>',
    '    <button>Заказать сайт</button>',
    '  </header>',
    '  <!-- Строящийся космический лендинг -->',
    '  <script src="js/script.js"></script>',
    '</body>',
    '</html>'
  ];

  let currentLine = 0;
  let currentChar = 0;
  let fullText = '';
  const speed = 30;

  function typeNext() {
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      if (currentChar < line.length) {
        fullText += line[currentChar];
        terminal.textContent = fullText;
        currentChar++;
        setTimeout(typeNext, speed);
      } else {
        fullText += '\n';
        terminal.textContent = fullText;
        currentLine++;
        currentChar = 0;
        setTimeout(typeNext, speed * 3);
      }
    } else {
      cursor.style.animation = 'blink 1s infinite';
    }
  }

  cursor.style.animation = 'none';
  setTimeout(() => typeNext(), 300);
}