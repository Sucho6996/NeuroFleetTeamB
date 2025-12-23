# User Service

Shared user authentication/authorization service for Neuro Fleet.

## Prerequisites
- JDK 21
- Maven 3.9+ (or `mvnw`/`mvnw.cmd`)
- PostgreSQL instance

## Configuration
Create `src/main/resources/application.properties` with:
- `spring.datasource.url` / `username` / `password`
- `spring.jpa.hibernate.ddl-auto`
- `jwt.secret` (and optional expiration settings)
- `server.port`

## Port
- Default `server.port=8080` (change in `src/main/resources/application.properties`).

## Run
- Dev: `./mvnw spring-boot:run`
- Jar: `./mvnw clean package` then `java -jar target/NeurofleetLoginBack-0.0.1-SNAPSHOT.jar`

## APIs
- `POST /user/signup`
  - Request: `UserData` JSON (e.g., name, email/username, password).
  - Response: JSON map with message/status.
- `POST /user/login`
  - Request: `UserData` JSON (credentials).
  - Response: JSON map with JWT (`token`) and related auth info.
- `POST /user/logout`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: JSON map with success/error message.
- `POST /user/profile`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: `UserData` JSON for the authenticated user.

### Examples
- Signup
```
POST /user/signup
{
  "name": "Uma User",
  "email": "uma@example.com",
  "password": "Passw0rd!"
}
```
Response: `{ "message": "Signup successful" }`

- Login
```
POST /user/login
{
  "email": "uma@example.com",
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

- Profile
```
POST /user/profile
Authorization: Bearer <token>
```
Response:
```
{
  "name": "Uma User",
  "email": "uma@example.com",
  "role": "USER"
}
```

## Test
- `./mvnw test`

## Notes
- Uses Spring Security + JWT and Spring Data JPA against Postgres.

