/**
 * Объединяет классы CSS, исключая пустые значения
 * @param classes - массив или строки классов
 * @returns объединенная строка классов
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
};

/**
 * Объединяет объекты классов по условиям
 * @param classes - объект с условиями
 * @returns строка классов
 */
export const clsx = (classes: Record<string, boolean>): string => {
  return Object.entries(classes)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ')
    .trim();
};
