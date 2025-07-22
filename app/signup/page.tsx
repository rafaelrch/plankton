import React from "react";
import SignupForm from "../../components/ui/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Section - Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-orange-600 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-600 opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 via-pink-500 to-red-400 opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Text */}
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-light">
            Be a Part of Something <span className="font-bold">Beautiful</span>
          </h1>
        </div>
      </div>
      
      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <SignupForm />
      </div>
    </div>
  );
} 