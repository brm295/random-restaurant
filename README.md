# Random Restaurant

![Docker](https://img.shields.io/badge/docker-%3E%3D4.96.0-white)
![Node](https://img.shields.io/badge/node.js-%3E%3D26.12.0-blue)
![express](https://img.shields.io/badge/express-%3E%3D5.3.0-brightgreen)
![mysql2](https://img.shields.io/badge/mysql2-%3E%3D3.24.6-orange)
![dotenv](https://img.shields.io/badge/dotenv-%3E%3D18.0.8-purple)

Welcome to the Random Restaurant application! This application allows you to randomly select a restaurant from a list of restaurants stored in a MySQL database.

## Prerequisites & Installation

### Homebrew (macOS)
- `brew install --cask docker-desktop`
- `brew install node`

### Local Dependencies
Install project dependencies defined in `package.json`:
```sh
npm install
```

## Environment Configuration

Create a `.env` file in the root directory (you can copy `.env.example` as a template):
```sh
cp .env.example .env
```

Configure the following environment variables in `.env`:

| Variable      | Default / Example     | Description                                                                 |
|---------------|-----------------------|-----------------------------------------------------------------------------|
| `PORT`        | `3000`                | The port number on which the application will listen for incoming requests. |
| `DB_HOST`     | `localhost` / `mysql` | Database host (`localhost` for local Node execution, `mysql` inside Docker).|
| `DB_PORT`     | `3306`                | Port number for the MySQL database connection.                              |
| `DB_USER`     | `root`                | Username for MySQL authentication.                                          |
| `DB_PASSWORD` | `your_password`       | Password for MySQL authentication.                                          |
| `DB_NAME`     | `random_restaurant`   | Name of the MySQL database.                                                 |

Example `.env` configuration:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=random_restaurant
```

### Loading Environment Variables (Optional)
This is not strictly necessary as the application loads `.env` directly using `dotenv`, but if you need them available in your shell environment:
```sh
set -a && source .env && set +a
```

## Running the Application

### 1. Using Docker Compose (Recommended)

Start both MySQL and the Express application container:
```sh
docker compose up
```

- Run in detached mode: `docker compose up -d`
- Start MySQL only: `docker compose up mysql`
- Start the application container only: `docker compose up app`
- Rebuild and start the application container: `docker compose up --build app`

#### Stopping and Resetting Docker Containers
- Stop running containers:
  ```sh
  docker compose down
  ```
- Stop containers and remove the persistent database volume (resets data):
  ```sh
  docker compose down -v
  ```

### 2. Running Locally (Without Docker App Container)

If running MySQL locally or via `docker compose up mysql`:
```sh
npm start
```
*Note:* Ensure `DB_HOST` is set to `localhost` (or `127.0.0.1`) and `DB_PORT` is set to `3306` in your `.env` file when running Node locally.

## Database Initialization

The database schema and initial restaurant list are automatically provisioned on the first startup of the MySQL container using `docker/mysql8/init/init.sql`.

If you need to re-run the initialization script from scratch, reset the Docker volume with `docker compose down -v` and restart the stack.

## Application Routes & Endpoints

Once the server is running, access the web interface at `http://localhost:<PORT>` (default: `http://localhost:3000`).

| Route                 | HTTP Method | Description                                      |
|-----------------------|-------------|--------------------------------------------------|
| `/`                   | `GET`       | Displays a randomly selected restaurant.         |
| `/restaurants`        | `GET`       | Displays the complete list of restaurants.       |
| `/restaurants/add`    | `GET`       | Renders the form to add a new restaurant.        |
| `/restaurants/add`    | `POST`      | Submits and inserts a new restaurant into the DB.|
| `/restaurants/delete` | `POST`      | Deletes a selected restaurant from the DB.       |