export interface IReminder {
  _id?: number;
  title: string;
  city: string;
  day?: string;
  time?: {hour: number, minute: number };
  color: 'primary' | 'warning' | 'success';
}
