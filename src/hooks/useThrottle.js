import { useEffect, useRef, useState } from "react";

export const useThrottle = (func, delay) => {
  const [throttledValue, setthrottledValue] = useState(func);

  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecuted.current;

      if (timeElapsed >= delay) {
        setthrottledValue(func);
        lastExecuted.current = now;
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [func, delay]);

  return {
    throttledValue,
  };
};
