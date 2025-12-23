# Admin Service

Admin-facing Spring Boot service for Neuro Fleet authentication and user management.

## Prerequisites
- JDK 21
- Maven 3.9+ (or `mvnw`/`mvnw.cmd` in this repo)
- PostgreSQL instance

## Configuration
Create `src/main/resources/application.properties` (ignored from git) with at least:
- `spring.datasource.url` / `username` / `password`
- `spring.jpa.hibernate.ddl-auto`
- `jwt.secret` (and optional JWT expiration settings)
- `server.port`

## Port
- Default `server.port=8083` (change in `src/main/resources/application.properties`).

## Run
- Dev: `./mvnw spring-boot:run` (or `mvnw.cmd ...` on Windows)
- Jar: `./mvnw clean package` then `java -jar target/NeurofleetLoginBack-0.0.1-SNAPSHOT.jar`

## APIs
- `POST /admin/signup`
  - Request: `AdminData` JSON (e.g., name, email/username, password, role fields used by the service)
  - Response: JSON map with message/status.
- `POST /admin/login`
  - Request: `AdminData` JSON (credentials).
  - Response: JSON map with JWT (`token`) and related auth info.
- `POST /admin/logout`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: JSON map with success/error message.
- `POST /admin/profile`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: `AdminData` JSON for the authenticated admin.

### Examples
- Signup request
```
POST /admin/signup
{
  "name": "Alice Admin",
  "email": "alice@example.com",
  "password": "Passw0rd!"
}
```
Response:
```
{
  "message": "Signup successful"
}
```

- Login request
```
POST /admin/login
{
  "email": "alice@example.com",
  "password": "Passw0rd!"
}
```
Response:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

- Profile request
```
POST /admin/profile
Authorization: Bearer <token>
```
Response:
```
{
  "name": "Alice Admin",
  "email": "alice@example.com",
  "role": "ADMIN"
}
```

## Test
- `./mvnw test`

## Notes
- Uses Spring Security with JWT and Spring Data JPA against Postgres.

