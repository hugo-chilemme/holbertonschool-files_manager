# 📁 Files Manager

Welcome to the **Files Manager** project! 🚀  
This project is a hands-on summary of back-end essentials: authentication, Node.js, MongoDB, Redis, pagination, and background processing.

## 🎯 Objective

Build a simple platform to upload and view files:

- 🔐 User authentication via token
- 📄 List all files
- ⬆️ Upload new files
- 🔄 Change file permissions
- 👁️ View files
- 🖼️ Generate image thumbnails

You’ll be guided step by step, but you have freedom in implementation (the `utils` folder will be your friend).  
This is a learning project to assemble all the pieces and build a full product. Enjoy! 🎉

---

## 📚 Resources

- [Node.js Getting Started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Process API Docs](https://node.readthedocs.io/en/latest/api/process/)
- [Express Getting Started](https://expressjs.com/en/starter/installing.html)
- [Mocha Docs](https://mochajs.org)
- [Nodemon Docs](https://github.com/remy/nodemon#nodemon)
- [MongoDB Node Driver](https://github.com/mongodb/node-mongodb-native)
- [Bull Queue](https://github.com/OptimalBits/bull)
- [Image Thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis Node Client](https://github.com/redis/node-redis)

---

## 🧠 Learning Objectives

- Create an API with Express
- Authenticate users
- Store data in MongoDB
- Store temporary data in Redis
- Set up and use a background worker

---

## ⚙️ Requirements

- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All files run on Ubuntu 18.04 LTS with Node.js 12.x.x
- All files end with a new line
- `README.md` at project root is mandatory
- Use `.js` extension for code
- Code checked with ESLint

---

## 📦 Provided Files

### `package.json`

<details>
<summary>Click to expand</summary>

```json
{
    "name": "files_manager",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "lint": "./node_modules/.bin/eslint",
        "check-lint": "lint [0-9]*.js",
        "start-server": "nodemon --exec babel-node --presets @babel/preset-env ./server.js",
        "start-worker": "nodemon --exec babel-node --presets @babel/preset-env ./worker.js",
        "dev": "nodemon --exec babel-node --presets @babel/preset-env",
        "test": "./node_modules/.bin/mocha --require @babel/register --exit" 
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "bull": "^3.16.0",
        "chai-http": "^4.3.0",
        "express": "^4.17.1",
        "image-thumbnail": "^1.0.10",
        "mime-types": "^2.1.27",
        "mongodb": "^3.5.9",
        "redis": "^2.8.0",
        "sha1": "^1.1.1",
        "uuid": "^8.2.0"
    },
    "devDependencies": {
        "@babel/cli": "^7.8.0",
        "@babel/core": "^7.8.0",
        "@babel/node": "^7.8.0",
        "@babel/preset-env": "^7.8.2",
        "@babel/register": "^7.8.0",
        "chai": "^4.2.0",
        "chai-http": "^4.3.0",
        "mocha": "^6.2.2",
        "nodemon": "^2.0.2",
        "eslint": "^6.4.0",
        "eslint-config-airbnb-base": "^14.0.0",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-jest": "^22.17.0",
        "request": "^2.88.0",
        "sinon": "^7.5.0"
    }
}
```
</details>

### `.eslintrc.js`

<details>
<summary>Click to expand</summary>

```js
module.exports = {
        env: {
            browser: false,
            es6: true,
            jest: true,
        },
        extends: [
            'airbnb-base',
            'plugin:jest/all',
        ],
        globals: {
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
        },
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        plugins: ['jest'],
        rules: {
            'max-classes-per-file': 'off',
            'no-underscore-dangle': 'off',
            'no-console': 'off',
            'no-shadow': 'off',
            'no-restricted-syntax': [
                'error',
                'LabeledStatement',
                'WithStatement',
            ],
        },
        overrides:[
            {
                files: ['*.js'],
                excludedFiles: 'babel.config.js',
            }
        ]
};
```
</details>

### `babel.config.js`

<details>
<summary>Click to expand</summary>

```js
module.exports = {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
        ],
};
```
</details>

---

> 💡 **Tip:**  
> Run `$ npm install` after you have your `package.json`!

---

## 📝 Tasks

### 0️⃣ Redis Utils

- Create `utils/redis.js` with a `RedisClient` class:
    - Connects to Redis, logs errors
    - `isAlive()`: returns connection status
    - `get(key)`: async get value
    - `set(key, value, duration)`: async set with expiration
    - `del(key)`: async delete key
- Export an instance as `redisClient`

---

### 1️⃣ MongoDB Utils

- Create `utils/db.js` with a `DBClient` class:
    - Connects to MongoDB (env: `DB_HOST`, `DB_PORT`, `DB_DATABASE`)
    - `isAlive()`: returns connection status
    - `nbUsers()`: async count users
    - `nbFiles()`: async count files
- Export an instance as `dbClient`

---

### 2️⃣ First API

- In `server.js`:
    - Create Express server on `PORT` (default: 5000)
    - Load routes from `routes/index.js`
- In `routes/index.js`:
    - `GET /status` → `AppController.getStatus`
    - `GET /stats` → `AppController.getStats`
- In `controllers/AppController.js`:
    - `/status`: `{ "redis": true, "db": true }`
    - `/stats`: `{ "users": <count>, "files": <count> }`

---

### 3️⃣ Create a New User

- In `routes/index.js`:
    - `POST /users` → `UsersController.postNew`
- In `controllers/UsersController.js`:
    - Requires `email` and `password`
    - Validates input, checks for duplicates
    - Stores password as SHA1 hash
    - Returns `{ "id": "...", "email": "..." }` on success

---

### 4️⃣ Authenticate a User

- In `routes/index.js`:
    - `GET /connect` → `AuthController.getConnect`
    - `GET /disconnect` → `AuthController.getDisconnect`
    - `GET /users/me` → `UsersController.getMe`
- In `controllers/AuthController.js`:
    - `/connect`: Basic Auth, returns token, stores in Redis for 24h
    - `/disconnect`: Deletes token from Redis
- In `controllers/UsersController.js`:
    - `/users/me`: Returns user info if authenticated

---

### 5️⃣ First File

- In `routes/index.js`:
    - `POST /files` → `FilesController.postUpload`
- In `controllers/FilesController.js`:
    - Auth required
    - Accepts `name`, `type`, `parentId`, `isPublic`, `data`
    - Validates input, handles folders/files/images
    - Stores files in local folder (`FOLDER_PATH` or `/tmp/files_manager`)
    - Returns file info

---

### 6️⃣ Get & List Files

- In `routes/index.js`:
    - `GET /files/:id` → `FilesController.getShow`
    - `GET /files` → `FilesController.getIndex`
- In `controllers/FilesController.js`:
    - `/files/:id`: Returns file info if owner
    - `/files`: Lists files by `parentId` (default: 0), paginated (20 per page)

---

### 7️⃣ File Publish/Unpublish

- In `routes/index.js`:
    - `PUT /files/:id/publish` → `FilesController.putPublish`
    - `PUT /files/:id/unpublish` → `FilesController.putUnpublish`
- In `controllers/FilesController.js`:
    - Updates `isPublic` status for file

---

### 8️⃣ File Data

- In `routes/index.js`:
    - `GET /files/:id/data` → `FilesController.getFile`
- In `controllers/FilesController.js`:
    - Returns file content if public or owner
    - Handles MIME type
    - Supports folders, files, images

---

### 9️⃣ Image Thumbnails

- On image upload, add job to Bull queue `fileQueue`
- In `worker.js`:
    - Processes `fileQueue` jobs
    - Generates thumbnails (500, 250, 100px) using `image-thumbnail`
    - Stores thumbnails alongside original

- `/files/:id/data?size=100|250|500` returns correct thumbnail

---

### 🔟 Tests!

- Write tests for:
    - `redisClient`, `dbClient`
    - All API endpoints (`/status`, `/stats`, `/users`, `/connect`, `/disconnect`, `/users/me`, `/files`, `/files/:id`, `/files/:id/data`, etc.)

---

### 1️⃣1️⃣ New User - Welcome Email

- On user creation, add job to Bull queue `userQueue`
- In `worker.js`:
    - Processes `userQueue` jobs
    - Prints `Welcome <email>!` for new users

---

## 🏁 Good luck and have fun!  
Happy coding! 💻✨

