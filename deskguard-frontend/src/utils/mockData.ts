import { Seat, LibraryStats, ActivityEvent } from '../types';

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const statuses: Array<'available' | 'occupied' | 'away' | 'abandoned'> = 
    ['available', 'occupied', 'away', 'abandoned'];
  
  const zones = ['A', 'B', 'C', 'D'];
  const zoneOffsets = [
    { x: 60, y: 60 },
    { x: 380, y: 60 },
    { x: 60, y: 280 },
    { x: 380, y: 280 },
  ];

  let seatNum = 1;
  zones.forEach((zone, zoneIdx) => {
    const offset = zoneOffsets[zoneIdx];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const rand = Math.random();
        let status: 'available' | 'occupied' | 'away' | 'abandoned';
        if (rand < 0.45) status = 'available';
        else if (rand < 0.75) status = 'occupied';
        else if (rand < 0.9) status = 'away';
        else status = 'abandoned';

        seats.push({
          id: `seat-${seatNum}`,
          number: String(seatNum).padStart(2, '0'),
          row: `${zone}${row + 1}`,
          zone,
          status,
          x: offset.x + col * 52,
          y: offset.y + row * 52,
          checkedInAt: status !== 'available' ? new Date(Date.now() - Math.random() * 7200000).toISOString() : undefined,
          awayStartedAt: status === 'away' ? new Date(Date.now() - Math.random() * 900000).toISOString() : undefined,
          awayEndsAt: status === 'away' ? new Date(Date.now() + Math.random() * 600000).toISOString() : undefined,
          lastActivity: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        });
        seatNum++;
      }
    }
  });
  return seats;
};

export const getMockStats = (seats: Seat[]): LibraryStats => ({
  total: seats.length,
  available: seats.filter(s => s.status === 'available').length,
  occupied: seats.filter(s => s.status === 'occupied').length,
  away: seats.filter(s => s.status === 'away').length,
  abandoned: seats.filter(s => s.status === 'abandoned').length,
});

export const mockActivity: ActivityEvent[] = [
  { id: '1', seatNumber: '07', event: 'Checked In', student: 'Arjun M.', timestamp: '2 min ago', type: 'occupied' },
  { id: '2', seatNumber: '23', event: 'Went Away', student: 'Priya K.', timestamp: '5 min ago', type: 'away' },
  { id: '3', seatNumber: '11', event: 'Abandoned', student: 'Rahul S.', timestamp: '12 min ago', type: 'abandoned' },
  { id: '4', seatNumber: '34', event: 'Checked Out', student: 'Neha R.', timestamp: '18 min ago', type: 'available' },
  { id: '5', seatNumber: '19', event: 'Returned', student: 'Vikram P.', timestamp: '24 min ago', type: 'occupied' },
  { id: '6', seatNumber: '42', event: 'Checked In', student: 'Ananya L.', timestamp: '31 min ago', type: 'occupied' },
];

export const mockNames = [
  'Arjun M.', 'Priya K.', 'Rahul S.', 'Neha R.', 'Vikram P.',
  'Ananya L.', 'Rishi T.', 'Kavya N.', 'Aditya B.', 'Shreya G.',
];
