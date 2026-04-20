# Expense Tracker — Backend

REST API built with **Node.js**, **Express**, and **MongoDB Atlas**.

## 🔗 Live API

```
https://expencebackend-production-f8ed.up.railway.app/api
```

## 🧪 Demo Account

| | |
|---|---|
| **Email** | vikendrajangid@gmail.com |
| **Password** | Test@123 |

---

## Local Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

Start the server:

```bash
npm run dev      # development — nodemon
npm start        # production
```

Server runs at `http://localhost:5000`

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login, returns JWT token | ❌ |

#### POST `/api/auth/register`
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "Test@123"
}
```

#### POST `/api/auth/login`
```json
{
  "email": "rahul@example.com",
  "password": "Test@123"
}
```

Response:
```json
{
  "token": "<jwt_token>",
  "user": { "id": "...", "name": "Rahul Sharma", "email": "rahul@example.com" }
}
```

---

### Expenses

All expense routes require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | List expenses (filters, sort, pagination) |
| POST | `/api/expenses` | Create a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses/summary` | Analytics aggregation |

#### GET `/api/expenses` — Query Params

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `category` | string | — | Filter by category |
| `startDate` | ISO string | — | Filter from date |
| `endDate` | ISO string | — | Filter to date |
| `sortBy` | `date` \| `amount` | `date` | Sort field |
| `order` | `asc` \| `desc` | `desc` | Sort direction |

#### POST `/api/expenses` — Body
```json
{
  "title": "Grocery shopping",
  "amount": 1500,
  "category": "Food",
  "date": "2025-04-19T00:00:00.000Z",
  "notes": "Weekly groceries"
}
```

#### GET `/api/expenses/summary` — Query Params

| Param | Type | Description |
|-------|------|-------------|
| `startDate` | ISO string | Optional range start |
| `endDate` | ISO string | Optional range end |

Response:
```json
{
  "byCategory": [{ "_id": "Food", "total": 5000, "count": 3 }],
  "monthTotal": 8500,
  "yearTotal": 42000,
  "highestCategory": "Food",
  "monthlyTrend": [{ "_id": { "year": 2025, "month": 4 }, "total": 8500 }]
}
```

---

## Categories

`Food` `Transport` `Shopping` `Health` `Entertainment` `Utilities` `Other`

---

## Deployment (Railway)

Set these environment variables in Railway dashboard:

```env
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_secret_key>
PORT=5000
```
