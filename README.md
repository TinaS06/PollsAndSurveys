# PollsAndSurveys

# Introduction
PollsAndSurveys is a single-page web application built with Angular that allows users to easily create, manage, and participate in surveys. What the application supports is that users, whether they are logged in or anonymous, can create custom surveys with different question types, collect responses from users (both logged in and anonymous), and view submitted results in a clear and structured way. The system uses localStorage for data persistence rather than a backend server because it is intended to be lightweight and frontend focused. Because of this, it can be used for research projects, prototypes, and demonstrations of Angular principles like state management, routing, components, and services. The two example surveys are hardcoded on purpose just so first run users can immediately explore the functionality without creating their own survey. 

# Base URL
http://localhost:4200

# Tech Stack
- Angular (standalone components)
- TypeScript
- HTML & CSS
- Angular Router
- RxJS (BehaviorSubject)
- LocalStorage 

# Key Features
- Create surveys with a title, description, and multiple questions
- Supported question types: Text input, Multiple choice, Rating (1–5)
- Edit and delete existing surveys
- Take surveys as a logged-in or anonymous user
- Store survey data and responses in the browser using localStorage
- View survey results with all submitted responses
- Simple user login based on username (no passwords required)
- Clean and minimal UI optimized for clarity and usability

# Project Structure
- Pages / Components:
1. Home –> displays available public surveys
2. Dashboard –> manages surveys created by the current user
3. Survey Create –> create or edit surveys
4. Survey Fill –> submit responses to a survey
5. Survey Results –> view collected responses

- Services:
1. AuthService –> handles user login, logout, and session persistence
2. SurveyService –> manages surveys, questions, and responses

- Models:
1. User
2. Survey
3. Question

Routing is handled using Angular Router to enable smooth navigation between pages without reloading the application.

# Data Persistence
No external backend or database is used. All data is stored locally in the browser using localStorage, including:
- Users
- Surveys
- Survey questions
- Survey responses
This approach simplifies the setup and it makes the application easy to run locally.

# Authentication
Authentication is lightweight:
- Users log in by entering a username
- A stable user ID is generated from the username
- Anonymous users are also supported
- Logged in users can manage their own surveys (their login username is also shown)
- Anonymous users can still take surveys and create surveys labeled as “Anonymous”

# Usage Notes
- On the first launch, two sample surveys are automatically created
- Data persists between sessions unless localStorage is cleared
