// script.js

// Обработчик формы входа: предотвращает отправку данных
document.getElementById('login-form').addEventListener('submit', function(event) {
    // Останавливает отправку формы, чтобы страница не перезагружалась
    event.preventDefault(); 
    console.log("Кнопка 'Войти' нажата, но данные никуда не отправляются.");
});

// Обработчик формы регистрации: предотвращает отправку данных
document.getElementById('register-form').addEventListener('submit', function(event) {
    // Останавливает отправку формы, чтобы страница не перезагружалась
    event.preventDefault(); 
    console.log("Кнопка 'Зарегистрироваться' нажата, но данные никуда не отправляются.");
});