import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ChefHat, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function BecomeChef() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user && user.role === "chef") {
      navigate("/profile");
    }
  }, [isAuthenticated, authLoading, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chefs/register",
        {
          bio,
          specialty,
          profilePictureUrl,
        }
      );

      setSuccess(response.data.message);

      if (user && response.data.user) {
        user.role = response.data.user.role;
        setTimeout(() => {
          navigate(`/chefs/${user._id}`);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to register as chef.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (isAuthenticated && user && user.role === "chef")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">
          {user?.role === "chef" ? "Redirecting to profile..." : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Become a Chef
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your culinary expertise with the world!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <div className="space-y-2">
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Tell us about yourself (e.g., cooking style, experience)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="specialty" className="sr-only">
                Specialty
              </label>
              <input
                id="specialty"
                name="specialty"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Your culinary specialty (e.g., Italian, Vegan Baking)"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profilePictureUrl" className="sr-only">
                Profile Picture URL
              </label>
              <input
                id="profilePictureUrl"
                name="profilePictureUrl"
                type="url"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Link to your profile picture (optional)"
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Registering...
                </>
              ) : (
                "Register as Chef"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
