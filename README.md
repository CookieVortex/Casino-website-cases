
[Снимок экрана 2024-07-08 235132](https://github.com/CookieVortex/Casino-website-cases/assets/24642100/16a8461d-100e-47ea-b5e5-bf72608f1faf)
![Снимок экрана 2024-07-08 235127](https://github.com/CookieVortex/Casino-website-cases/assets/24642100/02bb539e-f8ed-4ab2-9ed6-c1b9910b088b)

# Case Opening App!

## Overview

The Case Opening App is a React application that integrates Google OAuth for user authentication. It features a responsive user interface with a collapsible menu, user balance management, and profile display. The application is designed to provide a seamless user experience with easy navigation and personalized user interactions.

## Key Features

### Google OAuth Integration

- Utilizes the `@react-oauth/google` package for Google OAuth authentication.
- Fetches and stores user profile information upon successful login.
- Allows users to log out, clearing their profile data from the application state.

### User Interface

- **Header Component**: Displays the navigation menu, login button, and user balance.
- **Menu Items**: Interactive menu with icons for navigation.
- **Profile Greeting**: Shows a personalized greeting with the user's name and profile picture.
- **Logout Modal**: Confirms user intent to log out.

### Balance Management

- Fetches the user balance from an API endpoint after login.
- Displays the current balance in the header.
- Provides a button to refresh the balance.

### Responsive Design

- Collapsible menu for better user experience on mobile devices.
- Icons and images are used to enhance visual appeal.

## Components

### Header

The `Header` component is the main navigation and user interaction point. It includes:

- Logo and Menu: A logo that links to the home page and a responsive menu with navigation links.
- Login Button: Opens a modal for Google OAuth login.
- Profile Greeting: Displays user information and balance after login, with a logout option.

### Profile

The `Profile` component displays the user's profile information:

- Avatar: User's profile picture.
- Details: User's name and email.

### Modal

The `Modal` component is used for displaying the Google OAuth login interface.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/CookieVortex/case-opening-app.git
Navigate to the project directory:
bash

cd case-opening-app
Install dependencies:
bash

npm install
Create a .env file with your Google OAuth client ID:
env

REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
Start the development server:
bash

npm start
Dependencies
react: ^17.0.2
react-dom: ^17.0.2
react-router-dom: ^6.0.2
@react-oauth/google: ^0.3.0
react-scripts: ^4.0.3
