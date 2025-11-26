// server.js (находится в корне папки instagram)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Для разрешения запросов с фронтенда

const app = express();
const PORT = process.env.PORT || 3000; 

const MONGODB_URI = process.env.MONGODB_URI; 

// --- 1. КРИТИЧЕСКИ ВАЖНЫЕ СТРОКИ ДЛЯ ОБРАБОТКИ JSON И УСТРАНЕНИЯ 500 ОШИБКИ ---
app.use(express.json()); // Позволяет Express читать входящие JSON данные из фронтенда (req.body)
app.use(cors());         // Позволяет фронтенду (127.0.0.1) обращаться к серверу (Render URL)
// -------------------------------------------------------------------------------


// --- 2. Подключение к MongoDB ---

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB подключена успешно!'))
    .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));


// --- 3. Определение схемы (модели) пользователя ---

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } 
});

const User = mongoose.model('User', UserSchema);

// --- 4. Маршрут для РЕГИСТРАЦИИ ---

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Имя пользователя и пароль обязательны' });
    }

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Регистрация успешна', user: { username: newUser.username } });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Пользователь с таким именем уже существует' });
        }
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
});

// --- 5. Маршрут для ВХОДА ---

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        res.status(200).json({ message: 'Вход успешен', user: { username: user.username } });

    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
});


// --- 6. Запуск сервера ---

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});