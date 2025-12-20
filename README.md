# Urban Bank - Complete Banking Website

A modern, full-featured banking website with admin portal built using React, TypeScript, Vite, and CodeIgniter 4.

## 🌟 Features

### Public Website
- **Home Page** with hero slider, about section, and latest news
- **Deposits Page** with clickable product cards and detail pages
- **Loans Page** with clickable product cards and detail pages
- **Product Detail Pages** with comprehensive information
- **Branch Locator** with interactive map
- **Gallery**, News, Events, Downloads sections
- **Contact Page** with inquiry form
- **Responsive Design** for all devices

### Admin Portal
- **Dashboard** with statistics
- **Product Management** (Deposits & Loans)
  - Add/Edit/Delete products
  - Manage interest rates
  - Configure features
- **Content Management**
  - News & Events
  - Gallery
  - Downloads
  - Financial Reports
- **Branch Management**
- **Team Members Management**
- **Settings Management**
- **Secure Authentication**

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS** for styling
- **Radix UI** components
- **Lucide React** icons
- **Axios** for API calls
- **Sonner** for toast notifications

### Backend
- **CodeIgniter 4** PHP Framework
- **MySQL 8** Database
- **RESTful API** architecture
- **JWT Authentication**
- **CORS** enabled

## 📋 Prerequisites

- Node.js 18+ and npm
- PHP 8.1+
- MySQL 8+
- Composer

## 🛠️ Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sivaji786/urbanbank.git
cd urbanbank
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Backend Setup

```bash
# Navigate to API folder
cd api

# Install dependencies
composer install

# Configure database
# Edit api/app/Config/Database.php with your credentials

# Run migrations
php spark migrate

# Seed database
php spark db:seed DatabaseSeeder

# Start development server
php spark serve
```

The API will run on `http://localhost:8080`

## 🏗️ Production Build

### Build Frontend

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
urbanbank/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── admin/          # Admin portal components
│   │   └── ui/             # Reusable UI components
│   ├── api/                # API client configuration
│   ├── contexts/           # React contexts
│   └── utils/              # Utility functions
├── api/                     # Backend API
│   ├── app/                # CodeIgniter application
│   │   ├── Config/        # Configuration files
│   │   ├── Controllers/   # API controllers
│   │   ├── Models/        # Database models
│   │   ├── Database/      # Migrations & Seeders
│   │   └── Filters/       # Request filters
│   └── public/            # Public entry point
├── build/                   # Production build (generated)
└── DEPLOYMENT.md           # Deployment guide
```

## 🔐 Default Credentials

**Admin Login:**
- Email: `admin@urbanbank.com`
- Password: `admin123`

⚠️ **Important:** Change the default password after first login!

## 🌐 Production URLs

- **Website**: https://gcub.digitalks.in/
- **API**: https://gcub.digitalks.in/api/public/index.php
- **Admin Portal**: https://gcub.digitalks.in/#admin

## 📝 Environment Variables

The project uses environment-based configuration:

- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.example` - Template file

## 🔧 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

### Backend

- `php spark serve` - Start development server
- `php spark migrate` - Run database migrations
- `php spark db:seed DatabaseSeeder` - Seed database

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [CodeIgniter 4 Docs](https://codeigniter.com/user_guide/)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Authors

- Sivaji - Initial work

## 🙏 Acknowledgments

- Radix UI for accessible components
- Lucide for beautiful icons
- CodeIgniter team for the excellent framework