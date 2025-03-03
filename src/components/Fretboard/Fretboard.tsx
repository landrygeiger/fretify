import { range } from 'effect/Array';
import { FC } from 'react';
import {
  FretboardContextProvider,
  FretboardContextValue,
} from '../../contexts/FretboardContext';
import { calcRelativeFretDistances } from '../../utils/fretboard';
import { normalize } from '../../utils/math';
import Row from './Row';

type Props = {
  numFrets: number;
  numStrings: number;
  inlayDiameter?: number;
  inlayColor?: string;
  canClickNotes?: boolean;
  onClick?: (fretNum: number, stringNum: number) => unknown;
  noteButtonDiameter?: number;
  noteButtonColor?: string;
  noteButtonHoverColor?: string;
};

const Fretboard: FC<Props> = ({
  numFrets,
  numStrings,
  inlayDiameter = 5,
  inlayColor = 'lightgray',
  onClick = () => {},
  canClickNotes = false,
  noteButtonDiameter = 10,
  noteButtonColor = 'transparent',
  noteButtonHoverColor = 'red',
}) => {
  const relativeFretDistances = normalize(
    calcRelativeFretDistances(numFrets + 1)
  );

  const fretboardContextValue: FretboardContextValue = {
    numFrets,
    numStrings,
    relativeFretDistances,
    inlayDiameter,
    inlayColor,
    canClickNotes,
    onClick,
    noteButtonDiameter,
    noteButtonColor,
    noteButtonHoverColor,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        height: '125px',
      }}
    >
      <FretboardContextProvider value={fretboardContextValue}>
        {range(0, numStrings).map((row) => (
          <Row index={row} key={`row:${row}`} />
        ))}
      </FretboardContextProvider>
    </div>
  );
};

export default Fretboard;
