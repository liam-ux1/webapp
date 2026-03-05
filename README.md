# Wealth Management Web App

This is a fund management web application with an admin dashboard for monitoring users and managing withdrawals.

## Features

- **Admin Dashboard**: Modern, professional interface for platform administrators
- **User Management**: View and search registered clients
- **Withdrawal Management**: Approve or decline withdrawal requests
- **Deposit Tracking**: Monitor incoming deposits
- **Analytics**: Summary metrics and portfolio activity overview
- **Secure Access**: Admin authentication system (commented out for testing)

## Structure

- `index.html`: Main dashboard page
- `css/styles.css`: Custom styling with dark/light mode support
- `js/dashboard.js`: Dashboard logic and mock data

## Running the Application

1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open `http://localhost:8000` in your browser

## Admin Access

The admin authentication is currently commented out in `index.html` and `js/dashboard.js` for testing purposes. To enable:

1. Uncomment the auth modal in `index.html`
2. Uncomment the auth logic in `js/dashboard.js`
3. Set your admin password in the auth function

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- Bootstrap 5 for responsive design
- Font Awesome for icons
