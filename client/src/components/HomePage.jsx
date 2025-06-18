import React, { useState } from "react";
import { BookOpen, PlusCircle, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Your Personal Recipe Collection
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Store, discover, and cook your favorite recipes all in one
                place.
              </p>
            </div>
            <div className="hidden md:flex justify-end md:w-1/2">
              <BookOpen className="h-42 w-42 white me-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => navigate("/recipes")}
              className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer shadow"
            >
              <div className="bg-emerald-100 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-medium">All Recipes</h3>
            </div>
            <div
              onClick={() => navigate("/add-recipe")}
              className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer shadow"
            >
              <div className="bg-emerald-100 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <PlusCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-medium">Add New</h3>
            </div>
            <div
              onClick={() => navigate("/generate")}
              className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer shadow"
            >
              <div className="bg-emerald-100 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-medium">Generate Recipe</h3>
            </div>
            <div
              onClick={() => navigate("/settings")}
              className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer shadow"
            >
              <div className="bg-emerald-100 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <Settings className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-medium">Settings</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
