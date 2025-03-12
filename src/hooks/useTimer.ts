import { useCallback, useRef, useState } from 'react';

type Params = {
  seconds: number;
  onStop: () => unknown;
};

const useTimer = ({ seconds, onStop }: Params) => {
  const [count, setCount] = useState(seconds);
  const intervalId = useRef<number | null>(null);

  const clearTickInterval = useCallback(() => {
    if (!intervalId.current) return;
    clearInterval(intervalId.current);
    intervalId.current = null;
  }, []);

  const tick = useCallback(
    () =>
      setCount((count) => {
        const newCount = count - 1;
        if (newCount === 0) {
          clearTickInterval();
          onStop();
        }
        return newCount;
      }),
    [clearTickInterval, onStop]
  );

  const start = useCallback(() => {
    setCount(seconds);
    intervalId.current = setInterval(tick, 1000);
  }, [seconds, tick]);

  const stop = useCallback(() => {
    clearTickInterval();
    setCount(seconds);
  }, [clearTickInterval, seconds]);

  return { timerCount: count, startTimer: start, stopTimer: stop };
};

export default useTimer;
