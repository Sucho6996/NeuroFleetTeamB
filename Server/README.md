# Server (Eureka)

Service discovery server for the Neuro Fleet stack using Spring Cloud Netflix Eureka.

## Prerequisites
- JDK 21
- Maven 3.9+ (or `mvnw`/`mvnw.cmd`)

## Configuration
Create `src/main/resources/application.properties` with:
- `server.port`
- `eureka.client.register-with-eureka=false`
- `eureka.client.fetch-registry=false`
- Optional: `eureka.instance.hostname`, security headers, or dashboard settings

## Port
- Default `server.port=8761` (change in `src/main/resources/application.properties`).

## Run
- Dev: `./mvnw spring-boot:run`
- Jar: `./mvnw clean package` then `java -jar target/Server-0.0.1-SNAPSHOT.jar`

## APIs
- No business REST APIs; this service runs Eureka for service discovery.

## Test
- `./mvnw test`

## Notes
- Other services (Driver, FleetManager, etc.) should point `eureka.client.service-url.defaultZone` to this service.

