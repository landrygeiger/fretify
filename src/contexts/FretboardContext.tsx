import { isUndefined } from 'effect/Predicate';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

export type FretboardContextValue = {
  numFrets: number;
  numStrings: number;
  inlayDiameter: number;
  inlayColor: string;
  relativeFretDistances: number[];
  canClickNotes: boolean;
  onClick: (fretNum: number, stringNum: number) => unknown;
  noteButtonDiameter: number;
  noteButtonHoverColor: string;
  noteButtonColor: string;
  nutWidth: number;
  nutColor: string;
  fretWidth: number;
  fretColor: string;
  stringWidth: number;
  stringColor: string;
  disabled: boolean;
  noteButtonDisabledHoverColor: string;
};

const FretboardContext = createContext<FretboardContextValue | undefined>(
  undefined
);

/**
 * Type safe way to not supply a "default" value when there is no provider.
 * From @eric-burel on StackOverflow https://stackoverflow.com/a/69735347
 */
export const useFretboardContext = () => {
  const fretboardContext = useContext(FretboardContext);
  if (isUndefined(fretboardContext)) {
    throw new Error(
      'No FretboardContext.Provider found when calling useFretboardContext.'
    );
  }
  return fretboardContext;
};

export const FretboardContextProvider: FC<
  PropsWithChildren<{ value: FretboardContextValue }>
> = ({ children, value }) => (
  <FretboardContext.Provider value={value}>
    {children}
  </FretboardContext.Provider>
);
