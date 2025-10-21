"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, MessageCircle } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  sender: "mother" | "doctor"
  senderName: string
  content: string
  timestamp: string
  read: boolean
}

interface Doctor {
  id: string
  name: string
  specialty: string
  avatar: string
  status: "online" | "offline"
}

export default function DoctorMessaging() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      senderName: "Dr. Bambang Sutrisno",
      content: "Hi Ibu Siti, how are you feeling today? Any concerns?",
      timestamp: "2024-10-15 10:30",
      read: true,
    },
    {
      id: "2",
      sender: "mother",
      senderName: "Ibu Siti",
      content: "I've been having some headaches and my blood pressure feels high",
      timestamp: "2024-10-15 10:45",
      read: true,
    },
    {
      id: "3",
      sender: "doctor",
      senderName: "Dr. Bambang Sutrisno",
      content:
        "Please check your blood pressure and send me the reading. If it's above 160/100, come to the clinic immediately.",
      timestamp: "2024-10-15 11:00",
      read: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Bambang Sutrisno",
      specialty: "Obstetrician",
      avatar: "/caring-doctor.png",
      status: "online",
    },
    {
      id: "2",
      name: "Midwife Siti",
      specialty: "Midwifery",
      avatar: "/midwife.png",
      status: "offline",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedDoctor) {
      const message: Message = {
        id: String(messages.length + 1),
        sender: "mother",
        senderName: "Ibu Siti",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        read: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 h-96">
      {/* Doctor List */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Healthcare Providers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {doctors.map((doctor) => (
            <button
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`w-full p-3 rounded-lg text-left transition ${
                selectedDoctor?.id === doctor.id
                  ? "bg-blue-100 border-2 border-blue-600"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{doctor.name}</p>
                  <p className="text-xs text-gray-600">{doctor.specialty}</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${doctor.status === "online" ? "bg-green-600" : "bg-gray-400"}`}
                />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="col-span-2 flex flex-col">
        {selectedDoctor ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                </div>
                <Badge className={selectedDoctor.status === "online" ? "bg-green-600" : "bg-gray-600"}>
                  {selectedDoctor.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-4 py-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "mother" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "mother"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="border-t p-4 space-y-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-20"
              />
              <Button onClick={handleSendMessage} className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Select a healthcare provider to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
