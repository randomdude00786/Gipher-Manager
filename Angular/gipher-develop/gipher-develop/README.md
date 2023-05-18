# Gipher

## Problem Statement

Build a system to manage and recommend GIFs to a user. Refer https://giphy.com/

## Requirements:
1. The application needs to fetch gifs from https://developers.giphy.com/docs/ and needs to store the data in Gipher
2. A frontend where the user can **view**, **bookmark** and add gifs to the favorites collection.

## Modules:
1. AccountManager - Should be able to manage user accounts
2. GipherUI -
  - User should be able to
    - search GIFs
    - bookmark GIFs
    - should be able to see bookmarked GIFs and Favorites created by him
  - Application should be a **responsive** which can smoothly run on mobile devices.
3. GipherManager - Application should be able to store all his
  - bookmarks
  - searches

## Flow of Modules

- **Building Gipher Frontend**:
  1. Building **Responsive** Views:
    1. Build a View to show all GIF’s
      1. GIF’s - Populating from external api
      2. Build a view to show all the gifs
      3. A view to authenticate users
  2. Using **Services** to populate these data in views
  3. Stitching these views using **Routes and Guards**
  4. E2E test cases and unit test cases
  5. **Writing CI configuration file**
  6. **Dockerizing the frontend**

- **Building the Gipher Account Manager**
  1. Creating a server in Java to 
    1. Facilitate registration and login using **JWT token** and MySQL
  2. Writing Swagger Documentation
  3. Unit Testing
  4. Write CI Configuration
  5. Dockerize the application

- **Building the Gipher Manager**
  1. Creating a server in Java to 
    2. Server should be able to perform **CRUD operation** over GIFs and bookmarked resources stored in MySQL
  2. Writing Swagger Documentation
  3. Unit Testing
  4. Write CI Configuration
  5. Dockerize the application

- Write docker-compose file to build both frontend and backend application

- Demonstrate the entire application