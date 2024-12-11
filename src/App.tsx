import { useState, useEffect } from 'react'
import './index.css'
import { Timer } from './components/Timer'
import { TimeTable } from './components/TimeTable'
import { TimeEntry } from './types'
import { Search } from 'lucide-react'
import { EditModal } from './components/EditModal'
import { RateInput } from './components/RateInput'

function App() {
  const [title, setTitle] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState<string>('')
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [filter, setFilter] = useState('')
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hourlyRate, setHourlyRate] = useState(20)

  useEffect(() => {
    const savedEntries = localStorage.getItem('timeEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }

    const savedRate = localStorage.getItem('hourlyRate')
    if (savedRate) {
      setHourlyRate(Number(savedRate))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    localStorage.setItem('hourlyRate', String(hourlyRate))
  }, [hourlyRate])

  const handleToggle = () => {
    if (!isRunning && !title.trim()) {
      alert('Please enter a title first')
      return
    }

    setIsRunning(!isRunning)
    if (!isRunning) {
      setStartTime(new Date().toISOString())
    }
  }

  const calculateCost = (durationInSeconds: number): number => {
    return (durationInSeconds / 3600) * hourlyRate;
  }

  const handleComplete = (duration: number) => {
    const endTime = new Date().toISOString()
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      title,
      startTime,
      endTime,
      duration,
      cost: calculateCost(duration)
    }
    setEntries(prev => [newEntry, ...prev])
    setTitle('')
  }

  const handleEdit = (entry: TimeEntry) => {
    setEditingEntry(entry)
    setIsModalOpen(true)
  }

  const handleSave = (updatedEntry: TimeEntry) => {
    const entryWithUpdatedCost = {
      ...updatedEntry,
      cost: calculateCost(updatedEntry.duration)
    }
    setEntries(entries.map(entry => 
      entry.id === entryWithUpdatedCost.id ? entryWithUpdatedCost : entry
    ))
  }

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const handleRateChange = (newRate: number) => {
    setHourlyRate(newRate)
    setEntries(prev => prev.map(entry => ({
      ...entry,
      cost: (entry.duration / 3600) * newRate
    })))
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="glass-morphism rounded-2xl p-8 subtle-shadow">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Time Tracker
            </h1>
            <RateInput value={hourlyRate} onChange={handleRateChange} />
          </div>
          
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you working on?"
              className="w-full text-lg"
              disabled={isRunning}
            />
            
            <Timer 
              onComplete={handleComplete}
              isRunning={isRunning}
              onToggle={handleToggle}
            />
          </div>
        </div>

        <div className="glass-morphism rounded-2xl p-8 subtle-shadow">
          <div className="mb-8 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by title..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-12 w-full text-base"
            />
          </div>

          <TimeTable 
            entries={entries} 
            filter={filter} 
            onEdit={handleEdit}
            hourlyRate={hourlyRate}
          />
        </div>

        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          entry={editingEntry}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App
