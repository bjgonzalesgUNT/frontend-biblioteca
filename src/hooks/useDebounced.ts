import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  load: (params: {
    signal: AbortSignal;
    value: string;
  }) => Promise<void> | void;
}

export const useDebounced = ({ load }: Props) => {
  const [value, setValue] = useState<string>("");

  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const prevDebouncedValueRef = useRef<string>("");

  const controllerRef = useRef<AbortController | null>(null);

  const handleLoad = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    await load({ signal, value: debouncedValue });
  }, [debouncedValue, load]);

  useEffect(() => {
    if (debouncedValue !== prevDebouncedValueRef.current) {
      handleLoad();
      prevDebouncedValueRef.current = debouncedValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return {
    value,
    setValue,
  };
};
