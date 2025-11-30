import { format, parseISO } from 'date-fns';
import type { MovieSession } from '~/api/movies/types';
import type { SessionsByDateAndCinema, SessionsByDateAndMovie } from '~/types';

function formatDateAndTime(startTime: string) {
  const date = parseISO(startTime);
  const dateString = format(date, 'dd.MM');
  const timeString = format(date, 'HH:mm');

  return { dateString, timeString };
}

export function mapSessionsByDateAndCinema(arr: MovieSession[]) {
  return arr.reduce<SessionsByDateAndCinema>(
    (acc, session) => {
      // Форматируем дату и время для отображения
      const { dateString, timeString } = formatDateAndTime(session.startTime);

      // Инициализация структуры для даты
      if (!acc[dateString]) {
        acc[dateString] = {
          availableCinemas: [],
        };
      }

      const dateData = acc[dateString];

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
      if (!acc.availableDates.includes(dateString)) {
        acc.availableDates.push(dateString);
      }

      return acc;
    },
    {
      availableDates: [],
    } as unknown as SessionsByDateAndCinema,
  );
}

export function mapSessionsByDateAndMovie(arr: MovieSession[]) {
  return arr.reduce<SessionsByDateAndMovie>(
    (acc, session) => {
      // Форматируем дату и время для отображения
      const { dateString, timeString } = formatDateAndTime(session.startTime);

      // Инициализация структуры для даты
      if (!acc[dateString]) {
        acc[dateString] = {
          availableMovies: [],
        };
      }

      const dateData = acc[dateString];

      // Добавление фильма в список доступных
      if (!dateData.availableMovies.includes(session.movieId)) {
        dateData.availableMovies.push(session.movieId);
      }

      // Инициализация данных фильма
      if (!dateData[session.movieId]) {
        dateData[session.movieId] = [];
      }

      // Добавление сеанса
      dateData?.[session.movieId]?.push({
        ...session,
        formattedTime: timeString,
      });

      // Обновление списка доступных дат
      if (!acc.availableDates.includes(dateString)) {
        acc.availableDates.push(dateString);
      }

      return acc;
    },
    {
      availableDates: [],
    } as unknown as SessionsByDateAndMovie,
  );
}
