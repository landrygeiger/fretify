import { isUndefined } from 'effect/Predicate';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { match } from 'ts-pattern';

type KeyboardContextValue = {
  upArrow: boolean;
  downArrow: boolean;
};

const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined
);

/**
 * Type safe way to not supply a "default" value when there is no provider.
 * From @eric-burel on StackOverflow https://stackoverflow.com/a/69735347
 */
export const useKeyboardContext = () => {
  const fretboardContext = useContext(KeyboardContext);
  if (isUndefined(fretboardContext)) {
    throw new Error(
      'No FretboardContext.Provider found when calling useFretboardContext.'
    );
  }
  return fretboardContext;
};

export const KeyboardContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [upArrow, setUpArrow] = useState(false);
  const [downArrow, setDownArrow] = useState(false);

  const handleKeydown = (e: KeyboardEvent) =>
    match(e.key)
      .with('ArrowUp', () => setUpArrow(true))
      .with('ArrowDown', () => setDownArrow(true));

  const handleKeyup = (e: KeyboardEvent) =>
    match(e.key)
      .with('ArrowUp', () => setUpArrow(false))
      .with('ArrowDown', () => setDownArrow(false));

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ upArrow, downArrow }}>
      {children}
    </KeyboardContext.Provider>
  );
};
