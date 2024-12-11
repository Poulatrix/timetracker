import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { TimeEntry } from '../types'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  entry: TimeEntry | null
  onSave: (entry: TimeEntry) => void
  onDelete: (id: string) => void
}

export function EditModal({ isOpen, onClose, entry, onSave, onDelete }: EditModalProps) {
  if (!entry) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const duration = Math.floor(
      (new Date(formData.get('endTime') as string).getTime() - 
       new Date(formData.get('startTime') as string).getTime()) / 1000
    )
    
    const updatedEntry: TimeEntry = {
      ...entry,
      title: formData.get('title') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      duration: duration,
      cost: 0 // This will be recalculated in the App component
    }
    onSave(updatedEntry)
    onClose()
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete(entry.id)
      onClose()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    Edit Time Entry
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="editing-field-container">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={entry.title}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm hover:border-gray-300"
                    />
                  </div>

                  <div className="editing-field-container">
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      id="startTime"
                      defaultValue={new Date(entry.startTime).toISOString().slice(0, 16)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm hover:border-gray-300"
                    />
                  </div>

                  <div className="editing-field-container">
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      id="endTime"
                      defaultValue={new Date(entry.endTime).toISOString().slice(0, 16)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm hover:border-gray-300"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="primary shadow-md hover:shadow-xl"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
