
# FundFlow: Expense Tracking and Budget Management Application

FundFlow is a Web Application designed to help users efficiently manage their expenses, budgets, and shopping lists. 
The application provides a seamless user experience with interactive charts, robust state management, and RESTful backend APIs.

---

## Table of Contents

- [FundFlow: Expense Tracking and Budget Management Application](#fundflow-expense-tracking-and-budget-management-application)
  - [Table of Contents](#table-of-contents)
  - [About FundFlow](#about-fundflow)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contact](#contact)
  - [Video Presentation Link:](#video-presentation-link)

---

## About FundFlow

FundFlow is a **full-stack web application** that allows users to:
- Track their expenses across multiple categories.
- Create and manage budgets effectively.
- Visualize spending patterns using interactive charts.
- Maintain and manage shopping lists.

This application follows industry-standard **Domain-Driven Design (DDD)** principles and implements RESTful APIs using **Express.js** and **MongoDB**.

---

## Features

1. **Expense Management**:
   - Log, view, update, and delete expenses.
2. **Budget Management**:
   - Define monthly budgets for various categories.
   - Monitor spending and receive alerts for overspending.
3. **Data Visualization**:
   - View expense breakdowns using bar and pie charts.
4. **Shopping List**:
   - Create and maintain a shopping list with itemized tracking.
5. **Fugu Capabilities : AI Chatbot**:
   - Incorporated advanced **Fugu capabilities** to enhance real-time collaboration, notifications, and user communication within the application .
6. **State Management**:
   - Implemented using Redux for efficient data flow.
7. **Internationalization (i18n)**:
   - Multilingual support to enhance accessibility.


---

## Technologies Used

- **Frontend**: 
   - React.js, Next.js, Redux, Material-UI (@mui/material)
- **Backend**: 
   - Node.js, Express.js, MongoDB
- **Styling**: 
   - CSS/SCSS Modules
- **Data Fetching**: 
   - React Query
- **Visualization**: 
   - ECharts
- **Internationalization**: 
   - i18next
- **Notifications**: 
   - EmailJS, Fugu
- **AI Integration**:
    - Google Generative AI (@google/generative-ai) (v0.21.0)
    - Model: gemini-1.5-flash


---

## Setup Instructions

### Prerequisites

1. **Node.js**: Version 14 or higher.
2. **Database**: MongoDB (local or cloud-based).
3. **Package Manager**: npm or yarn.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies for the frontend:
   ```bash
   cd app
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd service
   npm install
   ```

4. Configure environment variables:
   - Create `.env` files in both `app` and `service` directories.
   - Add the following variables:
     - For backend (`service/.env`):
       ```env
       PORT=9000
       MONGO_URI=<your-mongo-db-uri>
       JWT_SECRET=<your-secret>
       FUGU_API_KEY=<your-fugu-api-key>
       ```
     - For frontend (`app/.env`):
       ```env
       REACT_APP_API_URL=http://localhost:9000
       ```

5. Start the backend server:
   ```bash
   cd service
   npm run dev
   ```

6. Start the frontend:
   ```bash
   cd app
   npm start
   ```

---

## Usage

1. **Access the Application**:
   - Open the frontend application in your browser at `http://localhost:3000`.

2. **Navigate Through Routes**:
   - **Home Dashboard**: `http://localhost:3000/home`
   - **Budget Management**: `http://localhost:3000/budget`
   - **Expense Visualizations**: `http://localhost:3000/charts`
   - **Shopping List**: `http://localhost:3000/shoppinglist`

3. **Perform CRUD Operations**:
   - Add, update, and delete budgets, expenses, and shopping list items.

4. **Internationalization**:
   - Switch the application language from the settings menu.

5. **Real-Time Features**:
   - Use Fugu-powered real-time collaboration tools and notifications.
   - Google Generative AI for advanced chatbot features,has a time-limited secret key for extended capabilities. The key is part of the free model extension, which may expire after a specified time.


---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any queries or contributions, feel free to reach out:

- **Developer**: Team FundFlow
- **Email**: [fundflow23@gmail.com]
- **GitHub**: (https://github.com/info-6150-fall-2024/final-project-logicforce.git)

---

## Video Presentation Link:

https://northeastern-my.sharepoint.com/:v:/r/personal/chavan_soha_northeastern_edu/Documents/FundFlow.mp4?csf=1&web=1&e=ruFTDp&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

Enjoy using **FundFlow** for efficient expense and budget management! 🚀
