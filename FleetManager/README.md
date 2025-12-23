# Fleet Manager Service

Service for fleet manager workflows (vehicles, drivers, oversight). Acts as a Eureka client and can call peer services via OpenFeign.

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
- `eureka.client.service-url.defaultZone` for the Server endpoint
- `spring.application.name` and `server.port`

## Port
- Default `server.port=8081` (change in `src/main/resources/application.properties`).

## Run
- Dev: `./mvnw spring-boot:run`
- Jar: `./mvnw clean package` then `java -jar target/Doctor-0.0.1-SNAPSHOT.jar`

## APIs
- `POST /fleetManager/signup`
  - Request: `FleetManagerData` JSON (e.g., name, email/username, password, org data).
  - Response: JSON map with message/status.
- `POST /fleetManager/login`
  - Request: `FleetManagerData` JSON (credentials).
  - Response: JSON map with JWT (`token`) and related auth info.
- `POST /fleetManager/logout`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: JSON map with success/error message.
- `POST /fleetManager/profile`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: `FleetManagerData` JSON for the authenticated manager.
- `POST /fleetManager/addVehicle`
  - Request: `Authorization: Bearer <jwt>` header and `Vehicle` JSON (regNo, fuel, etc.).
  - Response: created `Vehicle` JSON.
- `POST /fleetManager/updateVehicle?regNo=&fuel=`
  - Request: query params `regNo`, `fuel`.
  - Response: updated `Vehicle` JSON.
- `POST /fleetManager/seeVehicles`
  - Request: `Authorization: Bearer <jwt>` header.
  - Response: list of `ShowVehicle` JSON objects.
- `POST /fleetManager/seeVehicle?regNo=`
  - Request: query param `regNo`.
  - Response: `ShowVehicle` JSON.
- `POST /fleetManager/deleteVehicle?regNo=`
  - Request: query param `regNo`.
  - Response: JSON map with message/status.
- `POST /fleetManager/overSpeeding`
  - Request: `OverSpeedingData` JSON.
  - Response: JSON map with message/status.

### Examples
- Signup
```
POST /fleetManager/signup
{
  "name": "Fiona Manager",
  "email": "fiona@example.com",
  "password": "Passw0rd!"
}
```
Response: `{ "message": "Signup successful" }`

- Login
```
POST /fleetManager/login
{
  "email": "fiona@example.com",
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

- Add vehicle (auth required)
```
POST /fleetManager/addVehicle
Authorization: Bearer <token>
{
  "regNo": "ABC-1234",
  "fuel": 75.5,
  "model": "Truck X"
}
```
Response: Vehicle JSON with stored fields.

- Update vehicle fuel
```
POST /fleetManager/updateVehicle?regNo=ABC-1234&fuel=64.0
```
Response: updated Vehicle JSON.

- List vehicles
```
POST /fleetManager/seeVehicles
Authorization: Bearer <token>
```
Response:
```
[
  { "regNo": "ABC-1234", "fuel": 64.0, "...": "..." },
  { "regNo": "DEF-5678", "fuel": 88.0, "...": "..." }
]
```

- Record overspeeding
```
POST /fleetManager/overSpeeding
{
  "license": "DL-12345",
  "speed": 120.0,
  "regNo": "ABC-1234",
  "timestamp": "2025-01-01T10:00:00Z"
}
```
Response: `{ "message": "Recorded" }`

## Test
- `./mvnw test`

## Notes
- Uses Spring Security + JWT, Spring Data JPA, Eureka client, and OpenFeign for service-to-service calls.

