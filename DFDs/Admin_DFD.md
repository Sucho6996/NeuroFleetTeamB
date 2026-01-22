# Admin Data Flow Diagram (DFD)

## Overview
This DFD represents the data flow for Admin operations including system monitoring, dashboard analytics, fleet statistics, and heatmap visualization.

```mermaid
graph TB
    subgraph Frontend["Frontend - Admin Dashboard"]
        Admin_Login["Admin Login"]
        Admin_Dashboard["Admin Dashboard<br/>(KPI Summary)"]
        Admin_Analytics["Analytics & Reports<br/>(Fleet Statistics)"]
        Admin_Locations["Fleet Locations Map<br/>(Real-time)"]
        Admin_Heatmap["Heatmap View<br/>(Pickup/Dropoff)"]
        Admin_Profile["View Profile"]
    end
    
    subgraph API_Layer["API Layer - Frontend Services"]
        Admin_Service["Admin Service<br/>(API Handler)"]
        Admin_APIs["Admin APIs<br/>- getDashboardSummary<br/>- getFleetLocations<br/>- getHeatmapData<br/>- getFleetDistribution<br/>- getAnalytics"]
    end
    
    subgraph Backend["Backend - Admin Service"]
        Admin_Controller["Admin Controller<br/>@RestController<br/>/admin"]
        Admin_BizLogic["Admin Service<br/>- signup()<br/>- login()<br/>- getProfile()<br/>- getStats()<br/>- getLocations()<br/>- getHeatmap()"]
        Admin_JWT["JWT Service<br/>- Token Generation<br/>- Token Validation"]
        Admin_UserDetailsService["MyUserDetailsService<br/>Load Admin Details"]
    end
    
    subgraph Data_Processing["Data Aggregation Layer"]
        Stats_Aggregator["Statistics Aggregator<br/>- Total Fleet Count<br/>- Active Vehicles<br/>- Trips Count<br/>- Active Routes<br/>- EV Utilization"]
        Location_Processor["Location Processor<br/>- GPS Coordinates<br/>- Vehicle Status<br/>- Last Update Time"]
        Heatmap_Generator["Heatmap Generator<br/>- Trip Density<br/>- Pickup Points<br/>- Dropoff Points<br/>- Cluster Analysis"]
    end
    
    subgraph Data_Layer["Data Layer"]
        Admin_Repo["Admin Repository<br/>- User Repo<br/>- Vehicle Repo<br/>- Trip Repo<br/>- Location Repo"]
        Admin_DB["Database<br/>- AdminData<br/>- Vehicle<br/>- Trip<br/>- Location"]
        Cache["Cache Layer<br/>(Redis)<br/>- Dashboard Stats<br/>- Location Cache"]
    end
    
    subgraph External["External Services"]
        Location_Service["Location Service<br/>(GPS/Telemetry)"]
        Analytics_Engine["Analytics Engine<br/>(Data Processing)"]
    end
    
    %% Frontend Flows
    Admin_Login -->|Credentials| Admin_Service
    Admin_Dashboard -->|Request Stats| Admin_Service
    Admin_Analytics -->|Request Reports| Admin_Service
    Admin_Locations -->|Request Locations| Admin_Service
    Admin_Heatmap -->|Request Heatmap| Admin_Service
    Admin_Profile -->|Get Profile| Admin_Service
    
    %% API Layer to Backend
    Admin_Service --> Admin_APIs
    Admin_APIs -->|HTTP Request| Admin_Controller
    
    %% Controller Flow
    Admin_Controller -->|Auth Token| Admin_JWT
    Admin_JWT -->|Validate Token| Admin_UserDetailsService
    Admin_Controller -->|Business Logic| Admin_BizLogic
    
    %% Service to Data Processing
    Admin_BizLogic -->|Dashboard Request| Stats_Aggregator
    Admin_BizLogic -->|Location Request| Location_Processor
    Admin_BizLogic -->|Heatmap Request| Heatmap_Generator
    
    %% External Data Sources
    Location_Service -->|GPS Data| Location_Processor
    Analytics_Engine -->|Processed Data| Stats_Aggregator
    Analytics_Engine -->|Trip Data| Heatmap_Generator
    
    %% Data Processing to Data Layer
    Stats_Aggregator -->|Query| Admin_Repo
    Location_Processor -->|Query| Admin_Repo
    Heatmap_Generator -->|Query| Admin_Repo
    
    %% Data Layer
    Admin_Repo -->|CRUD| Admin_DB
    Admin_Repo -->|Cache Check/Set| Cache
    Cache -->|Quick Fetch| Admin_Repo
    
    %% Response Flow
    Admin_DB -->|Raw Data| Admin_Repo
    Admin_Repo -->|Aggregated Data| Stats_Aggregator
    Admin_Repo -->|Location Data| Location_Processor
    Admin_Repo -->|Trip Data| Heatmap_Generator
    
    Stats_Aggregator -->|Summary| Admin_BizLogic
    Location_Processor -->|Map Data| Admin_BizLogic
    Heatmap_Generator -->|Density Data| Admin_BizLogic
    
    Admin_BizLogic -->|Response| Admin_Controller
    Admin_Controller -->|JSON Response| Admin_APIs
    Admin_APIs -->|Data| Admin_Service
    
    Admin_Service -->|Display KPIs| Admin_Dashboard
    Admin_Service -->|Display Reports| Admin_Analytics
    Admin_Service -->|Display Markers| Admin_Locations
    Admin_Service -->|Display Heatmap| Admin_Heatmap
    Admin_Service -->|Display Profile| Admin_Profile
    
    %% Styles
    classDef frontend fill:#90EE90,stroke:#2d5016,stroke-width:2px,color:#000
    classDef api fill:#87CEEB,stroke:#1e3a5f,stroke-width:2px,color:#000
    classDef backend fill:#DDA0DD,stroke:#4a0080,stroke-width:2px,color:#000
    classDef processing fill:#F0E68C,stroke:#8B8B00,stroke-width:2px,color:#000
    classDef data fill:#FFB6C1,stroke:#8B0000,stroke-width:2px,color:#000
    classDef external fill:#FFD700,stroke:#8B7500,stroke-width:2px,color:#000
    
    class Admin_Login,Admin_Dashboard,Admin_Analytics,Admin_Locations,Admin_Heatmap,Admin_Profile frontend
    class Admin_Service,Admin_APIs api
    class Admin_Controller,Admin_BizLogic,Admin_JWT,Admin_UserDetailsService backend
    class Stats_Aggregator,Location_Processor,Heatmap_Generator processing
    class Admin_Repo,Admin_DB,Cache data
    class Location_Service,Analytics_Engine external
```

## Data Entities

### 1. AdminData
- adminId
- name
- email
- phone
- password (hashed)
- adminRole (SUPER_ADMIN, ADMIN)
- department
- permissions
- status

### 2. Vehicle
- regNo (Primary Key)
- model
- fuelType
- currentFuel
- mileage
- status
- assignedFleetManager
- location
- lastUpdated

### 3. Trip
- tripId
- vehicleRegNo
- driverId
- startLocation
- endLocation
- startTime
- endTime
- distance
- cost

### 4. Location
- locationId
- vehicleRegNo
- latitude
- longitude
- timestamp
- speed
- heading

### 5. Dashboard Summary (KPIs)
- totalFleet
- activeVehicles
- tripsToday
- activeRoutes
- evUtilization (%)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/signup` | Register new Admin |
| POST | `/admin/login` | Admin Login |
| POST | `/admin/logout` | Logout Admin |
| POST | `/admin/profile` | Get Admin Profile |
| GET | `/admin/stats/summary` | Get Dashboard KPIs |
| GET | `/admin/fleet/locations` | Get Fleet Locations |
| GET | `/admin/trips/heatmap` | Get Heatmap Data |
| GET | `/admin/analytics/reports` | Get Analytics Reports |
| GET | `/admin/fleet/distribution` | Get Fleet Distribution |

## Data Flow Steps

1. **Authentication Flow**
   - Admin enters credentials
   - Frontend sends login request
   - Backend validates against AdminData table
   - JWT token generated with admin role
   - Token stored in frontend storage

2. **Dashboard Summary Flow**
   - Admin accesses dashboard
   - Frontend requests KPI summary
   - Backend aggregator queries:
     - Total vehicles from Vehicle table
     - Active vehicles (status = ACTIVE)
     - Today's trips from Trip table
     - Active routes from Route table
     - EV utilization percentage
   - Data cached in Redis for performance
   - Summary displayed on dashboard

3. **Fleet Locations Flow**
   - Admin requests real-time locations
   - Frontend sends location request
   - Location service provides GPS data
   - Processor queries latest Location records
   - Markers generated for map display
   - Real-time updates via WebSocket/Polling

4. **Heatmap Data Flow**
   - Admin requests heatmap view
   - Heatmap generator queries Trip table
   - Extracts start/end locations
   - Calculates trip density by area
   - Generates cluster data
   - Displays as gradient overlay on map

5. **Analytics Report Flow**
   - Analytics engine processes raw trip data
   - Generates statistics:
     - Total trips by day/week/month
     - Revenue metrics
     - Driver performance
     - Vehicle utilization
   - Reports formatted and sent to frontend
   - Cached for quick access

## Key Features

- **Real-time Monitoring**: Live vehicle locations with minimal latency
- **Analytics**: Comprehensive trip and fleet statistics
- **Performance**: Redis caching for frequently accessed data
- **Scalability**: Aggregation layer handles large datasets
- **Security**: JWT-based authentication with role-based access
