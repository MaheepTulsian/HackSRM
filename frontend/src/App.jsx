import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ClassDashboard from './pages/ClassDashboard';
import ShareMaterial from './pages/ShareMaterial';
import ShareAssignment from './pages/ShareAssignment';
import Rag from './pages/Rag';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/teacherdashboard/class/:id" element={<ClassDashboard />} >
            <Route path="" element={<ShareMaterial />} />
            <Route path="share-material" element={<ShareMaterial />} />
            <Route path="share-assignment" element={<ShareAssignment />} />
          </Route>
          <Route path="/studentdashboard" element={<StudentDashboard />} >
            <Route path="" element={<Rag />} />
            <Route path="rag" element={<Rag />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;