# API Endpoint Checklist

## Public Endpoints (No Auth Required)

### Content Endpoints
- [ ] GET `/stats` - Dashboard statistics
- [ ] GET `/news` - Get all news items
- [ ] GET `/news/:id` - Get single news item
- [ ] GET `/events` - Get all events
- [ ] GET `/gallery` - Get gallery images
- [ ] GET `/downloads` - Get download files
- [ ] GET `/reports` - Get financial reports
- [ ] GET `/slider` - Get slider images

### Product Endpoints
- [ ] GET `/products?category=deposit` - Get deposit products
- [ ] GET `/products?category=loan` - Get loan products
- [ ] GET `/products/:id` - Get single product

### Information Endpoints
- [ ] GET `/branches` - Get all branches
- [ ] GET `/team-members` - Get team members
- [ ] GET `/deaf-accounts` - Get deaf accounts info
- [ ] GET `/settings` - Get site settings
- [ ] GET `/pages/:slug` - Get page content (about-us, vision-mission, management)

### Application Endpoints
- [ ] POST `/applications/loan` - Submit loan application
- [ ] POST `/applications/deposit` - Submit deposit application

## Admin Endpoints (Auth Required)

### Authentication
- [ ] POST `/auth/login` - Admin login
- [ ] POST `/auth/logout` - Admin logout

### News Management
- [ ] POST `/news` - Create news
- [ ] PUT `/news/:id` - Update news
- [ ] DELETE `/news/:id` - Delete news

### Events Management
- [ ] POST `/events` - Create event
- [ ] PUT `/events/:id` - Update event
- [ ] DELETE `/events/:id` - Delete event

### Gallery Management
- [ ] POST `/gallery` - Upload image
- [ ] DELETE `/gallery/:id` - Delete image

### Downloads Management
- [ ] POST `/downloads` - Upload file
- [ ] PUT `/downloads/:id` - Update download
- [ ] DELETE `/downloads/:id` - Delete download

### Reports Management
- [ ] POST `/reports` - Upload report
- [ ] PUT `/reports/:id` - Update report
- [ ] DELETE `/reports/:id` - Delete report

### Product Management
- [ ] POST `/products` - Create product
- [ ] PUT `/products/:id` - Update product
- [ ] DELETE `/products/:id` - Delete product

### Branch Management
- [ ] POST `/branches` - Create branch
- [ ] PUT `/branches/:id` - Update branch
- [ ] DELETE `/branches/:id` - Delete branch

### Team Management
- [ ] POST `/team-members` - Add team member
- [ ] PUT `/team-members/:id` - Update team member
- [ ] DELETE `/team-members/:id` - Delete team member

### Settings Management
- [ ] PUT `/settings` - Update settings

### Page Management
- [ ] PUT `/pages/:slug` - Update page content

## Database Tables Required

- [ ] `users` - Admin users
- [ ] `news` - News items
- [ ] `events` - Events
- [ ] `gallery` - Gallery images
- [ ] `downloads` - Download files
- [ ] `reports` - Financial reports
- [ ] `products` - Deposit/Loan products
- [ ] `product_rates` - Interest rates
- [ ] `branches` - Branch locations
- [ ] `team_members` - Team members
- [ ] `deaf_accounts` - Deaf account info
- [ ] `settings` - Site settings
- [ ] `pages` - Page content
- [ ] `slider` - Slider images
- [ ] `loan_applications` - Loan applications
- [ ] `deposit_applications` - Deposit applications

## Configuration Files

- [ ] `api/app/Config/Database.php` - Database credentials
- [ ] `api/app/Config/App.php` - Base URL
- [ ] `api/app/Config/Cors.php` - CORS settings
- [ ] `api/app/Config/Routes.php` - API routes
- [ ] `api/.env` - Environment variables

## File Permissions

- [ ] `api/writable/` - 755 (writable)
- [ ] `api/public/uploads/` - 755 (writable)
- [ ] `api/writable/logs/` - 755 (writable)
- [ ] `api/writable/cache/` - 755 (writable)

## Common Issues

### 503 Service Unavailable
- Database connection failed
- Missing database tables
- Incorrect database credentials
- PHP errors in controllers

### 404 Not Found
- Route not defined in Routes.php
- Controller file missing
- Method not found in controller

### 500 Internal Server Error
- PHP syntax error
- Missing dependencies
- File permission issues
- Database query errors

### CORS Errors
- Domain not in allowedOrigins
- Missing CORS filter in routes
- Preflight OPTIONS not handled
