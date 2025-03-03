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
};

const FretboardContext = createContext<FretboardContextValue>({
  numFrets: 0,
  numStrings: 0,
  inlayDiameter: 0,
  inlayColor: 'black',
  relativeFretDistances: [],
  canClickNotes: false,
  onClick: () => {},
  noteButtonDiameter: 0,
  noteButtonHoverColor: 'black',
  noteButtonColor: 'black,',
  nutWidth: 0,
  nutColor: 'black',
  fretWidth: 0,
  fretColor: 'black',
  stringWidth: 0,
  stringColor: 'black',
});

export const useFretboardContext = () => useContext(FretboardContext);

export const FretboardContextProvider: FC<
  PropsWithChildren<{ value: FretboardContextValue }>
> = ({ children, value }) => (
  <FretboardContext.Provider value={value}>
    {children}
  </FretboardContext.Provider>
);
