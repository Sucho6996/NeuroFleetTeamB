# FleetManager Data Flow Diagram (DFD)

## Overview
This DFD represents the data flow for Fleet Manager operations including vehicle management, alerts, and monitoring.

```mermaid
graph TB
    subgraph Frontend["Frontend - Fleet Manager Portal"]
        FM_Login["Fleet Manager Login"]
        FM_Dashboard["Fleet Manager Dashboard<br/>(View Statistics)"]
        FM_Inventory["Fleet Inventory<br/>(Add/Edit/Delete Vehicles)"]
        FM_Alerts["Manage Alerts<br/>(View/Create Alerts)"]
        FM_Profile["View Profile"]
    end
    
    subgraph API_Layer["API Layer - Frontend Services"]
        FMS["Fleet Manager Service<br/>(API Handler)"]
        FM_APIs["Fleet Manager APIs<br/>- addVehicle<br/>- updateVehicle<br/>- deleteVehicle<br/>- seeVehicles<br/>- seeVehicle<br/>- overSpeeding<br/>- addAlert<br/>- showAlerts"]
    end
    
    subgraph Backend["Backend - Fleet Manager Service"]
        FM_Controller["Fleet Manager Controller<br/>@RestController<br/>/fleetManager"]
        FM_Service["Fleet Manager Service<br/>- signup()<br/>- login()<br/>- getProfile()<br/>- addVehicle()<br/>- updateVehicle()<br/>- deleteVehicle()<br/>- getVehicles()<br/>- overSpeeding()<br/>- addAlert()"]
        FM_JWT["JWT Service<br/>- Token Generation<br/>- Token Validation<br/>- Token Invalidation"]
        FM_UserDetailsService["MyUserDetailsService<br/>Load User Details"]
    end
    
    subgraph Data_Layer["Data Layer"]
        FM_Repo["Fleet Manager Repository<br/>- User Repo<br/>- Vehicle Repo<br/>- Alert Repo"]
        FM_DB["Database<br/>- FleetManagerData<br/>- Vehicle<br/>- AlertTable<br/>- OverSpeedingData"]
    end
    
    subgraph External["External Services"]
        Driver_Service["Driver Service<br/>(Feign Client)"]
    end
    
    %% Frontend Flows
    FM_Login -->|Username/Password| FMS
    FM_Dashboard -->|View Stats| FMS
    FM_Inventory -->|Add/Update/Delete| FMS
    FM_Alerts -->|Create/View Alerts| FMS
    FM_Profile -->|Get Profile| FMS
    
    %% API Layer to Backend
    FMS --> FM_APIs
    FM_APIs -->|HTTP Request| FM_Controller
    
    %% Controller Flow
    FM_Controller -->|Auth Token| FM_JWT
    FM_JWT -->|Validate Token| FM_UserDetailsService
    FM_Controller -->|Business Logic| FM_Service
    
    %% Service Layer
    FM_Service -->|Query/Update| FM_Repo
    FM_Service -->|External Call| Driver_Service
    
    %% Data Layer
    FM_Repo -->|CRUD| FM_DB
    
    %% Response Flow
    FM_DB -->|Data| FM_Repo
    FM_Repo -->|Result| FM_Service
    FM_Service -->|Response| FM_Controller
    FM_Controller -->|JSON Response| FM_APIs
    FM_APIs -->|Data| FMS
    FMS -->|Display| FM_Dashboard
    FMS -->|Display| FM_Inventory
    FMS -->|Display| FM_Alerts
    FMS -->|Display| FM_Profile
    
    %% Styles
    classDef frontend fill:#90EE90,stroke:#2d5016,stroke-width:2px,color:#000
    classDef api fill:#87CEEB,stroke:#1e3a5f,stroke-width:2px,color:#000
    classDef backend fill:#DDA0DD,stroke:#4a0080,stroke-width:2px,color:#000
    classDef data fill:#FFB6C1,stroke:#8B0000,stroke-width:2px,color:#000
    classDef external fill:#FFD700,stroke:#8B7500,stroke-width:2px,color:#000
    
    class FM_Login,FM_Dashboard,FM_Inventory,FM_Alerts,FM_Profile frontend
    class FMS,FM_APIs api
    class FM_Controller,FM_Service,FM_JWT,FM_UserDetailsService backend
    class FM_Repo,FM_DB data
    class Driver_Service external
```

## Data Entities

### 1. FleetManagerData
- fleetManagerId
- name
- email
- phone
- password (hashed)
- company
- status

### 2. Vehicle
- regNo (Primary Key)
- model
- fuelType
- currentFuel
- mileage
- location
- status
- maintenanceDate

### 3. AlertTable
- alertId
- fleetManagerId
- vehicleRegNo
- alertType (MAINTENANCE, FUEL, OVERSPEED, etc.)
- severity (HIGH, MEDIUM, LOW)
- description
- createdAt
- resolvedAt

### 4. OverSpeedingData
- speedingId
- regNo
- speed
- location
- timestamp

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/fleetManager/signup` | Register new Fleet Manager |
| POST | `/fleetManager/login` | Fleet Manager Login |
| POST | `/fleetManager/logout` | Logout Fleet Manager |
| POST | `/fleetManager/profile` | Get Fleet Manager Profile |
| POST | `/fleetManager/addVehicle` | Add New Vehicle |
| POST | `/fleetManager/updateVehicle` | Update Vehicle (Fuel) |
| POST | `/fleetManager/deleteVehicle` | Delete Vehicle |
| POST | `/fleetManager/seeVehicles` | Get All Vehicles |
| POST | `/fleetManager/seeVehicle` | Get Single Vehicle |
| POST | `/fleetManager/overSpeeding` | Record Overspeeding Incident |
| POST | `/fleetManager/addAllert` | Create Alert |
| POST | `/fleetManager/showAllAllerts` | View All Alerts |

## Data Flow Steps

1. **Authentication Flow**
   - Fleet Manager enters credentials
   - Frontend sends signup/login request
   - Backend validates against database
   - JWT token generated
   - Token stored in frontend storage

2. **Vehicle Management Flow**
   - Fleet Manager adds/updates/deletes vehicle
   - Frontend validates input
   - Request sent with auth token
   - Backend validates token via JWT service
   - Service queries/updates vehicle repository
   - Database persists changes
   - Response returned to frontend
   - UI updates with new data

3. **Alert Management Flow**
   - System records overspeeding or maintenance events
   - Alert created with severity level
   - Alert stored in database
   - Fleet Manager views alerts on dashboard
   - Alerts can be acknowledged or resolved

4. **Profile Management Flow**
   - Fleet Manager requests profile
   - Token validated
   - User service retrieves data from database
   - Profile data returned and displayed
