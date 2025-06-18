import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  AlertCircle,
  ChefHat,
  Mail,
  BookOpen,
  UserCircle,
} from "lucide-react";

export default function ChefProfileView() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [chefProfile, setChefProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChefProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/chefs/${userId}`
        );
        setChefProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load chef profile.");
        console.error(
          "Error fetching chef profile:",
          err.response?.data?.message || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChefProfile();
    } else {
      setError("No chef ID provided.");
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700 flex items-center">
          <Loader2 className="animate-spin h-5 w-5 mr-3" /> Loading chef
          profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!chefProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-lg text-gray-700">Chef profile not found.</p>
        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 mt-4"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center text-center mb-8">
          {chefProfile.profilePictureUrl ? (
            <img
              src={chefProfile.profilePictureUrl}
              alt={chefProfile.userId.username}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-emerald-500"
            />
          ) : (
            <UserCircle className="w-32 h-32 text-gray-400 mb-4" />
          )}
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            {chefProfile.userId.username}{" "}
            <ChefHat className="ml-2 h-6 w-6 text-emerald-600" />
          </h1>
          {chefProfile.specialty && (
            <p className="text-lg text-gray-600 mt-1">
              {chefProfile.specialty}
            </p>
          )}
          {chefProfile.userId.email && (
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <Mail className="h-4 w-4 mr-1" /> {chefProfile.userId.email}
            </p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            {chefProfile.bio || "No bio provided yet."}
          </p>
        </div>

        {/* You could fetch and display courses by this chef here as well */}
        {/* For example: */}
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Courses by {chefProfile.userId.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chefCourses.map(course => (
            <Link to={`/courses/${course._id}`} key={course._id}>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
}
