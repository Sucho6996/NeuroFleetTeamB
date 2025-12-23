# Driver Service

Driver-facing Spring Boot service for authentication and driver operations. Runs as a Eureka client and can call other services via OpenFeign.

## Prerequisites
- JDK 21
- Maven 3.9+ (or `mvnw`/`mvnw.cmd`)
- PostgreSQL instance
- Running Eureka server (see `../Server`)

## Configuration
Create `src/main/resources/application.properties` with:
- `spring.datasource.url` / `username` / `password`
- `spring.jpa.hibernate.ddl-auto`
- `jwt.secret` (and optional expiration settings)
- `eureka.client.service-url.defaultZone` pointing to the Server service
- `spring.application.name` and `server.port`

## Port
- Default `server.port=8082` (change in `src/main/resources/application.properties`).

## Run
- Dev: `./mvnw spring-boot:run`
- Jar: `./mvnw clean package` then `java -jar target/Doctor-0.0.1-SNAPSHOT.jar`

## APIs
- `POST /driver/signup`
  - Request: `DriverData` JSON (e.g., name, email/username, password, license, etc.).
  - Response: JSON map with message/status.
- `POST /driver/login`
  - Request: `DriverData` JSON (credentials).
  - Response: JSON map with JWT (`token`) and related auth info.
- `POST /driver/logout`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: JSON map with success/error message.
- `POST /driver/profile`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: `DriverData` JSON for the authenticated driver.
- `POST /driver/getProfile?license=`
  - Request: query param `license`.
  - Response: `DriverData` JSON (used by other services via Feign).

### Examples
- Signup
```
POST /driver/signup
{
  "name": "Dan Driver",
  "email": "dan@example.com",
  "password": "Passw0rd!",
  "license": "DL-12345"
}
```
Response:
```
{ "message": "Signup successful" }
```

- Login
```
POST /driver/login
{
  "email": "dan@example.com",
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

- Profile (auth required)
```
POST /driver/profile
Authorization: Bearer <token>
```
Response:
```
{
  "name": "Dan Driver",
  "email": "dan@example.com",
  "license": "DL-12345",
  "role": "DRIVER"
}
```

- Get profile by license
```
POST /driver/getProfile?license=DL-12345
```
Response:
```
{
  "name": "Dan Driver",
  "email": "dan@example.com",
  "license": "DL-12345"
}
```

## Test
- `./mvnw test`

## Notes
- Uses Spring Security + JWT, Spring Data JPA, Eureka client, and OpenFeign for inter-service calls.

