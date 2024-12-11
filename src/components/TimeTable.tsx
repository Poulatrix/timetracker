import { TimeEntry } from '../types';
import { Clock, Pencil, EuroIcon } from 'lucide-react';

interface TimeTableProps {
  entries: TimeEntry[];
  filter: string;
  onEdit: (entry: TimeEntry) => void;
  hourlyRate: number;
}

export function TimeTable({ entries, filter, onEdit, hourlyRate }: TimeTableProps) {
  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalDuration = filteredEntries.reduce((acc, entry) => acc + entry.duration, 0);
  const totalCost = filteredEntries.reduce((acc, entry) => acc + entry.cost, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatCost = (cost: number) => {
    return `€${cost.toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="w-full space-y-6">
      {filteredEntries.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-morphism rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total time</div>
              <div className="font-medium">{formatDuration(totalDuration)}</div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <EuroIcon className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total earnings</div>
              <div className="font-medium">{formatCost(totalCost)}</div>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(entry.startTime)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(entry.endTime)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDuration(entry.duration)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatCost(entry.cost)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <button
                    onClick={() => onEdit(entry)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit entry"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
