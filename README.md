# 💳 Payments Portal – Full Stack Application

This repository contains a **Payments Portal** built as part of a Full Stack module using  
**.NET 8 Web API** and **Angular 20**.

The application allows users to **view, add, edit, and delete payments**, with backend support for **idempotency** and **sequential payment reference generation**.

---

## 🎯 Goal

Build a small Payments Portal using:
- **Angular** for the frontend
- **.NET Core Web API** for the backend

The system is designed to:
- Prevent duplicate transactions
- Generate sequential payment references
- Be simple, responsive, and maintainable

---

## 🧱 Tech Stack

### Frontend
- Angular 20 (Standalone Components)
- Angular Material
- RxJS
- TypeScript

### Backend
- .NET 8 Web API
- Entity Framework Core
- SQL Server / SQLite / In-Memory Database
- Swagger (OpenAPI)

---

## 🚀 Features

### Payments List
- Displays payments in a grid
- Columns:
  - Reference
  - Amount
  - Currency
  - Created At
  - Actions (Edit / Delete)
- Pagination, sorting, and search
- Sticky table header
- **Add Payment** button (visible only on list page)

### Create Payment
- Fields:
  - Amount (number, must be greater than 0)
  - Currency (USD, EUR, INR, GBP)
- Generates `clientRequestId` (GUID) on save
- Sends `clientRequestId` to backend to prevent duplicates

### Edit Payment
- Update existing payment
- Delete payment with confirmation dialog

### UX Enhancements
- Confirmation dialog for delete actions
- Snackbar notifications for success and error messages
- Responsive Angular Material UI

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/payments` | Create payment |
| GET | `/api/payments` | List all payments |
| GET | `/api/payments/{id}` | Get payment by ID |
| PUT | `/api/payments/{id}` | Update payment |
| DELETE | `/api/payments/{id}` | Delete payment |

---

## 📐 Business Rules

- **Duplicate Prevention**
  - If the same `clientRequestId` is submitted again, the backend returns the existing payment instead of creating a new one.
- **Reference Format**
  - `PAY-YYYYMMDD-####`
  - Sequence resets per day.
- **Validation**
  - Amount must be greater than 0.
  - Currency must be one of:
    - USD
    - EUR
    - INR
    - GBP

---

## 🔁 Sample Flow

1. Add USD 100 on `2025-09-10`  
   → Reference generated: `PAY-20250910-0001`
2. Re-submit the same `clientRequestId`  
   → Existing payment is returned
3. Add EUR 250 on the same day  
   → Reference generated: `PAY-20250910-0002`
4. Edit or delete payments as needed

---

## 📂 Folder Structure

```text
payments-portal/
 ├── frontend/
 │   ├── src/app/
 │   │   ├── core/        # services, interceptors, guards
 │   │   ├── payments/    # list & form components
 │   │   ├── shared/      # dialogs, loader
 │   │   └── app.routes.ts
 │   └── environments/
 │
 ├── backend/
 │   └── Payments.Api/
 │       ├── Controllers/
 │       ├── Models/
 │       ├── Data/
 │       └── Program.cs
```

---

## 🏃 Run the Application Locally

### Backend (.NET)

```bash
dotnet restore
dotnet run
```

Swagger UI:
```
https://localhost:7270/swagger
```

---

### Frontend (Angular)

```bash
npm install
ng serve
```

Open in browser:
```
http://localhost:4200
```

> Angular proxy configuration is used to avoid CORS issues during development.

---

## 📸 Screenshots

### Payments List
<img width="1908" height="768" alt="image" src="https://github.com/user-attachments/assets/7f881b2c-3fb8-418d-90d8-2f2ed59ea026" />

### Create Payment
<img width="1908" height="623" alt="image" src="https://github.com/user-attachments/assets/94968e55-80a6-42b0-a03a-b15a41d8b554" />

### Edit Payment
<img width="1899" height="559" alt="image" src="https://github.com/user-attachments/assets/7292f528-15da-41ca-b775-4a8a10e2825c" />

### Delete Option
<img width="1895" height="852" alt="image" src="https://github.com/user-attachments/assets/e779a3a2-753d-4fbd-ae13-30dda291d144" />

### Swagger API
<img width="1828" height="913" alt="image" src="https://github.com/user-attachments/assets/53af8b36-0c8c-4883-8afa-eaf3651c3c17" />

### Database Schema
<img width="471" height="223" alt="image" src="https://github.com/user-attachments/assets/b85cdfd4-ccf8-4169-86f7-c0c205100216" />

---

## ✅ Evaluation Criteria Coverage

- ✔ End-to-end working portal
- ✔ Clean design and architecture
- ✔ Simple and responsive UI
- ✔ Readable, testable, and maintainable code
- ✔ No duplicate transactions
- ✔ Correct payment reference generation

---

## 👤 Author

**Kaushik Dudhat**  
Senior .NET Full Stack Developer