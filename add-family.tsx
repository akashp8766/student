"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Heart, MapPin, Phone, Plus, User, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FamilyMember {
  id: string
  name: string
  age: number
  relationship: string
  phone: string
  medicalConditions: string
  address: string
}

interface AddFamilyProps {
  onBack: () => void
}

export default function AddFamily({ onBack }: AddFamilyProps) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState<Omit<FamilyMember, "id">>({
    name: "",
    age: 0,
    relationship: "",
    phone: "",
    medicalConditions: "",
    address: "",
  })

  const relationships = [
    "Father",
    "Mother",
    "Spouse",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Grandfather",
    "Grandmother",
    "Uncle",
    "Aunt",
    "Cousin",
    "Other",
  ]

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        ...newMember,
        id: Date.now().toString(),
      }
      setFamilyMembers([...familyMembers, member])
      setNewMember({
        name: "",
        age: 0,
        relationship: "",
        phone: "",
        medicalConditions: "",
        address: "",
      })
      setShowAddForm(false)
    }
  }

  const handleRemoveMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id))
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
          <h1 className="text-2xl font-bold text-[#160C28]">Add Family Members</h1>
          <p className="text-[#626868]">Build your family health network</p>
        </div>
      </div>

      {/* Add New Member Button */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white rounded-t-3xl py-6">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <Users className="w-6 h-6" />
            Family Members ({familyMembers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full h-16 bg-gradient-to-r from-[#160C28] to-[#626868] hover:from-[#160C28]/90 hover:to-[#626868]/90 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-6 h-6 mr-3" />
            Add New Family Member
          </Button>
        </CardContent>
      </Card>

      {/* Add Member Form */}
      {showAddForm && (
        <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#160C28] to-[#626868] text-white rounded-t-3xl py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <User className="w-6 h-6" />
                Add Family Member
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowAddForm(false)}
                className="text-white hover:bg-white/20 rounded-xl p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#F0B67F]" />
                  Full Name
                </Label>
                <Input
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                />
              </div>

              {/* Age */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F0B67F]" />
                  Age
                </Label>
                <Input
                  type="number"
                  placeholder="Enter age"
                  value={newMember.age || ""}
                  onChange={(e) => setNewMember({ ...newMember, age: Number.parseInt(e.target.value) || 0 })}
                  className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                />
              </div>

              {/* Relationship */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#F0B67F]" />
                  Relationship
                </Label>
                <Select
                  value={newMember.relationship}
                  onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {relationships.map((relationship) => (
                      <SelectItem key={relationship} value={relationship} className="text-base py-3">
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#F0B67F]" />
                  Phone Number
                </Label>
                <Input
                  placeholder="Enter phone number"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F0B67F]" />
                Address
              </Label>
              <Input
                placeholder="Enter complete address"
                value={newMember.address}
                onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                className="h-14 text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl bg-gradient-to-r from-[#BBC2E2]/10 to-[#B6C197]/10"
              />
            </div>

            {/* Medical Conditions */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-[#160C28]">Medical Conditions (Optional)</Label>
              <Textarea
                placeholder="List any known medical conditions, allergies, or ongoing treatments..."
                value={newMember.medicalConditions}
                onChange={(e) => setNewMember({ ...newMember, medicalConditions: e.target.value })}
                className="min-h-[100px] text-lg border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-2xl resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddMember}
                disabled={!newMember.name || !newMember.relationship}
                className="flex-1 h-14 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl disabled:opacity-50"
              >
                Add Member
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="h-14 border-2 border-[#BBC2E2] text-[#626868] hover:bg-[#BBC2E2]/10 rounded-2xl px-8"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Family Members List */}
      {familyMembers.length > 0 && (
        <div className="space-y-4">
          {familyMembers.map((member) => (
            <Card key={member.id} className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F0B67F] to-[#B6C197] rounded-2xl flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#160C28]">{member.name}</h3>
                        <p className="text-[#626868] font-medium">
                          {member.relationship} • {member.age} years old
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {member.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#F0B67F]" />
                          <span className="text-[#626868]">{member.phone}</span>
                        </div>
                      )}
                      {member.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#F0B67F]" />
                          <span className="text-[#626868]">{member.address}</span>
                        </div>
                      )}
                    </div>

                    {member.medicalConditions && (
                      <div className="mt-4 p-4 bg-[#BBC2E2]/20 rounded-2xl border border-[#BBC2E2]/30">
                        <h4 className="font-semibold text-[#160C28] mb-2">Medical Conditions:</h4>
                        <p className="text-[#626868]">{member.medicalConditions}</p>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {familyMembers.length === 0 && !showAddForm && (
        <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-[#BBC2E2]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-[#BBC2E2]" />
            </div>
            <h3 className="text-2xl font-bold text-[#160C28] mb-3">No Family Members Added</h3>
            <p className="text-[#626868] mb-8 max-w-md mx-auto">
              Start building your family health network by adding your first family member. This will help you track and
              manage their health information effectively.
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-[#F0B67F] to-[#B6C197] hover:from-[#F0B67F]/90 hover:to-[#B6C197]/90 text-white font-semibold rounded-2xl h-14 px-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Family Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
