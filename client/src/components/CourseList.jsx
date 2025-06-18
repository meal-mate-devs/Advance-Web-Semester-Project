import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses.");
        console.error(
          "Error fetching courses:",
          err.response?.data?.message || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[70vh] flex justify-center items-center">
        <p className="text-lg text-gray-700 flex items-center">
          <Loader2 className="animate-spin h-5 w-5 mr-3" /> Loading courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[70vh] flex flex-col items-center justify-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-lg text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Explore Courses</h2>
        <p className="text-gray-600">
          Discover culinary wisdom from our chefs.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No courses available yet
          </h3>
          <p className="text-gray-600">
            Check back later for new culinary journeys!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-medium overflow-hidden">
                  {course.coverImageUrl ? (
                    <img
                      src={course.coverImageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-16 w-16 text-gray-300" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {course.title}
                  </h3>
                  {course.chefId && course.chefId.userId && (
                    <p className="text-sm text-gray-500 mb-2">
                      By {course.chefId.userId.username}
                      {course.chefId.specialty &&
                        ` (${course.chefId.specialty})`}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {course.recipeIds.length} Recipes
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
