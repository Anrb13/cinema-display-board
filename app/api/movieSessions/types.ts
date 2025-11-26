export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface MovieSessionInfo {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: Seat[];
}
