export type SeatStatus = 'available' | 'occupied' | 'away' | 'abandoned';

export interface Seat {
  id: string;
  number: string;
  row: string;
  zone: string;
  status: SeatStatus;
  occupiedBy?: string;
  checkedInAt?: string;
  awayStartedAt?: string;
  awayEndsAt?: string;
  lastActivity?: string;
  x: number;
  y: number;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'student' | 'admin';
  currentSeat?: string;
}

export interface LibraryStats {
  total: number;
  available: number;
  occupied: number;
  away: number;
  abandoned: number;
}

export interface ActivityEvent {
  id: string;
  seatNumber: string;
  event: string;
  student: string;
  timestamp: string;
  type: SeatStatus;
}
