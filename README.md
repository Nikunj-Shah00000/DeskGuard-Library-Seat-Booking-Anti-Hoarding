# 📚 DeskGuard AI

<div align="center">

### 🚀 Smart Library Operating System

#### Eliminating Seat Hoarding Through Real-Time Occupancy Intelligence, Fair Access Automation, and Predictive Analytics

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Redis](https://img.shields.io/badge/Redis-Realtime-red)
![AI](https://img.shields.io/badge/AI-Powered-purple)
![QR](https://img.shields.io/badge/QR-Authentication-black)

</div>

---

# 🌟 The Problem

University libraries suffer from a common issue:

* Students reserve desks with bags and leave.
* Seats remain unavailable despite being unused.
* Other students waste time searching for study space.
* Librarians lack real-time visibility.
* No occupancy intelligence exists.
* No predictive crowd management.

Result:

❌ Reduced seat utilization

❌ Student frustration

❌ Resource wastage

❌ Manual monitoring overhead

---

# 💡 Our Solution

DeskGuard AI transforms library seating into a transparent, intelligent, and automated ecosystem.

Students can:

* Scan QR codes to occupy desks
* View live availability maps
* Join waiting queues
* Receive automatic allocations
* Earn study achievements

Librarians gain:

* Real-time monitoring
* Occupancy analytics
* Abandonment detection
* Lost & Found management
* Utilization reports

---

# ✨ Feature Matrix

| Core Features      | Smart Features            | Analytics            |
| ------------------ | ------------------------- | -------------------- |
| QR Check-In        | Smart Seat Recommendation | Occupancy Heatmaps   |
| Away Mode          | Queue Auto-Allocation     | Peak Hour Analytics  |
| Auto Seat Recovery | Noise Heatmap             | Forecasting          |
| Live Seat Map      | Study Streaks             | Abandonment Analysis |
| Notifications      | Lost & Found Assistant    | Zone Utilization     |

---

# 🧠 Innovation Features

## 🎯 1. Smart Seat Recommendation Engine

Instead of manually searching for desks, students receive personalized seat recommendations.

Factors:

* Near power outlets
* Quiet zones
* Window preference
* Group study areas
* Previous seating history
* Current occupancy

Example:

```text
Recommended Seat:

Desk A-14
✓ Near Charging Point
✓ Quiet Zone
✓ 2 Seats Away
```

---

## ⏳ 2. Queue & Auto-Allocation System

When the library is full:

Students join a virtual queue.

```text
Current Queue Position: #3

Estimated Wait:
12 Minutes
```

Once a seat becomes available:

* System reserves it automatically
* Student receives notification
* Reservation expires after a grace period

No more physical waiting.

---

## 🔊 3. Noise Heatmap

Students can report noise levels.

The map displays:

```text
🟢 Quiet
🟡 Moderate
🔴 Noisy
```

Example:

```text
Zone A → Quiet
Zone B → Moderate
Zone C → Noisy
```

Benefits:

* Better study experience
* Self-regulating environment
* Improved space utilization

---

## 🏆 4. Gamified Study Streaks

Encourages productive library usage.

Students earn:

* Daily Study Streaks
* Weekly Achievements
* Attendance Badges
* Focus Master Awards

Example:

```text
🔥 Study Streak: 14 Days

🏅 Achievement:
Consistency Champion
```

Weekly leaderboard:

```text
1. Alex – 42 Hours
2. Sarah – 38 Hours
3. John – 35 Hours
```

---

## 📈 5. Occupancy Forecast

Predicts crowd levels for the next 8 hours.

Using:

* Historical data
* Seasonal patterns
* Exam schedules
* Current occupancy

Example:

```text
11 AM → 65%

1 PM → 92%

4 PM → 78%

6 PM → 45%
```

Students can plan visits accordingly.

---

## 🎒 6. Lost & Found Assistant

When desks are marked abandoned:

Librarians can record discovered items.

```text
Item:
Wireless Earbuds

Found At:
Desk B-12

Time:
14:05
```

Students receive notifications if ownership can be identified.

---

## 📊 7. Enhanced Library Analytics

Provides actionable insights.

### Zone Heatmaps

Most used areas.

### Peak Hour Detection

Busiest periods.

### Seat Utilization

Occupancy percentages.

### Abandonment Rates

Most frequently abandoned zones.

### Study Trends

Average session duration.

### Waitlist Analysis

Demand forecasting.

---

# 🗺️ Real-Time Smart Library Map

```text
🟢 Available

🔴 Occupied

🟡 Away

⚫ Abandoned

🔵 Reserved

🟣 Recommended
```

Example:

```text
┌─────────────────────────────┐
│ 🟢 A1 │ 🔴 A2 │ 🟣 A3 │
│ 🟡 B1 │ 🔵 B2 │ ⚫ B3 │
│ 🟢 C1 │ 🔴 C2 │ 🟢 C3 │
└─────────────────────────────┘
```

---

# ⚙️ Engineering Challenge

## Server-Side Timer Architecture

All timers run on the backend.

Never in the browser.

Benefits:

* Prevents tampering
* Accurate occupancy
* Reliable synchronization

---

## Background Seat Sweeper

Runs every minute.

```text
Check Occupied Seats
        ↓
Check Away Timers
        ↓
Check Expired Sessions
        ↓
Mark Abandoned
        ↓
Release Seat
        ↓
Assign Queue User
        ↓
Update Map
```

---

# 🏗️ System Architecture

```text
Students / Librarians
          │
          ▼
React Frontend
│
├─ Interactive SVG Map
├─ Queue Management
├─ QR Scanner
├─ Analytics Dashboard
└─ Notifications

          ▼

API Layer
│
├─ Authentication
├─ Seat Service
├─ Queue Service
├─ Recommendation Engine
├─ Gamification Service
├─ Lost & Found Service
└─ Analytics Service

          ▼

Background Workers
│
├─ Seat Sweeper
├─ Queue Processor
├─ Forecast Generator
└─ Notification Service

          ▼

Database Layer
│
├─ PostgreSQL
├─ Redis
└─ Object Storage
```

---

# 📊 Dashboard Metrics

| Metric              | Value     |
| ------------------- | --------- |
| Total Seats         | 500       |
| Occupied            | 312       |
| Available           | 148       |
| Queue Length        | 28        |
| Avg Session Time    | 2.4 Hours |
| Utilization Rate    | 78%       |
| Abandonment Rate    | 4.2%      |
| Noise Reports Today | 87        |

---

# 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* SVG Map Rendering
* Framer Motion

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Redis

### Analytics & AI

* Python
* Pandas
* Scikit-Learn
* NumPy

### Infrastructure

* Docker
* AWS
* GitHub Actions

---

# 🚀 Future Scope

* AI Study Partner
* Indoor Navigation
* Smart Desk Sensors
* RFID Integration
* Face Recognition Check-In
* Cross-Campus Library Network
* Voice Assistant
* Library Digital Twin

---

# 🏆 Why DeskGuard AI?

✅ Solves a real-world university problem

✅ Strong backend engineering challenge

✅ Fair resource allocation

✅ Real-time occupancy intelligence

✅ Predictive analytics

✅ Gamification for engagement

✅ Scalable to thousands of seats

✅ Applicable across universities worldwide

---

### ⭐ Smart Libraries Start with Smart Desks
DeskGuard AI is not just a seat booking system—it is a real-time Library Operating System that combines occupancy intelligence, fairness automation, predictive analytics, and student engagement into a single platform.
