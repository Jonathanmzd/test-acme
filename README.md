## Test ACME S.A.S

### Backend Laravel 10

#### Instalar Dependecias

```sh
cd backend

composer install
```

#### Crear Base de Datos

1) crear la base de datos con el nombre acme
2) Tomar .env.example y copiar y pegar ademas renombrar a .env

```env
..... 
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=acme
DB_USERNAME=root
DB_PASSWORD=
....
```

#### Generar la clave 

La clave de aplicación es una cadena aleatoria almacenada en la clave APP_KEY dentro del archivo .env.

```sh
php artisan key:generate
```

#### Ejecutar migraciones

**Nota**: tener encendido el Mysql database

```sh
php artisan migrate 
```

#### Arrancar el Servidor

Nota: de ser un puerto diferente usar el flat --port=3000 e indicar el puerto

```sh
php artisan serve 
```

### Frontend Angular 16

#### Instalar Dependecias

```sh
cd frontend

npm install
```

#### Arrancar el Servidor

```sh
npm start 
```