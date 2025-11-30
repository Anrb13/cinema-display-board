import {
  addSeconds,
  differenceInSeconds,
  format,
  isValid,
  parseISO,
} from 'date-fns';

export function formatDateAndTime(startTime: string) {
  const date = parseISO(startTime);

  if (!isValid(date)) {
    return {
      dateString: '',
      timeString: '',
    };
  }

  const dateString = format(date, 'dd.MM');
  const timeString = format(date, 'HH:mm');

  return { dateString, timeString };
}

// Вспомогательная функция для форматирования секунд
export function formatSecondsToMinSec(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getRemainingPaymentSeconds(
  bookedAt: string,
  bookingPaymentTimeSeconds: number = 180,
): number {
  const bookedDate = new Date(bookedAt);

  // Проверка валидности даты
  if (!isValid(bookedDate)) {
    console.error('Invalid bookedAt date:', bookedAt);
    return 0;
  }

  const paymentDeadline = addSeconds(bookedDate, bookingPaymentTimeSeconds);
  const now = new Date();
  const remainingSeconds = differenceInSeconds(paymentDeadline, now);

  return Math.max(0, remainingSeconds);
}
