export interface UserBooking {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: [
    {
      rowNumber: number;
      seatNumber: number;
    }
  ];
  isPaid: true;
}
