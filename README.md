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


## Frontend Service
The frontend application is located in the `frontend_dummy` directory. It is a React-based SPA that interfaces with the Neuro Fleet backend microservices.

### Key Features
- **User Authentication**: Secure login and signup flows for different user roles (Admin, Driver, Fleet Manager, User).
- **Role-Based Dashboards**: Tailored interfaces for Admins, Fleet Managers, and Drivers.
- **Route Optimization**: Interactive map interface using Leaflet for route planning and optimization.
- **Inventory Management**: Tools for tracking vehicle parts and inventory levels.
- **Booking System**: Interface for users to book vehicles and manage reservations.
- **Analytics**: Data visualization using Recharts for fleet performance and usage stats.

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Setup & Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend_dummy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure
- `src/components`: Reusable UI components.
- `src/pages`: Main application pages (Auth, Dashboards, RouteOptimization, etc.).
- `src/services`: API service modules interacting with backend endpoints (Admin, Driver, FleetManager, User).
- `src/context`: React context for global state management.

### Technologies
- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Maps**: Leaflet & React-Leaflet
- **Charts**: Recharts
- **HTTP Client**: Axios


