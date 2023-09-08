# express_mongoDB_CRUD
express, mongoose, body-parser, express-fileupload, uuid, path

// у контроллері йде робота з клієнт - серверною частиною (params, body, headers ...)
// у сервісі йде робота з БД і вхідними параметрами, БЕЗ req/res
// so first we create PostController with FULL logic
// and after that we need to divide controller logic and service logic
