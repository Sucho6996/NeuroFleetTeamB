# Fleet Manager Service

Fleet Manager service for the NeuroFleet backend system. This service handles fleet manager authentication, vehicle management, overspeeding tracking, and alert management.

## Overview

This service provides REST APIs for:
- Fleet manager authentication (signup, login, logout, profile)
- Vehicle CRUD operations
- Overspeeding event tracking
- Alert management

## Technology Stack

- **Framework**: Spring Boot 3.5.6
- **Java Version**: 21
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT
- **Service Discovery**: Netflix Eureka Client
- **Inter-Service Communication**: OpenFeign
- **Build Tool**: Maven

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- PostgreSQL database
- Eureka Server running (default port 8761)

## Configuration

Create `src/main/resources/application.properties` with the following configuration:

```properties
spring.application.name=FleetManager

spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/NeurofleetDb
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

server.port=8081
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

## Running the Application

### Development Mode

```bash
./mvnw spring-boot:run
```

### Build and Run

```bash
./mvnw clean package
java -jar target/Doctor-0.0.1-SNAPSHOT.jar
```

## Default Port

The service runs on **port 8081** by default. You can change this in `application.properties` by setting `server.port`.

## API Documentation

All APIs are prefixed with `/fleetManager`.

### Authentication APIs

#### 1. Signup
- **Endpoint**: `POST /fleetManager/signup`
- **Description**: Register a new fleet manager account
- **Input**: 
  ```json
  {
    "email": "manager@example.com",
    "name": "John Doe",
    "password": "password123",
    "role": "FleetManager",
    "gender": "Male",
    "companyName": "ABC Transport"
  }
  ```
- **Output**: 
  ```json
  {
    "message": "Signup successful"
  }
  ```
  or
  ```json
  {
    "message": "Email already exists"
  }
  ```

#### 2. Login
- **Endpoint**: `POST /fleetManager/login`
- **Description**: Authenticate fleet manager and get JWT token
- **Input**: 
  ```json
  {
    "email": "manager@example.com",
    "password": "password123"
  }
  ```
- **Output**: 
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  or
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### 3. Logout
- **Endpoint**: `POST /fleetManager/logout`
- **Description**: Invalidate the current JWT token
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: None (token from header)
- **Output**: 
  ```json
  {
    "message": "Logout successful"
  }
  ```
  or
  ```json
  {
    "message": "Invalid token or already logged out"
  }
  ```

#### 4. Get Profile
- **Endpoint**: `POST /fleetManager/profile`
- **Description**: Get the authenticated fleet manager's profile
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: None (token from header)
- **Output**: 
  ```json
  {
    "email": "manager@example.com",
    "name": "John Doe",
    "role": "FleetManager",
    "gender": "Male",
    "companyName": "ABC Transport",
    "password": null
  }
  ```

### Vehicle Management APIs

#### 5. Add Vehicle
- **Endpoint**: `POST /fleetManager/addVehicle`
- **Description**: Add a new vehicle to the fleet
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: 
  ```json
  {
    "regNo": "ABC123",
    "email": "manager@example.com",
    "name": "Truck 1",
    "location": "New York",
    "fuel": 75.5,
    "status": "Active",
    "type": "Truck",
    "distanceCovered": 15000.0,
    "engineTemp": 85.0,
    "tireWear": 20.0,
    "batteryHealth": 90.0,
    "fuelEfficiency": 8.5,
    "licenseNo": "DL123456"
  }
  ```
- **Output**: 
  ```json
  {
    "regNo": "ABC123",
    "email": "manager@example.com",
    "name": "Truck 1",
    "location": "New York",
    "fuel": 75.5,
    "status": "Active",
    "type": "Truck",
    "distanceCovered": 15000.0,
    "engineTemp": 85.0,
    "tireWear": 20.0,
    "batteryHealth": 90.0,
    "fuelEfficiency": 8.5,
    "licenseNo": "DL123456"
  }
  ```

#### 6. Update Vehicle
- **Endpoint**: `POST /fleetManager/updateVehicle`
- **Description**: Update vehicle fuel level
- **Input Parameters**: 
  - `regNo` (String): Vehicle registration number
  - `fuel` (double): New fuel level
- **Input Example**: 
  ```
  POST /fleetManager/updateVehicle?regNo=ABC123&fuel=80.0
  ```
- **Output**: 
  ```json
  {
    "regNo": "ABC123",
    "email": "manager@example.com",
    "name": "Truck 1",
    "location": "New York",
    "fuel": 80.0,
    "status": "Active",
    "type": "Truck",
    "distanceCovered": 15000.0,
    "engineTemp": 85.0,
    "tireWear": 20.0,
    "batteryHealth": 90.0,
    "fuelEfficiency": 8.5,
    "licenseNo": "DL123456"
  }
  ```

#### 7. See All Vehicles
- **Endpoint**: `POST /fleetManager/seeVehicles`
- **Description**: Get all vehicles for the authenticated fleet manager
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: None (token from header)
- **Output**: 
  ```json
  [
    {
      "regNo": "ABC123",
      "email": "manager@example.com",
      "name": "Truck 1",
      "location": "New York",
      "fuel": 75.5,
      "status": "Active",
      "type": "Truck",
      "distanceCovered": 15000.0,
      "engineTemp": 85.0,
      "tireWear": 20.0,
      "batteryHealth": 90.0,
      "fuelEfficiency": 8.5,
      "licenseNo": "DL123456",
      "driverName": "John Driver",
      "driverContact": "1234567890"
    }
  ]
  ```

#### 8. See Single Vehicle
- **Endpoint**: `POST /fleetManager/seeVehicle`
- **Description**: Get a specific vehicle by registration number
- **Input Parameters**: 
  - `regNo` (String): Vehicle registration number
- **Input Example**: 
  ```
  POST /fleetManager/seeVehicle?regNo=ABC123
  ```
- **Output**: 
  ```json
  {
    "regNo": "ABC123",
    "email": "manager@example.com",
    "name": "Truck 1",
    "location": "New York",
    "fuel": 75.5,
    "status": "Active",
    "type": "Truck",
    "distanceCovered": 15000.0,
    "engineTemp": 85.0,
    "tireWear": 20.0,
    "batteryHealth": 90.0,
    "fuelEfficiency": 8.5,
    "licenseNo": "DL123456",
    "driverName": "John Driver",
    "driverContact": "1234567890"
  }
  ```

#### 9. Delete Vehicle
- **Endpoint**: `POST /fleetManager/deleteVehicle`
- **Description**: Delete a vehicle by registration number
- **Input Parameters**: 
  - `regNo` (String): Vehicle registration number
- **Input Example**: 
  ```
  POST /fleetManager/deleteVehicle?regNo=ABC123
  ```
- **Output**: 
  ```json
  {
    "message": "Vehicle deleted successfully"
  }
  ```
  or
  ```json
  {
    "message": "Vehicle not found"
  }
  ```

### Overspeeding API

#### 10. Record Overspeeding
- **Endpoint**: `POST /fleetManager/overSpeeding`
- **Description**: Record an overspeeding event
- **Input**: 
  ```json
  {
    "regNo": "ABC123",
    "time": "2024-01-15 14:30:00",
    "speed": "120"
  }
  ```
- **Output**: 
  ```json
  {
    "message": "Overspeeding recorded successfully"
  }
  ```

### Alert Management APIs

#### 11. Add Alert
- **Endpoint**: `POST /fleetManager/addAllert`
- **Description**: Add a new alert for a vehicle
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: 
  ```json
  {
    "regNo": "ABC123",
    "issue": "Low fuel level",
    "actionNeeded": "Refuel immediately",
    "email": "manager@example.com"
  }
  ```
- **Output**: 
  ```json
  {
    "message": "Alert added successfully"
  }
  ```

#### 12. Show All Alerts
- **Endpoint**: `POST /fleetManager/showAllAllerts`
- **Description**: Get all alerts for the authenticated fleet manager
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Input**: None (token from header)
- **Output**: 
  ```json
  [
    {
      "id": 1,
      "regNo": "ABC123",
      "issue": "Low fuel level",
      "actionNeeded": "Refuel immediately",
      "email": "manager@example.com"
    },
    {
      "id": 2,
      "regNo": "XYZ789",
      "issue": "High engine temperature",
      "actionNeeded": "Check cooling system",
      "email": "manager@example.com"
    }
  ]
  ```

## Testing

Run tests with:
```bash
./mvnw test
```

## Service Discovery

This service registers with Eureka Server as `FleetManager`. Other services can discover it using the service name.

## Inter-Service Communication

The FleetManager service uses OpenFeign to communicate with the Driver service to fetch driver information when displaying vehicle details.

