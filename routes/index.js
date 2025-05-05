import usersRouter from "./usersRouter.js";  // Импортируем роутер для пользователей
import productsRouter from "./productsRouter.js"; 
import categorysRouter from "./categorysRouter.js";// Импортируем роутер для продуктов

function routerAPI(app) {
    // Маршрут для пользователей
    app.use('/api/users', usersRouter);

    // Маршрут для продуктов (раскомментировано)
    app.use('/api/products', productsRouter); 
    
    app.use('/api/categorys', categorysRouter); 
    // Добавляем API для продуктов
}

export default routerAPI;
