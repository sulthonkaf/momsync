"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Edit2 } from "lucide-react"
import { useState } from "react"

interface ClinicalNote {
  id: string
  date: string
  type: "SOAP" | "Progress" | "Consultation"
  provider: string
  content: string
}

interface ClinicalNotesProps {
  patientId: string
}

export default function ClinicalNotes({ patientId }: ClinicalNotesProps) {
  const [notes, setNotes] = useState<ClinicalNote[]>([
    {
      id: "1",
      date: "2024-10-15",
      type: "SOAP",
      provider: "Dr. Bambang Sutrisno",
      content: `S: Patient reports increased thirst and frequent urination over past 2 weeks. Denies polyuria at night.
O: BP 130/85, Weight 72kg, Fasting glucose 125 mg/dL, HbA1c 7.2%
A: Gestational diabetes mellitus, well-controlled on current insulin therapy
P: Continue Lantus 10 units daily, Metformin 500mg BID, repeat glucose test in 2 weeks, refer to nutritionist`,
    },
    {
      id: "2",
      date: "2024-10-10",
      type: "Progress",
      provider: "Midwife Siti",
      content: `Patient doing well on insulin therapy. Blood glucose readings averaging 120-130 mg/dL. 
Baby growth appropriate for gestational age. No complications noted. Patient educated on diet and exercise.`,
    },
  ])

  const [newNote, setNewNote] = useState("")
  const [showNewNote, setShowNewNote] = useState(false)

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: ClinicalNote = {
        id: String(notes.length + 1),
        date: new Date().toISOString().split("T")[0],
        type: "Progress",
        provider: "Current User",
        content: newNote,
      }
      setNotes([note, ...notes])
      setNewNote("")
      setShowNewNote(false)
    }
  }

  return (
    <div className="space-y-4">
      {showNewNote && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Add Clinical Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter clinical note (SOAP format recommended)..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-32"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddNote} className="bg-blue-600 hover:bg-blue-700">
                Save Note
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewNote(false)
                  setNewNote("")
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!showNewNote && (
        <Button onClick={() => setShowNewNote(true)} className="w-full bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Clinical Note
        </Button>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">{note.type} Note</p>
                    <p className="text-sm text-gray-600">{note.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{new Date(note.date).toLocaleDateString()}</Badge>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap text-gray-700">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
