"use client"

import type React from "react"

import { useState } from "react"
import { BadgeIcon, GraduationCap, Lock, School, User, UserPlus, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StudentDashboard from "./student-dashboard"

export default function StudentRegistration() {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistered(true)
  }

  const colleges = [
    "All Institute of Medical Sciences (AIIMS)",
    "Christian Medical College (CMC), Vellore",
    "Armed Forces Medical College (AFMC), Pune",
    "King George's Medical University, Lucknow",
    "Maulana Azad Medical College, Delhi",
    "Grant Medical College, Mumbai",
    "Madras Medical College, Chennai",
    "Kasturba Medical College, Manipal",
    "St. John's Medical College, Bangalore",
    "Lady Hardinge Medical College, Delhi",
    "Other",
  ]

  if (isRegistered) {
    return <StudentDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BBC2E2]/30 via-white to-[#B6C197]/20 flex flex-col">
      {/* Mobile App Header */}
      <div className="bg-white text-[#160C28] px-4 sm:px-6 py-6 sm:py-8 rounded-b-3xl shadow-lg">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <BadgeIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">BharatSwasth</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6">
        {/* Toggle Buttons */}
        <div className="flex bg-[#BBC2E2]/20 rounded-2xl p-1 sm:p-2 space-x-1 sm:space-x-2 border border-[#BBC2E2]/30 mb-4 sm:mb-6">
          <Button
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 h-12 sm:h-14 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 ${
              !isLoginMode
                ? "bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white shadow-lg"
                : "bg-transparent text-[#626868] hover:bg-[#BBC2E2]/20"
            }`}
          >
            New Student
          </Button>
          <Button
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-200 ${
              isLoginMode
                ? "bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white shadow-lg"
                : "bg-transparent text-[#626868] hover:bg-[#BBC2E2]/20"
            }`}
          >
            Existing Student
          </Button>
        </div>

        {/* Registration/Login Form */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#160C28] to-[#626868] text-white text-center py-8">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <UserPlus className="w-8 h-8" />
              {isLoginMode ? "Welcome Back" : "Get Started"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLoginMode && (
                <>
                  {/* Full Name */}
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-lg font-bold text-[#160C28] flex items-center gap-2">
                      <User className="w-5 h-5 text-[#F0B67F]" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-12 sm:h-16 text-base sm:text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* College Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="college" className="text-lg font-bold text-[#160C28] flex items-center gap-2">
                      <School className="w-5 h-5 text-[#F0B67F]" />
                      Medical College
                    </Label>
                    <Select>
                      <SelectTrigger className="h-12 sm:h-16 text-base sm:text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10">
                        <SelectValue placeholder="Select your medical college" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-2 border-[#BBC2E2]/50 bg-white/95 backdrop-blur-sm max-h-60">
                        {colleges.map((college) => (
                          <SelectItem
                            key={college}
                            value={college}
                            className="text-base py-4 rounded-xl hover:bg-[#F0B67F]/10 focus:bg-[#F0B67F]/10"
                          >
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Roll Number */}
                  <div className="space-y-3">
                    <Label htmlFor="rollNumber" className="text-lg font-bold text-[#160C28] flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#F0B67F]" />
                      Roll Number
                    </Label>
                    <Input
                      id="rollNumber"
                      name="rollNumber"
                      type="text"
                      placeholder="Enter your student roll number"
                      className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 transition-all duration-300"
                      required
                    />
                  </div>
                </>
              )}

              {/* Username */}
              <div className="space-y-3">
                <Label htmlFor="username" className="text-lg font-bold text-[#160C28] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#F0B67F]" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={isLoginMode ? "Enter your username" : "Choose a unique username"}
                  className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-lg font-bold text-[#160C28] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#F0B67F]" />
                  {isLoginMode ? "Password" : "Create Password"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLoginMode ? "Enter your password" : "Create a strong password"}
                    className="h-16 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] focus:ring-4 focus:ring-[#F0B67F]/20 rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 pr-16 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-[#626868] hover:text-[#F0B67F] focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 rounded-xl transition-all duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {isLoginMode && (
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-base font-medium text-[#F0B67F] hover:text-[#F0B67F]/80 focus:outline-none focus:ring-2 focus:ring-[#F0B67F]/30 rounded-lg px-2 py-1"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 sm:h-16 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl transform active:scale-95"
              >
                {isLoginMode ? "Sign In" : "Create My Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#BBC2E2]/30">
            <div className="flex items-center justify-center space-x-6 text-sm text-[#160C28] mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#F0B67F]"></div>
                <span className="font-semibold">Secure {isLoginMode ? "Login" : "Registration"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#B6C197]"></div>
                <span className="font-semibold">Instant Access</span>
              </div>
            </div>
            <p className="text-xs text-[#626868]">Your information is encrypted and protected.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
