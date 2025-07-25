# SecureLife Insurance - Full Stack Web Application

A modern, responsive insurance company website built with React and Express.js, inspired by Nationwide's design and functionality.

## Features

### Frontend (React + TypeScript)
- **Modern, responsive design** with professional insurance company styling
- **Multi-step quote form** with validation and progress tracking
- **Hero section** with company statistics and value proposition
- **Products showcase** featuring Auto, Home, Life, and Business insurance
- **Mobile-first responsive design** that works on all devices
- **Professional color scheme** with gradients and animations

### Backend (Express.js + SQLite)
- **RESTful API** for handling quote submissions
- **SQLite database** for storing quote requests
- **Input validation** and error handling
- **CORS enabled** for cross-origin requests
- **Analytics endpoints** for tracking quote statistics

### Quote Form Features
- **3-step progressive form** (Type & Location → Personal Info → Coverage Details)
- **Dynamic fields** based on insurance type selection
- **Real-time validation** with visual feedback
- **Support for multiple insurance types**: Auto, Home, Life, Business, Bundle
- **Responsive design** that adapts to mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, CSS3 with CSS Grid/Flexbox
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Custom CSS with modern design patterns
- **Development**: Concurrently for running both servers

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd insurance-app
   ```

2. **Install all dependencies**:
   ```bash
   npm run install-all
   ```

3. **Start the development servers**:
   ```bash
   npm run dev
   ```

This will start both the React frontend (http://localhost:3000) and Express backend (http://localhost:5000) concurrently.

### Individual Server Commands

- **Frontend only**: `npm run client`
- **Backend only**: `npm run server`
- **Build for production**: `npm run build`

## API Endpoints

### Quotes
- `POST /api/quotes` - Submit a new quote request
- `GET /api/quotes` - Get all quotes (admin)
- `GET /api/quotes/:id` - Get specific quote
- `PATCH /api/quotes/:id/status` - Update quote status

### Analytics
- `GET /api/analytics` - Get quote statistics and analytics

### Health Check
- `GET /api/health` - API health status

## Database Schema

The application uses SQLite with a `quotes` table containing:
- Customer information (name, email, phone, etc.)
- Insurance type and coverage details
- Vehicle/home information (when applicable)
- Quote status and timestamps

## Project Structure

```
insurance-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.tsx/css
│   │   │   ├── Hero.tsx/css
│   │   │   ├── QuoteForm.tsx/css
│   │   │   ├── Products.tsx/css
│   │   │   └── Footer.tsx/css
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── insurance.db       # SQLite database (created automatically)
│   └── package.json
├── package.json           # Root package.json with scripts
└── README.md
```

## Design Features

### Responsive Design
- Mobile-first approach with breakpoints at 480px, 768px, and 968px
- Flexible grid layouts that adapt to screen size
- Touch-friendly buttons and form elements on mobile

### Professional Styling
- Blue gradient color scheme (#2563eb to #1d4ed8)
- Smooth animations and hover effects
- Card-based layouts with subtle shadows
- Modern typography with Inter font family

### User Experience
- Progressive disclosure in the quote form
- Visual feedback for form validation
- Loading states and error handling
- Accessibility features with proper focus states

## Customization

### Colors
The primary color scheme can be modified in the CSS files. Look for:
- `#2563eb` (primary blue)
- `#1d4ed8` (darker blue)
- `#f8fafc` (light background)

### Content
- Update company name in `Header.tsx` and `Footer.tsx`
- Modify hero content in `Hero.tsx`
- Customize insurance products in `Products.tsx`

### Form Fields
Add or modify form fields in `QuoteForm.tsx` and update the corresponding database schema in `server/index.js`.

## Production Deployment

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Configure environment variables** for production database and CORS settings

3. **Deploy backend** to your hosting platform (Heroku, AWS, etc.)

4. **Deploy frontend** to a static hosting service (Netlify, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
