# ToDo Application (React + TypeScript)

A modern, feature-rich task management application built with React, TypeScript, and Material UI.

## 🌟 Features

- **Task Management**
  - Create, edit, and delete tasks
  - Mark tasks as complete/incomplete
  - Drag and drop tasks to reorder
  - Confirmation modal for task deletion
  - Validation for task titles and descriptions
  - Prevent duplicate task names
  - Sort tasks by:
    - Title (A-Z/Z-A)
    - Completion Status (A-Z/Z-A)
  - Filter tasks by completion status

- **State Management**
  - Zustand for efficient state management
  - Local storage persistence for tasks
  - Global error boundary

- **User Interface**
  - Material UI v6.4.2 components
  - Responsive, mobile-first design
  - Clean and intuitive interface
  - Snackbar notifications for user feedback
  - Modal dialogs for task actions
  - Tooltips for better UX

- **Performance**
  - Optimized rendering with React.memo
  - Efficient state updates with Zustand

- **Data Persistence**
  - Automatic saving to localStorage

- **User Experience**
  - Interactive drag and drop interface
  - Real-time task reordering
  - Smooth animations during drag operations
  - Visual feedback during drag events
  - Responsive snackbar notifications for:
    - Task creation/updates
    - Error messages
    - Success confirmations
  - Strategic notification placement

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🧪 Testing

The application includes comprehensive unit tests using Jest and React Testing Library.

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🏗️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Material UI](https://mui.com/) - UI Component Library
- [Zustand](https://github.com/pmndrs/zustand) - State Management
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing Framework
- [Jest, React Testing Library](https://jestjs.io/docs/tutorial-react/) - Testing Framework
- [Vite](https://vitejs.dev/) - Build Tool

## 🔍 Project Structure

```
src/
├── components/        # React components
├── store/            # Zustand store and state management
├── theme/            # Mui theme defined
└── App.tsx           # Root component
```

## ✅ Validation Rules

- **Task Title**
  - Required
  - Minimum 3 characters
  - Maximum 50 characters
  - Must be unique

- **Task Description**
  - Required
  - Minimum 10 characters
  - Maximum 500 characters

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```