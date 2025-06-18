import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddRecipieForm from "./components/AddRecipieForm";
import Settings from "./components/Settings";
import RecipeList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import RecipeGenerator from "./components/RecipeGenerator";

import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ResetPasswordForm from "./components/ResetPassword";
import UploadCourse from "./components/UploadCourse";
import BecomeChef from "./components/BecomeChef";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import ChefProfileView from "./components/ChefProfileView";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute>
                <AddRecipieForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <RecipeList />
              </PrivateRoute>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route
            path="/generate"
            element={
              <PrivateRoute>
                <RecipeGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/become-chef"
            element={
              <PrivateRoute>
                {" "}
                <BecomeChef />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload-course"
            element={
              <PrivateRoute>
                {" "}
                <UploadCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                {" "}
                <CourseList />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/courses/:id"
            element={
              <PrivateRoute>
                {" "}
                <CourseDetail />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/chefs/:userId"
            element={
              <PrivateRoute>
                {" "}
                <ChefProfileView />
              </PrivateRoute>
            }
          />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
