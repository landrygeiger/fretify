import { FC } from 'react';
import { match } from 'ts-pattern';
import { useFretboardContext } from '../../contexts/FretboardContext';
import { determineInlay } from '../../utils/fretboard';
import Inlay from './Inlay';
import NoteButton from './NoteButton';

const Cell: FC<{ rowIndex: number; colIndex: number }> = ({
  rowIndex,
  colIndex,
}) => {
  const { relativeFretDistances, numStrings, canClickNotes } =
    useFretboardContext();
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
      {showButton && <NoteButton rowIndex={rowIndex} colIndex={colIndex} />}
    </div>
  );
};

export default Cell;
