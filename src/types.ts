export interface TimeEntry {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  cost: number; // in euros
}
