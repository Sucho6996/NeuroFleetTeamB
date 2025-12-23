# Neuro Fleet Backend Services

Monorepo containing multiple Spring Boot services for Neuro Fleet.

## Services and Ports
- `Server` (Eureka): port `8761`
- `UserService`: port `8080`
- `FleetManager`: port `8081`
- `Driver`: port `8082`
- `Admin`: port `8083`

Ports can be changed via each service’s `src/main/resources/application.properties` (`server.port`).

## Prerequisites
- JDK 21
- Maven 3.9+ (or included `mvnw` / `mvnw.cmd`)
- PostgreSQL

## Run (per service)
From a service directory (e.g., `Admin/`):
- Dev: `./mvnw spring-boot:run`
- Package: `./mvnw clean package` then `java -jar target/<artifact>-0.0.1-SNAPSHOT.jar`

## APIs
Each service README lists its endpoints with inputs/outputs and examples:
- `Admin/README.md`
- `Driver/README.md`
- `FleetManager/README.md`
- `UserService/README.md`
- `Server/README.md` (Eureka, no business APIs)

## Configuration
Create each service’s `src/main/resources/application.properties` (gitignored) with datasource, JWT secrets, `server.port`, and any Eureka settings where applicable.

