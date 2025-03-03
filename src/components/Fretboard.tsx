import { range } from 'effect/Array';
import { createContext, FC, useContext, useState } from 'react';
import { match } from 'ts-pattern';
import { calcRelativeFretDistances, determineInlay } from '../utils/fretboard';
import { normalize } from '../utils/math';

type FretboardContextValue = {
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
});

const Inlay: FC = () => {
  const { inlayDiameter, inlayColor } = useContext(FretboardContext);
  return (
    <div
      style={{
        position: 'absolute',
        width: inlayDiameter,
        height: inlayDiameter,
        backgroundColor: inlayColor,
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

const Button: FC<{ rowIndex: number; colIndex: number }> = ({
  rowIndex,
  colIndex,
}) => {
  const { onClick, noteButtonDiameter, noteButtonColor, noteButtonHoverColor } =
    useContext(FretboardContext);

  const handleClick = () => onClick(rowIndex + 1, colIndex);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 50%)',
        zIndex: 1,
        width: '100%',
        height: rowIndex === 0 ? '200%' : '100%',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: noteButtonDiameter,
          height: noteButtonDiameter,
          borderRadius: '50%',
          backgroundColor: isHovered ? noteButtonHoverColor : noteButtonColor,
        }}
      />
    </button>
  );
};

const Cell: FC<{ rowIndex: number; colIndex: number }> = ({
  rowIndex,
  colIndex,
}) => {
  const { relativeFretDistances, numStrings, canClickNotes } =
    useContext(FretboardContext);
  const inlayType = determineInlay(colIndex);
  const hasInlay = match(inlayType)
    .with('single-dot', () => rowIndex === Math.floor(numStrings / 2))
    .with('double-dot', () => rowIndex === 2 || rowIndex === numStrings - 2)
    .with('none', () => false)
    .exhaustive();
  const showButton = canClickNotes && rowIndex !== numStrings;

  return (
    <div
      key={`cell:${rowIndex},${colIndex}`}
      style={{
        position: 'relative',
        flexGrow: relativeFretDistances[colIndex],
        height: '100%',
        borderTop: rowIndex !== 0 ? '1px solid black' : 'none',
        borderLeft:
          colIndex !== 0 ? `${colIndex === 1 ? 3 : 1}px solid black` : 'none',
      }}
    >
      {hasInlay && <Inlay />}
      {showButton && <Button rowIndex={rowIndex} colIndex={colIndex} />}
    </div>
  );
};

const Row: FC<{ index: number }> = ({ index }) => {
  const { numStrings, numFrets } = useContext(FretboardContext);
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: index === 0 || index === numStrings ? 1 : 2,
      }}
    >
      {range(0, numFrets).map((col) => (
        <Cell rowIndex={index} colIndex={col} key={`cell:${index},${col}`} />
      ))}
    </div>
  );
};

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
      <FretboardContext.Provider value={fretboardContextValue}>
        {range(0, numStrings).map((row) => (
          <Row index={row} key={`row:${row}`} />
        ))}
      </FretboardContext.Provider>
    </div>
  );
};

export default Fretboard;
