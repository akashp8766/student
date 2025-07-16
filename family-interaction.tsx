"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Send, Phone, Video, MoreVertical, Search, MessageCircle,
  Users, Clock, Check, CheckCheck, Paperclip, Mic
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --------------- TYPES ---------------

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
  type?: "text" | "audio" | "file";
  fileUrl?: string;
  audioUrl?: string;
  fileName?: string;
}

interface FamilyMember {
  id: string;
  familyName: string;
  name: string;
  relationship: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
}

interface FamilyInteractionProps {
  onBack: () => void;
}

// --------------- COMPONENT ---------------

export default function FamilyInteraction({ onBack }: FamilyInteractionProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Assigned family members for the student
  const familyMembers: FamilyMember[] = [
    {
      id: "gf_mr",
      familyName: "Goyal Family",
      name: "Mr. Goyal",
      relationship: "Father",
      avatar: "MG",
      isOnline: true,
      lastSeen: "Online",
      unreadCount: 1,
      lastMessage: "Thank you for your help.",
      lastMessageTime: "2 min ago",
    },
    {
      id: "gf_mrs",
      familyName: "Goyal Family",
      name: "Mrs. Goyal",
      relationship: "Mother",
      avatar: "MG",
      isOnline: false,
      lastSeen: "Last seen 14 min ago",
      unreadCount: 0,
      lastMessage: "She is better today.",
      lastMessageTime: "14 min ago",
    },
    {
      id: "rh_mr",
      familyName: "Rao Household",
      name: "Mr. Rao",
      relationship: "Grandfather",
      avatar: "MR",
      isOnline: true,
      lastSeen: "Online",
      unreadCount: 0,
      lastMessage: "All BP meds updated.",
      lastMessageTime: "1 min ago",
    },
    {
      id: "rh_mrs",
      familyName: "Rao Household",
      name: "Mrs. Rao",
      relationship: "Grandmother",
      avatar: "MR",
      isOnline: false,
      lastSeen: "Last seen 46 min ago",
      unreadCount: 1,
      lastMessage: "Can we consult you tomorrow?",
      lastMessageTime: "45 min ago",
    },
    {
      id: "ff_mr",
      familyName: "Fernandes Family",
      name: "Mr. Fernandes",
      relationship: "Father",
      avatar: "MF",
      isOnline: true,
      lastSeen: "Online",
      unreadCount: 2,
      lastMessage: "Is the new report ready?",
      lastMessageTime: "5 min ago",
    }
  ];

  // Dummy chat data
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    gf_mr: [
      {
        id: "1", senderId: "gf_mr", senderName: "Mr. Goyal", content: "Hello! Mother has fever today.", timestamp: "9:34 AM", isRead: true, isSent: false
      },
      {
        id: "2", senderId: "me", senderName: "You", content: "How high is the fever?", timestamp: "9:36 AM", isRead: true, isSent: true
      },
      {
        id: "3", senderId: "gf_mr", senderName: "Mr. Goyal", content: "102°F, also cough. See you when you visit?", timestamp: "9:37 AM", isRead: false, isSent: false
      }
    ],
    gf_mrs: [
      { id: "1", senderId: "me", senderName: "You", content: "Good morning Ma'am. Are you better today?", timestamp: "8:12 AM", isRead: true, isSent: true },
      { id: "2", senderId: "gf_mrs", senderName: "Mrs. Goyal", content: "Yes, feeling better.", timestamp: "8:15 AM", isRead: true, isSent: false }
    ],
    rh_mr: [
      { id: "1", senderId: "rh_mr", senderName: "Mr. Rao", content: "My BP was 125/78 today.", timestamp: "9:51 AM", isRead: true, isSent: false },
      { id: "2", senderId: "me", senderName: "You", content: "Great! Continue as discussed.", timestamp: "9:53 AM", isRead: false, isSent: true }
    ],
    rh_mrs: [
      { id: "1", senderId: "rh_mrs", senderName: "Mrs. Rao", content: "Can we talk about next medicine?", timestamp: "8:11 AM", isRead: false, isSent: false }
    ],
    ff_mr: [
      { id: "1", senderId: "me", senderName: "You", content: "How is the leg pain now?", timestamp: "6:22 AM", isRead: true, isSent: true },
      { id: "2", senderId: "ff_mr", senderName: "Mr. Fernandes", content: "Much relieved, doctor.", timestamp: "7:00 AM", isRead: true, isSent: false }
    ],
  });

  // Filter by name, relationship, or family name
  const filteredMembers = familyMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.familyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chatBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatBottomRef.current) chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedMember, messages]);

  // ----------- Chat Actions -------------

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedMember) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isRead: false,
      isSent: true,
      type: "text",
    };
    setMessages((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), newMessage],
    }));
    setMessageInput("");
  };

  const handleAttachFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !selectedMember) return;
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content: "",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isRead: false,
      isSent: true,
      type: "file",
      fileUrl: url,
      fileName: file.name,
    };
    setMessages((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), message],
    }));
  };

  const handleAudioSend = () => {
    if (!selectedMember) return;
    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content: "",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isRead: false,
      isSent: true,
      type: "audio",
      audioUrl: "/audio-demo.mp3",
    };
    setMessages((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), message],
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedMemberData = familyMembers.find((m) => m.id === selectedMember);
  const currentMessages = selectedMember ? messages[selectedMember] || [] : [];

  // ----------- Chat View -----------

  if (selectedMember && selectedMemberData) {
    return (
      <div className="flex flex-col h-full min-h-screen max-h-screen bg-gradient-to-br from-[#BBC2E2]/20 to-[#B6C197]/10" style={{ fontFamily: "Nunito, Arial, sans-serif" }}>
        {/* Chat Header */}
        <div className="bg-white sticky top-0 shadow-md border-b border-[#BBC2E2]/30 px-3 py-2 flex items-center justify-between z-20">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedMember(null)}
              className="w-9 h-9 rounded-full bg-[#BBC2E2]/20 hover:bg-[#F0B67F]/30 p-0 mr-2"
            >
              <ArrowLeft className="w-5 h-5 text-[#160C28]" />
            </Button>
            <div className="flex items-center">
              <div className="relative mr-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white font-bold text-lg">
                  {selectedMemberData.avatar}
                </div>
                {selectedMemberData.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="font-bold text-[#160C28] text-base">{selectedMemberData.name}</div>
                <div className="text-xs text-[#626868]">{selectedMemberData.relationship} • {selectedMemberData.familyName}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-[#BBC2E2]/20">
              <Phone className="w-4 h-4 text-[#160C28]" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-[#BBC2E2]/20">
              <Video className="w-4 h-4 text-[#160C28]" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-[#BBC2E2]/20">
              <MoreVertical className="w-4 h-4 text-[#160C28]" />
            </Button>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 pb-2" style={{ minHeight: 0 }}>
          {currentMessages.map((m) => (
            <div key={m.id} className={`flex ${m.senderId === "me" ? "justify-end" : "justify-start"} mb-1`}>
              <div
                className={
                  "max-w-[80vw] px-3 py-2 rounded-xl text-sm break-words " +
                  (m.senderId === "me"
                    ? "bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white"
                    : "bg-white border border-[#BBC2E2]/30 text-[#160C28]")
                }
                style={{ wordBreak: "break-word" }}
              >
                {m.type === "file" && m.fileUrl ? (
                  <a href={m.fileUrl} download={m.fileName} className="font-medium underline">
                    📎 {m.fileName}
                  </a>
                ) : m.type === "audio" && m.audioUrl ? (
                  <audio controls src={m.audioUrl} className="mt-2 max-w-full" />
                ) : (
                  <p>{m.content}</p>
                )}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className={`text-[10px] ${m.senderId === "me" ? "text-white/70" : "text-[#626868]"}`}>
                    {m.timestamp}
                  </span>
                  {m.senderId === "me" && (
                    <span className="text-white/70">
                      {m.isRead ? <CheckCheck className="w-3 h-3 inline" /> : <Check className="w-3 h-3 inline" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>
        {/* Chat Input */}
        <div className="sticky bottom-0 bg-white border-t border-[#BBC2E2]/30 py-2 px-2 z-50">
          <div className="flex items-center gap-1">
            <Button type="button"
              size="icon"
              className="rounded-full w-10 h-10 bg-[#BBC2E2]/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5 text-[#F0B67F]" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept="image/*,application/pdf"
              onChange={handleAttachFile}
            />
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-2 border-[#BBC2E2] focus:border-[#F0B67F] rounded-full h-10 px-4 bg-[#BBC2E2]/10"
              style={{ fontSize: "15px" }}
              autoComplete="off"
              inputMode="text"
            />
            <Button
              type="button"
              size="icon"
              onClick={handleAudioSend}
              className="rounded-full w-10 h-10 bg-[#BBC2E2]/20"
            >
              <Mic className="w-5 h-5 text-[#F0B67F]" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              type="button"
              size="icon"
              className="rounded-full w-10 h-10 bg-gradient-to-r from-[#F0B67F] to-[#B6C197] flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ----------- Member List View -----------

  return (
    <div className="w-full min-h-screen max-h-screen bg-gradient-to-br from-[#BBC2E2]/30 to-[#B6C197]/30 flex flex-col p-0" style={{ fontFamily: "Nunito, Arial, sans-serif" }}>
      <div className="flex items-center gap-3 p-3 bg-white/90 backdrop-blur shadow-md sticky top-0 z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          size="icon"
          className="w-9 h-9 rounded-full bg-[#BBC2E2]/10 text-[#160C28] hover:bg-[#F0B67F]/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="font-bold text-lg text-[#160C28] flex-grow">Assigned Families</span>
      </div>
      <div className="w-full bg-transparent px-3 pt-1 pb-2 sticky top-[49px] z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#626868] w-5 h-5" />
          <Input
            placeholder="Search member, family or relation…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-10 text-base border-2 border-[#BBC2E2] rounded-full bg-white"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filteredMembers.length ? (
          filteredMembers.map((m) => (
            <Card
              key={m.id}
              className="mb-2 p-0 rounded-2xl border-2 border-[#BBC2E2]/15 bg-[#BBC2E2]/10 hover:border-[#F0B67F]/40 active:scale-[0.98] transition"
              onClick={() => setSelectedMember(m.id)}
              style={{ touchAction: "manipulation" }}
            >
              <CardContent className="py-3 px-2 flex items-center">
                <div className="relative mr-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#F0B67F] to-[#B6C197] text-white font-bold text-base">{m.avatar}</div>
                  {m.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-base font-semibold text-[#160C28]">{m.name}</h3>
                    {m.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {m.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-[#626868]">{m.relationship} • {m.familyName}</div>
                  <div className="text-xs text-[#626868] truncate max-w-[200px]">{m.lastMessage}</div>
                </div>
                <div className="flex flex-col items-end ml-2">
                  <div className="text-[10px] text-[#626868]">{m.lastMessageTime}</div>
                  <MessageCircle className="w-4 h-4 text-[#F0B67F] mt-0.5" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-8 text-center text-[#626868] text-base">No assigned family members found.</div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 px-2 pb-2">
        <Card className="rounded-xl bg-[#BBC2E2]/10 border-2 border-[#BBC2E2]/30 text-center py-1">
          <CardContent className="p-1">
            <div className="font-bold text-lg text-[#160C28]">{familyMembers.length}</div>
            <div className="text-[11px] text-[#626868]">Total People</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-green-50 border-2 border-green-200 text-center py-1">
          <CardContent className="p-1">
            <div className="font-bold text-lg text-green-600">{familyMembers.filter(m => m.isOnline).length}</div>
            <div className="text-[11px] text-green-600">Online</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-red-50 border-2 border-red-200 text-center py-1">
          <CardContent className="p-1">
            <div className="font-bold text-lg text-red-600">
              {familyMembers.reduce((sum, m) => sum + m.unreadCount, 0)}
            </div>
            <div className="text-[11px] text-red-600">Unread</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
