"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm your MomSync AI Assistant. I analyze your health data to provide personalized recommendations. How can I help you today?",
    },
    {
      id: 2,
      type: "user",
      text: "I've been feeling stressed lately",
    },
    {
      id: 3,
      type: "ai",
      text: "I noticed your stress levels have been elevated. Based on your data, I recommend: 1) Try a 5-minute meditation session, 2) Increase your magnesium intake with foods like almonds, 3) Get more rest. Would you like specific recipes or meditation guides?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, type: "user", text: input }])
      setInput("")
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Health Assistant</CardTitle>
        <CardDescription>Get personalized health insights and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your health..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}
