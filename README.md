# Task Manager 

A **scalable and modular Task Management System** with **user authentication, task management, real-time notifications, and more**.  
Designed with **Node.js, Express.js, MongoDB, WebSockets and nodemailer** using **Template pattern**.
---

##  Features
✅ **User Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee , Viewer)

✅ **Task Management**
- CRUD operations for tasks and subtasks
- Task priority levels (High, Medium, Low)
- Assign tasks to users
- Due dates & dependencies

✅ **Task Categories & Tags**
- Categorize tasks (Work, Personal, Urgent, etc.)
- Add custom tags for organization

✅ **Subtasks & Dependencies**
- Tasks can have multiple subtasks
- Set dependencies between tasks

✅ **Realtime Notifications System**
- **Real-time WebSocket notifications** for new tasks & updates
- **Email notifications** for task assignments

✅ **Search & Filters**
- Search tasks by name, category, or tag
- Filter tasks by priority, due date, or assignee

  ## 📌 Tech Stack
| Technology  | Purpose  |
|------------|---------|
| **Node.js**  | Backend runtime |
| **Express.js**  | Web framework |
| **MongoDB + Mongoose**  | NoSQL database & ODM |
| **Socket.io**  | Real-time notifications |
| **JWT (jsonwebtoken)**  | User authentication |
| **bcrypt**  | Password hashing |
| **Express-validator**  | Input validation |
| **Nodemailer**  | Email notifications |

### Installation

To test locally 

1. Clone the repo
```sh
git clone https://github.com/AbdelrhmanJaber/task-manager.git
```

2. Install dependencies

```sh
npm install 
```
