import { useEffect, useRef, useCallback } from 'react';

export interface UseClickOutsideOptions {
  enabled?: boolean;
}

/**
 * Hook для обработки кликов вне элемента
 * @param callback - функция, вызываемая при клике вне элемента
 * @param options - опции хука
 * @returns ref для привязки к элементу
 */
export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  options: UseClickOutsideOptions = {}
) => {
  const { enabled = true } = options;
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!enabled) return;
      
      const element = ref.current;
      if (element && !element.contains(event.target as Node)) {
        callback();
      }
    },
    [callback, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick, enabled]);

  return ref;
};
