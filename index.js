import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose"; // Убедитесь, что Mongoose подключен

dotenv.config();

const port = process.env.PORT;
const app = express();
const dburi = process.env.MONGODB_URI;

// Подключение middleware для парсинга JSON тела запросов
app.use(express.json());  // Это необходимо для правильной обработки тела запросов в формате JSON

// Подключение к базе данных
mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', (error) => { 
    console.error({ error }); 
});

db.once('open', () => { 
    console.log('Connection con la DB Correcta');
});

// Раздача статических файлов из папки "public"
app.use(express.static(path.join(process.cwd(), 'public')));

// Главная страница (отправка index.html)
app.get('/', (request, response) => {
    console.log('Ruta Raiz');
    response.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Подключение маршрутов
import routerAPI from './routes/index.js';  // Подключаем API маршруты
routerAPI(app);  // Применяем маршруты

// Запуск сервера
app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});
