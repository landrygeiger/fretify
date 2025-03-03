import { createContext, FC, useContext } from 'react';
import { calcRelativeFretDistances, determineInlay } from '../utils/fretboard';
import { normalize } from '../utils/math';
import { range } from 'effect/Array';
import { match } from 'ts-pattern';

type FretboardContextValue = {
  numFrets: number;
  numStrings: number;
  inlayDiameter: number;
  inlayColor: string;
  relativeFretDistances: number[];
};

const FretboardContext = createContext<FretboardContextValue>({
  numFrets: 0,
  numStrings: 0,
  inlayDiameter: 0,
  inlayColor: 'black',
  relativeFretDistances: [],
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

const Cell: FC<{ rowIndex: number; colIndex: number }> = ({
  rowIndex,
  colIndex,
}) => {
  const { relativeFretDistances, numStrings } = useContext(FretboardContext);
  const inlayType = determineInlay(colIndex);
  const hasInlay = match(inlayType)
    .with('single-dot', () => rowIndex === Math.floor(numStrings / 2))
    .with('double-dot', () => rowIndex === 2 || rowIndex === numStrings - 2)
    .with('none', () => false)
    .exhaustive();

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
        <Cell rowIndex={index} colIndex={col} />
      ))}
    </div>
  );
};

type Props = {
  numFrets: number;
  numStrings: number;
  inlayDiameter?: number;
  inlayColor?: string;
};

const Fretboard: FC<Props> = ({
  numFrets,
  numStrings,
  inlayDiameter = 5,
  inlayColor = 'lightgray',
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
          <Row index={row} />
        ))}
      </FretboardContext.Provider>
    </div>
  );
};

export default Fretboard;
