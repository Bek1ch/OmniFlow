/**
 * Форматирует дату в читаемый формат
 * @param date - дата для форматирования
 * @param options - опции форматирования
 * @returns отформатированная строка
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  const dateObj = new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObj.toLocaleDateString("ru-RU", { ...defaultOptions, ...options });
};

/**
 * Форматирует время в читаемый формат
 * @param date - дата для форматирования времени
 * @param options - опции форматирования
 * @returns отформатированная строка времени
 */
export const formatTime = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  const dateObj = new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return dateObj.toLocaleTimeString("ru-RU", { ...defaultOptions, ...options });
};

/**
 * Возвращает относительное время (например, "2 часа назад")
 * @param date - дата для сравнения
 * @returns строка с относительным временем
 */
export const getRelativeTime = (date: Date | string | number): string => {
  const now = new Date();
  const dateObj = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "только что";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} мин. назад`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ч. назад`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} дн. назад`;
  }

  return formatDate(dateObj);
};
