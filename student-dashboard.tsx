"use client"

import type React from "react"

import { useState } from "react"
import {
  FileText,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Plus,
  TrendingUp,
  User,
  Users,
  ClipboardList,
  Menu,
  X,
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowLeft,
  Camera,
  Calendar,
  School,
  Edit,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AddFamily from "./add-family"
import MedicalHistory from "./medical-history"
import ReportAnalysis from "./report-analysis"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Note {
  id: string
  familyId: string
  familyName: string
  title: string
  content: string
  date: string
  time: string
  photo?: string
  priority: "low" | "medium" | "high"
}

interface StudentProfile {
  id: string
  fullName: string
  college: string
  rollNumber: string
  username: string
  email: string
  phone: string
  photo?: string
  dateJoined: string
  lastLogin: string
}

interface BeforeVisitNotesProps {
  onBack: () => void
}

function BeforeVisitNotes({ onBack }: BeforeVisitNotesProps) {
  const [selectedFamily, setSelectedFamily] = useState("sharma")
  const [showAddNote, setShowAddNote] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    priority: "medium" as "low" | "medium" | "high",
    photo: null as File | null,
  })

  const [studentProfile] = useState<StudentProfile>({
    id: "STU001",
    fullName: "Mehak Mahajan",
    college: "All India Institutes of Medical Sciences (AIIMS)",
    rollNumber: "MBBS2024001",
    username: "mehak.mahajan",
    email: "mehak.mahajan@student.aiims.edu",
    phone: "+91 98765 43210",
    photo: "/placeholder.svg?height=120&width=120",
    dateJoined: "August 2024",
    lastLogin: "Today at 9:30 AM",
  })

  const families = [
    { id: "sharma", name: "Sharma Family", members: ["Rajesh Sharma", "Priya Sharma"] },
    { id: "pandey", name: "Pandey Family", members: ["Amit Pandey"] },
  ]

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      familyId: "sharma",
      familyName: "Sharma Family",
      title: "Rajesh's Hypertension Follow-up",
      content:
        "Patient has been experiencing elevated BP readings (142/95 mmHg) consistently over the past month. Discussed lifestyle modifications including reduced sodium intake and increased physical activity. Patient reports occasional headaches in the morning. Need to monitor medication compliance and consider dosage adjustment. Family history of cardiovascular disease on paternal side.",
      date: "2024-12-20",
      time: "14:30",
      priority: "high",
    },
    {
      id: "2",
      familyId: "sharma",
      familyName: "Sharma Family",
      title: "Priya's Annual Wellness Check",
      content:
        "All vital signs within normal limits. Patient maintains excellent health through regular exercise and balanced diet. Discussed preventive care measures and importance of continued healthy lifestyle. No current concerns or symptoms reported. Recommended continuation of current wellness routine.",
      date: "2024-12-18",
      time: "10:15",
      priority: "low",
    },
    {
      id: "3",
      familyId: "pandey",
      familyName: "Pandey Family",
      title: "Amit's Preventive Health Assessment",
      content:
        "Comprehensive health screening completed. All parameters within normal range. Patient demonstrates excellent health awareness and proactive approach to wellness. Discussed age-appropriate screening recommendations for 45+ age group. Scheduled follow-up in 6 months for routine monitoring.",
      date: "2024-12-15",
      time: "16:45",
      priority: "medium",
    },
  ])

  const currentFamily = families.find((f) => f.id === selectedFamily) || families[0]
  const familyNotes = notes.filter((note) => note.familyId === selectedFamily)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const handleAddNote = () => {
    const note: Note = {
      id: Date.now().toString(),
      familyId: selectedFamily,
      familyName: currentFamily.name,
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      priority: newNote.priority,
      photo: newNote.photo ? URL.createObjectURL(newNote.photo) : undefined,
    }

    setNotes([note, ...notes])
    setNewNote({
      title: "",
      content: "",
      priority: "medium",
      photo: null,
    })
    setShowAddNote(false)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewNote({ ...newNote, photo: file })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-[#BBC2E2] text-[#160C28] hover:text-[#F0B67F] hover:bg-[#F0B67F]/10 transition-all duration-200 p-0 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#160C28]">Before Visit Notes</h1>
          <p className="text-[#626868]">Prepare and organize notes for family visits</p>
        </div>
      </div>

      {/* Family Selection & Actions */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <ClipboardList className="w-6 h-6" />
            Family Visit Preparation
          </CardTitle>
          <CardDescription className="text-white/80">Select family and manage visit notes</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 space-y-3">
              <label className="text-lg font-semibold text-[#160C28]">Select Family</label>
              <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                <SelectTrigger className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {families.map((family) => (
                    <SelectItem key={family.id} value={family.id} className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#F0B67F]" />
                        <div>
                          <p className="font-medium">{family.name}</p>
                          <p className="text-sm text-[#626868]">{family.members.length} members</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-[#160C28] hover:bg-[#160C28]/80 text-white rounded-2xl px-6 font-semibold my-0 h-14 mt-8 w-auto ml-0"
              >
                <FileText className="w-5 h-5 mr-2" />
                Notes History
              </Button>
              <Button
                onClick={() => setShowAddNote(true)}
                className="h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white rounded-2xl px-6 font-semibold mt-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Note Form */}
      {showAddNote && (
        <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Plus className="w-6 h-6" />
              Add New Note for {currentFamily.name}
            </CardTitle>
            <CardDescription className="text-white/80">Create a new visit preparation note</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28]">Note Title</Label>
                <input
                  placeholder="e.g., Follow-up on medication compliance"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl px-4 bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28]">Priority Level</Label>
                <Select
                  value={newNote.priority}
                  onValueChange={(value) => setNewNote({ ...newNote, priority: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="high" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>High Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span>Medium Priority</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="low" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Low Priority</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Note Content</Label>
              <Textarea
                placeholder="Write detailed notes about the family member's condition, observations, questions to ask, or important points to discuss during the visit..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="min-h-[120px] text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Reference Photo (Optional)</Label>
              <div className="border-2 border-dashed border-[#BBC2E2] rounded-2xl p-6 text-center hover:border-[#F0B67F] transition-colors">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="notePhoto" />
                <label htmlFor="notePhoto" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-[#BBC2E2] mx-auto mb-3" />
                  <p className="text-[#626868] font-medium">Add reference photo</p>
                  <p className="text-sm text-[#626868] mt-1">PNG, JPG up to 5MB</p>
                </label>
                {newNote.photo && (
                  <div className="mt-4 p-3 bg-[#B6C197]/20 rounded-xl border border-[#B6C197]/30">
                    <p className="text-[#B6C197] font-medium">✓ {newNote.photo.name}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
                className="flex-1 h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl disabled:opacity-50"
              >
                Save Note
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddNote(false)}
                className="h-14 border-2 border-[#BBC2E2] text-[#626868] hover:bg-[#BBC2E2]/10 rounded-2xl px-8"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Notes */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#B6C197] to-[#F0B67F] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <FileText className="w-6 h-6" />
            Recent Notes - {currentFamily.name}
          </CardTitle>
          <CardDescription className="text-white/80">Latest visit preparation notes for this family</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {familyNotes.length > 0 ? (
            <div className="space-y-4">
              {familyNotes.slice(0, showHistory ? familyNotes.length : 3).map((note) => (
                <Card
                  key={note.id}
                  className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10 hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#160C28]">{note.title}</h3>
                          <Badge className={`text-xs ${getPriorityColor(note.priority)}`}>
                            <div className="flex items-center gap-1">
                              {getPriorityIcon(note.priority)}
                              {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#626868] mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(note.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {note.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#626868] mb-4 leading-relaxed">{note.content}</p>

                    {note.photo && (
                      <div className="mt-4 p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-[#F0B67F]" />
                          <span className="text-sm font-medium text-[#160C28]">Reference photo attached</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#BBC2E2]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="w-10 h-10 text-[#BBC2E2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#160C28] mb-2">No Notes Yet</h3>
              <p className="text-[#626868] mb-6">
                Start by adding your first visit preparation note for {currentFamily.name}
              </p>
              <Button
                onClick={() => setShowAddNote(true)}
                className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl h-12 px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Note
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#160C28]">{familyNotes.length}</div>
            <p className="text-sm text-[#626868]">Total Notes</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-red-200 rounded-2xl bg-red-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {familyNotes.filter((n) => n.priority === "high").length}
            </div>
            <p className="text-sm text-red-600">High Priority</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-200 rounded-2xl bg-yellow-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {familyNotes.filter((n) => n.priority === "medium").length}
            </div>
            <p className="text-sm text-yellow-600">Medium Priority</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200 rounded-2xl bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {familyNotes.filter((n) => n.priority === "low").length}
            </div>
            <p className="text-sm text-green-600">Low Priority</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const navigationItems = [
  { title: "Home", icon: Home, key: "home" },
  { title: "Add Family", icon: Plus, key: "add-family" },
  { title: "Medical History", icon: FileText, key: "medical-history" },
  { title: "Report Analysis", icon: TrendingUp, key: "report-analysis" },
  { title: "Before Visit Notes", icon: ClipboardList, key: "before-visit-notes" },
  { title: "Profile", icon: User, key: "profile" },
]

export default function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [studentProfile] = useState<StudentProfile>({
    id: "STU001",
    fullName: "Mehak Mahajan",
    college: "All India Institutes of Medical Sciences (AIIMS)",
    rollNumber: "MBBS2024001",
    username: "mehak.mahajan",
    email: "mehak.mahajan@student.aiims.edu",
    phone: "+91 98765 43210",
    photo: "/placeholder.svg?height=120&width=120",
    dateJoined: "August 2024",
    lastLogin: "Today at 9:30 AM",
  })

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    // Clear any stored user data if needed
    localStorage.removeItem("userSession")
    sessionStorage.clear()

    // Redirect to login/registration page
    window.location.href = "/"
  }

  const renderMainContent = () => {
    switch (currentPage) {
      case "add-family":
        return <AddFamily onBack={() => setCurrentPage("home")} />
      case "medical-history":
        return <MedicalHistory onBack={() => setCurrentPage("home")} />
      case "before-visit-notes":
        return <BeforeVisitNotes onBack={() => setCurrentPage("home")} />
      case "report-analysis":
        return <ReportAnalysis onBack={() => setCurrentPage("home")} />
      case "profile":
        return (
          <div className="overflow-x-hidden w-full max-w-full p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="overflow-x-hidden w-full max-w-full flex items-center space-x-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage("home")}
                className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-[#BBC2E2] text-[#160C28] hover:text-[#F0B67F] hover:bg-[#F0B67F]/10 transition-all duration-200 p-0 flex items-center justify-center flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="overflow-x-hidden flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-[#160C28] truncate">Student Profile</h1>
                <p className="text-sm sm:text-base text-[#626868] truncate">
                  Manage your account information and settings
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <Card className="overflow-x-hidden w-full max-w-full border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="overflow-x-hidden w-full max-w-full bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6 sm:py-8">
                <div className="overflow-x-hidden w-full max-w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                      <AvatarImage src={studentProfile.photo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#F0B67F] text-white text-xl sm:text-2xl font-bold">
                        {studentProfile.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F0B67F] hover:bg-[#F0B67F]/80 text-white rounded-full shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="overflow-x-hidden flex-1 min-w-0 text-center sm:text-left">
                    <CardTitle className="text-xl sm:text-2xl font-bold mb-2 truncate">
                      {studentProfile.fullName}
                    </CardTitle>

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3">
                      <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm truncate max-w-full">
                        Roll: {studentProfile.rollNumber}
                      </Badge>
                      <Badge className="bg-[#F0B67F]/20 text-white border-[#F0B67F]/30 text-xs sm:text-sm truncate max-w-full">
                        Student ID: {studentProfile.id}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-hidden w-full max-w-full p-4 sm:p-8 space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#160C28] flex items-center gap-2">
                    <User className="w-6 h-6 text-[#F0B67F]" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Full Name</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.fullName}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Username</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.username}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Email Address</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Phone Number</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#160C28] flex items-center gap-2">
                    <School className="w-6 h-6 text-[#F0B67F]" />
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Medical College</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.college}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Roll Number</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.rollNumber}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Date Joined</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.dateJoined}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-[#626868]">Last Login</Label>
                      <div className="p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                        <p className="font-medium text-[#160C28]">{studentProfile.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 h-12 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-xl">
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "home":
      default:
        return (
          <div className="p-3 space-y-4">
            {/* Welcome Section - Mobile optimized */}
            <div className="bg-gradient-to-r from-[#160C28] to-[#626868] rounded-2xl p-4 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">Welcome back, Mehak!</h2>
                  <p className="text-white/80 text-sm">Your health dashboard</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">Today</p>
                  <p className="text-sm font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats - Mobile grid */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-xl touch-manipulation">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3">
                  <CardTitle className="text-xs font-medium text-[#626868]">Family Members</CardTitle>
                  <Users className="w-4 h-4 text-[#F0B67F]" />
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold text-[#160C28]">4</div>
                  <p className="text-xs text-[#B6C197] font-medium">+1 this month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-xl touch-manipulation">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3">
                  <CardTitle className="text-xs font-medium text-[#626868]">Medical Records</CardTitle>
                  <FileText className="w-4 h-4 text-[#F0B67F]" />
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold text-[#160C28]">12</div>
                  <p className="text-xs text-[#B6C197] font-medium">+3 this week</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-xl touch-manipulation">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3">
                  <CardTitle className="text-xs font-medium text-[#626868]">Notes Added</CardTitle>
                  <TrendingUp className="w-4 h-4 text-[#F0B67F]" />
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold text-[#160C28]">8</div>
                  <p className="text-xs text-[#B6C197] font-medium">+2 today</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-xl touch-manipulation">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3">
                  <CardTitle className="text-xs font-medium text-[#626868]">Interactions</CardTitle>
                  <MessageCircle className="w-4 h-4 text-[#F0B67F]" />
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold text-[#160C28]">15</div>
                  <p className="text-xs text-[#B6C197] font-medium">+5 this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity - Mobile optimized */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-[#160C28]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0">
                <div className="flex items-center space-x-3 p-3 bg-[#BBC2E2]/30 rounded-xl touch-manipulation">
                  <div className="w-10 h-10 bg-[#F0B67F] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#160C28] text-sm truncate">Added medical history for Sarah</p>
                    <p className="text-xs text-[#626868]">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-[#B6C197]/30 rounded-xl touch-manipulation">
                  <div className="w-10 h-10 bg-[#B6C197] rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#160C28] text-sm truncate">Analyzed blood test report</p>
                    <p className="text-xs text-[#626868]">5 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions - Mobile grid */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-[#160C28]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleNavigation("add-family")}
                    className="h-20 flex-col space-y-2 bg-[#F0B67F] hover:bg-[#F0B67F]/80 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="font-medium text-sm">Add Family</span>
                  </Button>
                  <Button
                    onClick={() => handleNavigation("medical-history")}
                    className="h-20 flex-col space-y-2 bg-[#B6C197] hover:bg-[#B6C197]/80 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation"
                  >
                    <FileText className="w-6 h-6" />
                    <span className="font-medium text-sm">Medical History</span>
                  </Button>
                  <Button
                    onClick={() => handleNavigation("report-analysis")}
                    className="h-20 flex-col space-y-2 bg-[#160C28] hover:bg-[#160C28]/80 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation"
                  >
                    <TrendingUp className="w-6 h-6" />
                    <span className="font-medium text-sm">Analyze Report</span>
                  </Button>
                  <Button
                    onClick={() => handleNavigation("before-visit-notes")}
                    className="h-20 flex-col space-y-2 bg-[#BBC2E2] hover:bg-[#BBC2E2]/80 text-[#160C28] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation"
                  >
                    <ClipboardList className="w-6 h-6" />
                    <span className="font-medium text-sm">Before Visit Notes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="overflow-x-hidden w-full max-w-full min-h-screen bg-gradient-to-br from-[#BBC2E2]/20 to-[#B6C197]/20 flex flex-col">
      {/* Mobile Header - Only show full header on dashboard */}
      {currentPage === "home" ? (
        <header className="overflow-x-hidden w-full max-w-full bg-white text-[#160C28] px-3 py-4 shadow-lg sticky top-0 z-50">
          <div className="overflow-x-hidden w-full max-w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#160C28] hover:bg-[#F0B67F]/10 rounded-xl h-12 w-12 touch-manipulation"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">BharatSwasth</h1>
                  <p className="text-xs text-[#626868]">Student Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation("profile")}
                className="text-[#160C28] hover:bg-[#F0B67F]/10 rounded-xl h-12 w-12 touch-manipulation"
              >
                <User className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>
      ) : (
        <header className="overflow-x-hidden w-full max-w-full bg-white text-[#160C28] px-3 py-4 shadow-lg sticky top-0 z-50">
          <div className="overflow-x-hidden w-full max-w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">BharatSwasth</h1>
                <p className="text-xs text-[#626868]">Student Portal</p>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-[#BBC2E2]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#160C28]">BharatSwasth</h2>
                <p className="text-sm text-[#626868]">Student Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="text-[#626868] hover:bg-[#F0B67F]/10 rounded-xl"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              onClick={() => handleNavigation(item.key)}
              className={`w-full justify-start h-14 rounded-2xl text-left font-medium transition-all duration-200 ${
                currentPage === item.key
                  ? "bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white shadow-lg"
                  : "text-[#626868] hover:bg-[#F0B67F]/10 hover:text-[#160C28]"
              }`}
            >
              <item.icon className="w-6 h-6 mr-4" />
              {item.title}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start h-14 rounded-2xl text-left font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="w-6 h-6 mr-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="overflow-x-hidden w-full max-w-full flex-1">{renderMainContent()}</main>
    </div>
  )
}
