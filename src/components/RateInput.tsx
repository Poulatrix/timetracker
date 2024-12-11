import { EuroIcon } from 'lucide-react';

interface RateInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function RateInput({ value, onChange }: RateInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-gray-50/50 px-4 py-3 rounded-xl backdrop-blur-sm">
      <EuroIcon className="w-5 h-5 text-gray-500" />
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={handleChange}
        className="w-20 bg-transparent focus:outline-none text-right"
        aria-label="Hourly rate"
      />
      <span className="text-gray-600">/hour</span>
    </div>
  );
}
