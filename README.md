![Снимок экрана 2024-07-08 235127](https://github.com/CookieVortex/Casino-website-cases/assets/24642100/02bb539e-f8ed-4ab2-9ed6-c1b9910b088b)
![Снимок экрана 2024-07-08 235132](https://github.com/CookieVortex/Casino-website-cases/assets/24642100/16a8461d-100e-47ea-b5e5-bf72608f1faf)
![Снимок экрана 2024-07-09 232323](https://github.com/CookieVortex/Casino-website-cases/assets/24642100/26bb0303-442b-43c8-9612-945a2ed4e851)



# Case Opening App

## Overview

The Case Opening App is a React application designed for managing loot items. It integrates Google OAuth for user authentication and provides administrators with functionalities to create, view, edit, and delete loot items. The app offers a responsive user interface for seamless navigation and interaction.

## Key Features

### Google OAuth Integration

- Utilizes the `@react-oauth/google` package for authentication.
- Fetches and stores user profile information upon login.
- Implements logout functionality to clear user data.

### Loot Management

- Allows administrators to manage loot items with custom names, prices, and images.
- Displays a list of existing loot items with their details.
- Supports editing and deletion of loot items.

## Loot Management Functionality

The Case Opening App enables administrators to perform various actions related to loot management:

- **Create Loot**: Admins can add new loot items by providing a name, price, and image URL. Upon creation, loot items are stored in the database.
  
- **View Loot**: The app fetches and displays all existing loot items stored in the database. Each item is presented with its name, price, image, and additional details if available.

- **Edit Loot**: Admins have the ability to modify existing loot items. This includes updating the name, price, or image of a specific loot item. Changes made are reflected immediately.

- **Delete Loot**: Admins can delete unwanted loot items from the database. This action permanently removes the selected item from the list of available loot.

## How to Run

To run the Case Opening App locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/CookieVortex/case-opening-app.git

npm start
Dependencies
react: ^17.0.2
react-dom: ^17.0.2
react-router-dom: ^6.0.2
@react-oauth/google: ^0.3.0
react-scripts: ^4.0.3
