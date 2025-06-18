import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  AlertCircle,
  ChevronLeft,
  BookOpen,
  UserCircle,
} from "lucide-react";
import RecipeCard from "./RecipeCard";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/courses/${id}`
        );
        setCourse(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load course details."
        );
        console.error(
          "Error fetching course details:",
          err.response?.data?.message || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center flex justify-center items-center h-[70vh]">
        <p className="text-lg text-gray-700 flex items-center">
          <Loader2 className="animate-spin h-5 w-5 mr-3" /> Loading course...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center flex flex-col items-center justify-center h-[70vh]">
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

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-700">Course not found.</p>
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-emerald-600 mb-6 hover:text-emerald-700"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back to courses</span>
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center text-gray-400 font-medium mb-6">
          {course.coverImageUrl ? (
            <img
              src={course.coverImageUrl}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="h-24 w-24 text-gray-300" />
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {course.title}
        </h1>
        {course.chefId && course.chefId.userId && (
          <Link
            to={`/chefs/${course.chefId.userId._id}`}
            className="flex items-center text-emerald-600 hover:underline mb-4"
          >
            <UserCircle className="h-5 w-5 mr-2" />
            <span>
              By {course.chefId.userId.username}{" "}
              {course.chefId.specialty && `(${course.chefId.specialty})`}
            </span>
          </Link>
        )}
        <p className="text-gray-700 leading-relaxed mb-6">
          {course.description}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recipes in this Course
        </h2>
        {course.recipeIds.length === 0 ? (
          <p className="text-gray-600">
            No recipes have been added to this course yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.recipeIds.map((recipe) => (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
