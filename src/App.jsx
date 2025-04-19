import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './FireBase';

import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

import "/assets/css/style.css";
import "/assets/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import AllSection from './components/AllSection';
import ProductList from './components/ProdcutList';
import DailyPlan from './components/DailyPlan';
import MealPlanner from './components/MealPlanner/MealPlanner';
import NutritionCalculator from './components/NutritionCalculator';
import Login from './components/Login';
import Register from './components/Registor';
import AdminPanel from './components/AdminPanel';
import UserDetail from './components/UserDetail';
import UsersTable from './components/UsersTable';
import DietCpm from './components/bmi/DietCpm';

// Create AuthContext to provide user and role
const AuthContext = createContext();

function useAuthRole() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const { user, loading, role } = useAuthRole();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  
  // Automatically redirect admins to admin panel
  if (role === "admin") return <Navigate to="/admin" />;
  
  return children;
}

function AdminRoute({ children }) {
  const { user, loading, role } = useAuthRole();
  
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/" />; // Redirect non-admins
  
  return children;
}

function AppWrapper() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/login', '/signup', '/admin', '/admin/*'];
  const hideHeaderFooter = hideHeaderFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main style={{
        width: "100%",
        margin: "0 auto",
        maxWidth: "1200px",
        overflow: "hidden"
      }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected user routes - will redirect admins to /admin */}
          <Route path="/" element={<ProtectedRoute><AllSection /></ProtectedRoute>} />
          <Route path="/Productcard" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/dailyPlan" element={<ProtectedRoute><DailyPlan /></ProtectedRoute>} />
          <Route path="/mealPlanner" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
          <Route path="/NutritionCalculator" element={<ProtectedRoute><NutritionCalculator /></ProtectedRoute>} />
          <Route path="/Bmi" element={<ProtectedRoute><DietCpm /></ProtectedRoute>} />

          {/* Admin routes - only accessible to admins */}
          <Route path="/admin/*" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/admin/users/:id" element={<AdminRoute><UserDetail /></AdminRoute>} />
          <Route path="/userTable" element={<AdminRoute><UsersTable /></AdminRoute>} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setRoleLoading(false);
    };

    fetchUserRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading: loading || roleLoading, role }}>
      <BrowserRouter>
        {(loading || roleLoading) ? <Loader /> : <AppWrapper />}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;