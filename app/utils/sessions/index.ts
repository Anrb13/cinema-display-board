import { format, parseISO } from 'date-fns';
import type { MovieSession } from '~/api/movies/types';
import type { SessionsByDate } from '~/components/CdbMovieInfo/types';

/**
 * Формирует список дат и группирует кинотеатры по датам.
 * Для каждого кинотеатра группирует сеансы.
 */
export function mapSessionsByDate(arr: MovieSession[]) {
  return arr.reduce<SessionsByDate>(
    (acc, session) => {
      // Форматируем дату и время для отображения
      const date = parseISO(session.startTime);
      const dateKey = format(date, 'dd.MM');
      const timeString = format(date, 'HH:mm');

      // Инициализация структуры для даты
      if (!acc[dateKey]) {
        acc[dateKey] = {
          availableCinemas: [],
        };
      }

      const dateData = acc[dateKey];

      // Добавление кинотеатра в список доступных
      if (!dateData.availableCinemas.includes(session.cinemaId)) {
        dateData.availableCinemas.push(session.cinemaId);
      }

      // Инициализация данных кинотеатра
      if (!dateData[session.cinemaId]) {
        dateData[session.cinemaId] = [];
      }

      // Добавление сеанса
      dateData?.[session.cinemaId]?.push({
        ...session,
        formattedTime: timeString,
      });

      // Обновление списка доступных дат
      if (!acc.availableDates.includes(dateKey)) {
        acc.availableDates.push(dateKey);
      }

      return acc;
    },
    {
      availableDates: [],
    } as unknown as SessionsByDate,
  );
}
