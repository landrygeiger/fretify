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
} & Partial<FretboardContextValue>;

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
  nutWidth = 3,
  nutColor = 'black',
  fretWidth = 1,
  fretColor = 'black',
  stringWidth = 1,
  stringColor = 'black',
  disabled = false,
  noteButtonDisabledHoverColor = 'gray',
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
    nutWidth,
    nutColor,
    fretWidth,
    fretColor,
    stringWidth,
    stringColor,
    disabled,
    noteButtonDisabledHoverColor,
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
