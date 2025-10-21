"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function HealthJournal() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "2024-10-18",
      mood: "Happy",
      symptoms: "Mild nausea",
      nutrition: "Healthy",
      notes: "Felt energetic today, had a good walk in the morning.",
    },
    {
      id: 2,
      date: "2024-10-17",
      mood: "Neutral",
      symptoms: "Fatigue",
      nutrition: "Good",
      notes: "Rested well, took prenatal vitamins.",
    },
  ])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Journal Entry</CardTitle>
          <CardDescription>Track your daily health and mood</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Mood</label>
              <select className="w-full mt-1 p-2 border border-border rounded-md">
                <option>Happy</option>
                <option>Neutral</option>
                <option>Sad</option>
                <option>Anxious</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Symptoms</label>
              <input
                type="text"
                placeholder="e.g., Nausea, Fatigue"
                className="w-full mt-1 p-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nutrition</label>
              <select className="w-full mt-1 p-2 border border-border rounded-md">
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea placeholder="Write your thoughts and observations..." className="mt-1" />
          </div>
          <Button className="w-full">Save Entry</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="p-3 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{entry.date}</p>
                  <p className="text-sm text-muted-foreground">Mood: {entry.mood}</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{entry.symptoms}</span>
              </div>
              <p className="text-sm">{entry.notes}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
