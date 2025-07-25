# Agent Instructions for Alpine Guard Insurance App

## Development Commands

### Start Development
- **Full stack development**: `npm run dev` (starts both frontend and backend)
- **Frontend only**: `npm run client` (React development server on port 3000)
- **Backend only**: `npm run server` (Express server on port 5000)

### Installation
- **Install all dependencies**: `npm run install-all`
- **Install root dependencies**: `npm install`
- **Install client dependencies**: `cd client && npm install`
- **Install server dependencies**: `cd server && npm install`

### Build & Test
- **Build for production**: `npm run build`
- **Test frontend**: `cd client && npm test`

## Project Structure

### Frontend (React + TypeScript)
- **Main App**: `/client/src/App.tsx`
- **Components**: `/client/src/components/`
  - `Header.tsx` - Navigation and branding
  - `Hero.tsx` - Hero section with stats
  - `QuoteForm.tsx` - Multi-step quote form
  - `Products.tsx` - Insurance products showcase
  - `Footer.tsx` - Footer with links and contact info
- **Styles**: Each component has its own `.css` file

### Backend (Express.js + SQLite)
- **Main Server**: `/server/index.js`
- **Database**: SQLite file created automatically at `/server/insurance.db`
- **API Endpoints**:
  - `POST /api/quotes` - Submit quote
  - `GET /api/quotes` - Get all quotes
  - `GET /api/quotes/:id` - Get specific quote
  - `PATCH /api/quotes/:id/status` - Update status
  - `GET /api/analytics` - Quote analytics
  - `GET /api/health` - Health check

## Code Style & Conventions

### React Components
- Use functional components with TypeScript
- Props interface definitions for type safety
- CSS modules for component-specific styling
- Responsive design with mobile-first approach

### Styling Guidelines
- **Primary colors**: #2563eb (blue), #1d4ed8 (dark blue)
- **Backgrounds**: #f8fafc (light), #1e293b (dark)
- **Typography**: Inter font family
- **Breakpoints**: 480px, 768px, 968px
- **Design patterns**: Cards, gradients, subtle shadows

### Backend Patterns
- Express.js with middleware for CORS and body parsing
- SQLite for data persistence
- Input validation and error handling
- RESTful API design

## Database Schema

### Quotes Table
```sql
CREATE TABLE quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  insurance_type TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  vehicle_year TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  home_value TEXT,
  home_type TEXT,
  coverage_amount TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);
```

## Key Features Implemented

### Quote Form
- 3-step progressive form with validation
- Dynamic fields based on insurance type
- Real-time validation with visual feedback
- Mobile-responsive design

### Professional Design
- Insurance company aesthetic inspired by Nationwide
- Responsive grid layouts
- Smooth animations and hover effects
- Accessibility considerations

### Full Stack Integration
- React frontend communicates with Express backend
- SQLite database for data persistence
- Error handling and loading states
- CORS configuration for development

## Development Notes

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- Database file is automatically created in `/server/insurance.db`
- All components are mobile-responsive
- Form validation includes email, phone, and ZIP code patterns
- CSS uses modern features like Grid, Flexbox, and CSS variables

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in package.json scripts if needed
2. **CORS errors**: Backend includes CORS middleware for development
3. **Database errors**: SQLite file is created automatically on first run
4. **Build errors**: Check TypeScript types and import paths

### Adding New Features
1. **New form fields**: Update `QuoteForm.tsx` and database schema
2. **New pages**: Add routes and components to frontend
3. **New API endpoints**: Add to `/server/index.js` with proper validation
4. **Styling changes**: Modify component CSS files
