const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'insurance.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS quotes (
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
  )`);
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Insurance API is running' });
});

// Get all quotes (for admin purposes)
app.get('/api/quotes', (req, res) => {
  db.all('SELECT * FROM quotes ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching quotes:', err);
      return res.status(500).json({ error: 'Failed to fetch quotes' });
    }
    res.json({ quotes: rows });
  });
});

// Submit a new quote request
app.post('/api/quotes', (req, res) => {
  const {
    insuranceType,
    zipCode,
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    vehicleYear,
    vehicleMake,
    vehicleModel,
    homeValue,
    homeType,
    coverageAmount
  } = req.body;

  // Validation
  if (!insuranceType || !zipCode || !firstName || !lastName || !email || !phone || !dateOfBirth) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['insuranceType', 'zipCode', 'firstName', 'lastName', 'email', 'phone', 'dateOfBirth']
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // ZIP code validation (5 digits)
  const zipRegex = /^\d{5}$/;
  if (!zipRegex.test(zipCode)) {
    return res.status(400).json({ error: 'Invalid ZIP code format' });
  }

  const stmt = db.prepare(`
    INSERT INTO quotes (
      insurance_type, zip_code, first_name, last_name, email, phone, 
      date_of_birth, vehicle_year, vehicle_make, vehicle_model, 
      home_value, home_type, coverage_amount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([
    insuranceType, zipCode, firstName, lastName, email, phone,
    dateOfBirth, vehicleYear, vehicleMake, vehicleModel,
    homeValue, homeType, coverageAmount
  ], function(err) {
    if (err) {
      console.error('Error inserting quote:', err);
      return res.status(500).json({ error: 'Failed to submit quote request' });
    }

    res.status(201).json({
      message: 'Quote request submitted successfully',
      quoteId: this.lastID,
      estimatedContact: '24-48 hours'
    });
  });

  stmt.finalize();
});

// Get a specific quote by ID
app.get('/api/quotes/:id', (req, res) => {
  const quoteId = req.params.id;
  
  db.get('SELECT * FROM quotes WHERE id = ?', [quoteId], (err, row) => {
    if (err) {
      console.error('Error fetching quote:', err);
      return res.status(500).json({ error: 'Failed to fetch quote' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json({ quote: row });
  });
});

// Update quote status (for admin purposes)
app.patch('/api/quotes/:id/status', (req, res) => {
  const quoteId = req.params.id;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'processing', 'quoted', 'declined', 'converted'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: 'Invalid status',
      validStatuses: validStatuses
    });
  }
  
  db.run('UPDATE quotes SET status = ? WHERE id = ?', [status, quoteId], function(err) {
    if (err) {
      console.error('Error updating quote status:', err);
      return res.status(500).json({ error: 'Failed to update quote status' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json({ message: 'Quote status updated successfully' });
  });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const queries = [
    { name: 'total_quotes', sql: 'SELECT COUNT(*) as count FROM quotes' },
    { name: 'quotes_by_type', sql: 'SELECT insurance_type, COUNT(*) as count FROM quotes GROUP BY insurance_type' },
    { name: 'quotes_by_status', sql: 'SELECT status, COUNT(*) as count FROM quotes GROUP BY status' },
    { name: 'recent_quotes', sql: 'SELECT COUNT(*) as count FROM quotes WHERE created_at >= datetime("now", "-7 days")' }
  ];

  const results = {};
  let completed = 0;

  queries.forEach(query => {
    db.all(query.sql, [], (err, rows) => {
      if (err) {
        console.error(`Error in ${query.name}:`, err);
        results[query.name] = { error: err.message };
      } else {
        results[query.name] = rows;
      }
      
      completed++;
      if (completed === queries.length) {
        res.json(results);
      }
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Insurance API server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
