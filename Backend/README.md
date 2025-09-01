# VISAGE Backend API

Backend server for the VISAGE Smart Campus System with MySQL database integration and user management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL 8.0+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   Create a `.env` file in the root directory with:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=0621
   DB_NAME=visage_smart_campus
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Setup

The server will automatically:
- Create the database if it doesn't exist
- Create necessary tables
- Insert a default admin user

### Default Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** `admin`
- **Privilege Level:** `10`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/verify` - Verify JWT token

### Users Management
- `GET /api/users` - Get all users with privileges
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/privileges` - Get user privileges

### System
- `GET /api/health` - Health check

## 🔐 User Roles & Privileges

### Admin (Level 10)
- User management
- System configuration
- Full data access
- Report generation

### Professor (Level 5)
- Class management
- Student records
- Attendance tracking
- Grade management

### Student (Level 1)
- View schedule
- View grades
- Attendance check-in/out

### Staff (Level 3)
- Student support
- Basic reports

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention
- CORS protection
- Helmet security headers

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password_hash` - Hashed password
- `first_name` - First name
- `last_name` - Last name
- `role` - User role (admin/professor/student/staff)
- `department` - Department
- `privilege_level` - Numeric privilege level (1-10)
- `is_active` - Account status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### User Privileges Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `privilege_name` - Privilege identifier
- `privilege_description` - Privilege description
- `is_granted` - Whether privilege is active
- `granted_at` - When privilege was granted
- `granted_by` - Who granted the privilege

## 🔧 Development

### Project Structure
```
Backend/
├── config/
│   └── database.js      # Database configuration
├── routes/
│   ├── auth.js          # Authentication routes
│   └── users.js         # User management routes
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md           # This file
```

### Adding New Routes
1. Create route file in `routes/` directory
2. Import and use in `server.js`
3. Follow the existing pattern for error handling

### Database Queries
- Use parameterized queries to prevent SQL injection
- Use connection pool for better performance
- Handle errors gracefully

## 🚨 Error Handling

All API endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 📝 Logging

- Morgan for HTTP request logging
- Console logging for errors and important events
- Structured logging format

## 🔄 CORS Configuration

Configured to allow requests from the frontend (default: http://localhost:3000)

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure proper CORS origins
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Set up proper logging
7. Configure database connection pooling

## 🤝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Test your changes
5. Update documentation

## 📞 Support

For issues or questions, please contact the development team.
