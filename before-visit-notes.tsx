"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  FileText,
  Users,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Camera,
  X,
  Search,
  History,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Note {
  id: string
  familyId: string
  familyName: string
  memberId: string
  memberName: string
  title: string
  content: string
  date: string
  time: string
  photo?: string
  priority: "low" | "medium" | "high"
}

interface BeforeVisitNotesProps {
  onBack: () => void
}

export default function BeforeVisitNotes({ onBack }: BeforeVisitNotesProps) {
  const [selectedFamily, setSelectedFamily] = useState("sharma")
  const [selectedMember, setSelectedMember] = useState("all")
  const [showAddNote, setShowAddNote] = useState(false)
  const [showNotesHistory, setShowNotesHistory] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    priority: "medium" as "low" | "medium" | "high",
    photo: null as File | null,
  })

  const families = [
    {
      id: "sharma",
      name: "Sharma Family",
      members: [
        { id: "rajesh", name: "Rajesh Sharma", relationship: "Father", age: "52" },
        { id: "priya", name: "Priya Sharma", relationship: "Mother", age: "48" },
      ],
    },
    {
      id: "pandey",
      name: "Pandey Family",
      members: [{ id: "amit", name: "Amit Pandey", relationship: "Father", age: "45" }],
    },
  ]

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      familyId: "sharma",
      familyName: "Sharma Family",
      memberId: "rajesh",
      memberName: "Rajesh Sharma",
      title: "Rajesh's Hypertension Follow-up",
      content:
        "Patient has been experiencing elevated BP readings (142/95 mmHg) consistently over the past month. Discussed lifestyle modifications including reduced sodium intake and increased physical activity. Patient reports occasional headaches in the morning. Need to monitor medication compliance and consider dosage adjustment.",
      date: "2024-12-20",
      time: "14:30",
      priority: "high",
    },
    {
      id: "2",
      familyId: "sharma",
      familyName: "Sharma Family",
      memberId: "priya",
      memberName: "Priya Sharma",
      title: "Priya's Annual Wellness Check",
      content:
        "All vital signs within normal limits. Patient maintains excellent health through regular exercise and balanced diet. Discussed preventive care measures and importance of continued healthy lifestyle. No current concerns or symptoms reported.",
      date: "2024-12-18",
      time: "10:15",
      priority: "low",
    },
    {
      id: "3",
      familyId: "pandey",
      familyName: "Pandey Family",
      memberId: "amit",
      memberName: "Amit Pandey",
      title: "Amit's Diabetes Management",
      content:
        "Blood sugar levels have been stable. Patient is following diet plan consistently. Discussed importance of regular exercise and monitoring. No side effects from current medication reported.",
      date: "2024-12-15",
      time: "09:45",
      priority: "medium",
    },
    {
      id: "4",
      familyId: "sharma",
      familyName: "Sharma Family",
      memberId: "rajesh",
      memberName: "Rajesh Sharma",
      title: "Cardiac Health Assessment",
      content:
        "ECG results show normal rhythm. Patient reports no chest pain or shortness of breath. Continue current medication regimen. Schedule follow-up in 3 months.",
      date: "2024-12-10",
      time: "11:20",
      priority: "low",
    },
    {
      id: "5",
      familyId: "pandey",
      familyName: "Pandey Family",
      memberId: "amit",
      memberName: "Amit Pandey",
      title: "Preventive Health Screening",
      content:
        "All screening tests completed successfully. Cholesterol levels within normal range. Blood pressure stable. Recommended annual screening continuation.",
      date: "2024-12-08",
      time: "16:00",
      priority: "low",
    },
  ])

  const currentFamily = families.find((f) => f.id === selectedFamily) || families[0]
  const currentFamilyMembers = currentFamily.members

  // Filter notes based on selected family and member
  const getFilteredNotes = () => {
    let filteredNotes = notes.filter((note) => note.familyId === selectedFamily)

    if (selectedMember !== "all") {
      filteredNotes = filteredNotes.filter((note) => note.memberId === selectedMember)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filteredNotes
  }

  const familyNotes = getFilteredNotes()

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
    const selectedMemberData =
      selectedMember === "all"
        ? currentFamilyMembers[0]
        : currentFamilyMembers.find((m) => m.id === selectedMember) || currentFamilyMembers[0]

    const note: Note = {
      id: Date.now().toString(),
      familyId: selectedFamily,
      familyName: currentFamily.name,
      memberId: selectedMemberData.id,
      memberName: selectedMemberData.name,
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
    <div className="overflow-x-hidden w-full max-w-full p-4 space-y-4">
      {/* Header */}
      <div className="overflow-x-hidden w-full max-w-full flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-[#BBC2E2] text-[#160C28] hover:text-[#F0B67F] hover:bg-[#F0B67F]/10 transition-all duration-200 p-0 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="overflow-x-hidden flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#160C28] truncate">Before Visit Notes</h1>
          <p className="text-sm text-[#626868] truncate">Prepare and organize notes for family visits</p>
        </div>
      </div>

      {/* Family Selection Card - Mobile Optimized */}
      <Card className="overflow-x-hidden w-full max-w-full border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="overflow-x-hidden w-full max-w-full bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <FileText className="w-6 h-6" />
            Family Visit Preparation
          </CardTitle>
          <CardDescription className="text-white/80">Select family and manage visit notes</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-hidden w-full max-w-full p-6">
          {/* Stacked Layout for Mobile */}
          <div className="space-y-6">
            {/* Select Family */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Select Family</Label>
              <div className="relative">
                <select
                  value={selectedFamily}
                  onChange={(e) => setSelectedFamily(e.target.value)}
                  className="w-full h-14 px-4 pr-12 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
                >
                  {families.map((family) => (
                    <option key={family.id} value={family.id}>
                      {family.name} ({family.members.length} members)
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <Users className="w-5 h-5 text-[#F0B67F]" />
                </div>
              </div>
            </div>

            {/* Select Family Member */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Select Family Member</Label>
              <div className="relative">
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full h-14 px-4 pr-12 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
                >
                  <option value="all">All Family Members</option>
                  {currentFamilyMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.relationship}, Age {member.age})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <div className="w-5 h-5 bg-[#F0B67F] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {selectedMember === "all"
                        ? "A"
                        : currentFamilyMembers.find((m) => m.id === selectedMember)?.name[0] || "A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Mobile Optimized */}
      <div className="overflow-x-hidden w-full max-w-full grid grid-cols-1 gap-4">
        <Button
          onClick={() => setShowNotesHistory(true)}
          className="h-14 bg-gradient-to-r from-[#160C28] to-[#626868] hover:from-[#160C28]/90 hover:to-[#626868]/90 text-white rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95"
        >
          <History className="w-5 h-5 mr-2" />
          Notes History ({notes.filter((n) => n.familyId === selectedFamily).length})
        </Button>
        <Button
          onClick={() => setShowAddNote(true)}
          className="h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Note
        </Button>
      </div>

      {/* Notes History Modal - Mobile Optimized */}
      {showNotesHistory && (
        <Card className="overflow-x-hidden w-full max-w-full border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="overflow-x-hidden w-full max-w-full bg-gradient-to-r from-[#626868] to-[#160C28] text-white rounded-t-3xl py-6">
            <div className="overflow-x-hidden w-full max-w-full flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-3 flex-1 min-w-0">
                <History className="w-6 h-6 flex-shrink-0" />
                <span className="truncate">Notes History</span>
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowNotesHistory(false)}
                className="text-white hover:bg-white/20 rounded-xl p-2 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-hidden w-full max-w-full p-6 space-y-6">
            {/* Search functionality */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#626868] w-5 h-5" />
              <Input
                placeholder="Search by member name, title, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
              />
            </div>

            {/* Notes list */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {familyNotes.length > 0 ? (
                familyNotes.map((note) => (
                  <Card
                    key={note.id}
                    className="overflow-x-hidden w-full max-w-full border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10 hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="overflow-x-hidden w-full max-w-full p-6">
                      <div className="overflow-x-hidden w-full max-w-full flex items-start justify-between mb-4">
                        <div className="overflow-x-hidden flex-1 min-w-0">
                          <div className="overflow-x-hidden w-full max-w-full flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#160C28] truncate flex-1">{note.title}</h3>
                            <Badge className={`text-xs flex-shrink-0 ${getPriorityColor(note.priority)}`}>
                              <div className="flex items-center gap-1">
                                {getPriorityIcon(note.priority)}
                                {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
                              </div>
                            </Badge>
                          </div>
                          <div className="overflow-x-hidden w-full max-w-full flex flex-wrap items-center gap-2 text-sm text-[#626868] mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium truncate">{note.memberName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{new Date(note.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{note.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#626868] leading-relaxed text-base break-words">{note.content}</p>

                      {note.photo && (
                        <div className="mt-4 p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                          <div className="flex items-center gap-2">
                            <Camera className="w-4 h-4 text-[#F0B67F] flex-shrink-0" />
                            <span className="text-sm font-medium text-[#160C28]">Reference photo attached</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#BBC2E2]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#BBC2E2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#160C28] mb-2">No Notes Found</h3>
                  <p className="text-sm text-[#626868]">
                    {searchQuery ? "Try adjusting your search terms" : "No notes available for the selected criteria"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Note Form - Mobile Optimized */}
      {showAddNote && (
        <Card className="overflow-x-hidden w-full max-w-full border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="overflow-x-hidden w-full max-w-full bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6">
            <div className="overflow-x-hidden w-full max-w-full flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-3 flex-1 min-w-0">
                <Plus className="w-6 h-6 flex-shrink-0" />
                <span className="truncate">Add New Note</span>
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowAddNote(false)}
                className="text-white hover:bg-white/20 rounded-xl p-2 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-hidden w-full max-w-full p-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28]">Note Title</Label>
                <Input
                  placeholder="e.g., Follow-up on medication compliance"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="h-14 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10 focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28]">Priority Level</Label>
                <div className="relative">
                  <select
                    value={newNote.priority}
                    onChange={(e) => setNewNote({ ...newNote, priority: e.target.value as "low" | "medium" | "high" })}
                    className="w-full h-14 px-4 pr-12 text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    {getPriorityIcon(newNote.priority)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Note Content</Label>
              <Textarea
                placeholder="Write detailed notes about the family member's condition, observations, questions to ask, or important points to discuss during the visit..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="min-h-[120px] text-base border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-[#F0B67F]/20 transition-all duration-300"
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

            <div className="flex flex-col gap-4 pt-4">
              <Button
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
                className="h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl disabled:opacity-50 transition-all duration-200 active:scale-95"
              >
                Save Note
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddNote(false)}
                className="h-14 border-2 border-[#BBC2E2] text-[#626868] hover:bg-[#BBC2E2]/10 rounded-2xl transition-all duration-200 active:scale-95"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Notes - Only show when not in add note or history mode */}
      {!showAddNote && !showNotesHistory && (
        <Card className="overflow-x-hidden w-full max-w-full border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="overflow-x-hidden w-full max-w-full bg-gradient-to-r from-[#B6C197] to-[#F0B67F] text-white rounded-t-3xl py-6">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Recent Notes - {currentFamily.name}
            </CardTitle>
            <CardDescription className="text-white/80">Latest visit preparation notes for this family</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-hidden w-full max-w-full p-6">
            {familyNotes.length > 0 ? (
              <div className="space-y-4">
                {familyNotes.slice(0, 3).map((note) => (
                  <Card
                    key={note.id}
                    className="overflow-x-hidden w-full max-w-full border-2 border-[#BBC2E2]/30 rounded-2xl bg-[#BBC2E2]/10 hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="overflow-x-hidden w-full max-w-full p-6">
                      <div className="overflow-x-hidden w-full max-w-full flex items-start justify-between mb-4">
                        <div className="overflow-x-hidden flex-1 min-w-0">
                          <div className="overflow-x-hidden w-full max-w-full flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#160C28] truncate flex-1">{note.title}</h3>
                            <Badge className={`text-xs flex-shrink-0 ${getPriorityColor(note.priority)}`}>
                              <div className="flex items-center gap-1">
                                {getPriorityIcon(note.priority)}
                                {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
                              </div>
                            </Badge>
                          </div>
                          <div className="overflow-x-hidden w-full max-w-full flex flex-wrap items-center gap-2 text-sm text-[#626868] mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium truncate">{note.memberName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{new Date(note.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{note.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#626868] leading-relaxed text-base break-words">{note.content}</p>

                      {note.photo && (
                        <div className="mt-4 p-3 bg-[#BBC2E2]/20 rounded-xl border border-[#BBC2E2]/30">
                          <div className="flex items-center gap-2">
                            <Camera className="w-4 h-4 text-[#F0B67F] flex-shrink-0" />
                            <span className="text-sm font-medium text-[#160C28]">Reference photo attached</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {familyNotes.length > 3 && (
                  <div className="text-center pt-4">
                    <Button
                      onClick={() => setShowNotesHistory(true)}
                      variant="outline"
                      className="border-[#BBC2E2] text-[#626868] hover:bg-[#BBC2E2]/10 rounded-2xl transition-all duration-200 active:scale-95"
                    >
                      View All {familyNotes.length} Notes
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#BBC2E2]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-[#BBC2E2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#160C28] mb-2">No Notes Yet</h3>
                <p className="text-base text-[#626868] mb-6">
                  Start by adding your first visit preparation note for {currentFamily.name}
                </p>
                <Button
                  onClick={() => setShowAddNote(true)}
                  className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl h-12 px-8 transition-all duration-200 active:scale-95"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Note
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notes Statistics */}
      {!showAddNote && !showNotesHistory && familyNotes.length > 0 && (
        <div className="overflow-x-hidden w-full max-w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
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
      )}
    </div>
  )
}
