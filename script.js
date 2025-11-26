// script.js (находится в корне папки instagram)

// ⚠️ ВАШ РАБОЧИЙ АДРЕС ОТ RENDER
const RENDER_URL = 'https://instagram-server-zy20.onrender.com'; 


document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value; 

    try {
        // Отправка запроса на ВХОД на сервер Render
        const response = await fetch(`${RENDER_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Вход успешен!");
            alert("Вход успешен!");
            
            setTimeout(() => {
                window.location.href = 'feed.html'; 
            }, 500);
            
        } else {
            alert(data.message || 'Неизвестная ошибка входа.');
        }

    } catch (error) {
        console.error('Ошибка подключения к серверу или сети:', error);
        alert('Ошибка подключения к серверу. Убедитесь, что сервер запущен!');
    }
});


// Логика регистрации (для register.html)
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value; 
    
    try {
        // Отправка запроса на РЕГИСТРАЦИЮ на сервер Render
        const response = await fetch(`${RENDER_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Регистрация успешна!");
            alert("Регистрация успешна!");
            
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 500);
        } else {
            alert(data.message || 'Неизвестная ошибка регистрации.');
        }

    } catch (error) {
        console.error('Ошибка подключения к серверу или сети:', error);
        alert('Ошибка подключения к серверу. Проверьте адрес Render.');
    }
});