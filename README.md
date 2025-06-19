# React Signup Page

A modern, beautiful, and responsive signup page built with React. Features include form validation, password strength indicator, Google OAuth integration, and a sleek UI design.

## Features

- ✨ **Modern UI Design** - Clean, professional interface with gradient backgrounds
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Form Validation** - Comprehensive client-side validation with real-time feedback
- 🔐 **Password Strength Indicator** - Visual feedback for password strength
- 👁️ **Password Visibility Toggle** - Show/hide password functionality
- 🔑 **Google OAuth Integration** - One-click sign-in with Google account
- 🎨 **Smooth Animations** - Elegant transitions and micro-interactions
- 🌙 **Dark Mode Support** - Automatically adapts to system preferences
- ♿ **Accessibility** - Proper ARIA labels and keyboard navigation
- 📧 **Email Validation** - Real-time email format validation
- 📱 **Phone Validation** - International phone number support

## Technologies Used

- **React 18** - Modern React with hooks
- **CSS3** - Custom styling with modern features
- **Lucide React** - Beautiful icon library
- **Google Fonts** - Inter font family
- **Google OAuth** - Authentication integration

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd google-authenticator-signup-practice
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── SignupPage.js          # Main signup component
│   └── SignupPage.css         # Component styles
├── App.js                     # Main app component
├── App.css                    # App-level styles
├── index.js                   # Entry point
└── index.css                  # Global styles
```

## Authentication Options

### 1. Traditional Email Signup
Complete the form with:
- **First Name** - Required, minimum 2 characters
- **Last Name** - Required, minimum 2 characters
- **Email Address** - Required, valid email format
- **Phone Number** - Required, international format support
- **Password** - Required, minimum 8 characters with strength validation
- **Confirm Password** - Required, must match password
- **Terms Agreement** - Required checkbox

### 2. Google OAuth Sign-in
- One-click authentication with Google account
- Secure OAuth 2.0 flow
- Automatic user profile retrieval
- No password required

## Validation Rules

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- Special characters (optional, adds to strength)

### Password Strength Levels
- **Very Weak** (Red) - Basic requirements not met
- **Weak** (Orange) - Meets basic requirements
- **Fair** (Yellow) - Good length and variety
- **Good** (Light Green) - Strong combination
- **Strong** (Dark Green) - Excellent security

## Google OAuth Integration

The signup page includes a "Continue with Google" button that:

- Uses Google's official branding and colors
- Provides loading states during authentication
- Handles OAuth flow securely
- Retrieves user profile information
- Integrates seamlessly with the existing form

### Implementation Notes

The current implementation includes:
- Google OAuth button with proper styling
- Loading states and error handling
- Responsive design for all screen sizes
- Dark mode support for the Google button

For production use, you'll need to:
1. Set up a Google OAuth 2.0 client ID
2. Configure authorized origins and redirect URIs
3. Implement the actual OAuth flow with Google's API
4. Handle token validation and user creation on your backend

## Customization

### Colors
The app uses a beautiful gradient theme that can be customized in the CSS files:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Success color */
color: #10b981;

/* Error color */
color: #ef4444;

/* Google brand colors */
--google-blue: #4285F4;
--google-green: #34A853;
--google-yellow: #FBBC05;
--google-red: #EA4335;
```

### Styling
All styles are modular and can be easily customized. The component uses CSS custom properties for easy theming.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Icons from [Lucide React](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Google OAuth integration design patterns
- Design inspiration from modern web applications 