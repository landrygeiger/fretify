import { FC } from 'react';
import { match } from 'ts-pattern';
import { useFretboardContext } from '../../contexts/FretboardContext';
import { determineInlay } from '../../utils/fretboard';
import Inlay from './Inlay';
import NoteButton from './NoteButton';
import { isNull } from 'effect/Predicate';

const Cell: FC<{ rowIndex: number; colIndex: number }> = ({
  rowIndex,
  colIndex,
}) => {
  const {
    relativeFretDistances,
    numStrings,
    canClickNotes,
    nutWidth,
    nutColor,
    fretWidth,
    fretColor,
    stringWidth,
    stringColor,
    highlightedNote,
    highlightColor,
    highlightDiameter,
  } = useFretboardContext();

  const inlayType = determineInlay(colIndex);
  const hasInlay = match(inlayType)
    .with('single-dot', () => rowIndex === Math.floor(numStrings / 2))
    .with('double-dot', () => rowIndex === 2 || rowIndex === numStrings - 2)
    .with('none', () => false)
    .exhaustive();

  const showButton = canClickNotes && rowIndex !== numStrings;
  const showHighlight =
    !isNull(highlightedNote) &&
    highlightedNote.string === rowIndex + 1 &&
    highlightedNote.fret === colIndex;

  const hasLeftBorder = colIndex !== 0;
  const hasNut = colIndex === 1;
  const hasTopBorder = rowIndex !== 0;

  return (
    <div
      key={`cell:${rowIndex},${colIndex}`}
      style={{
        position: 'relative',
        flexGrow: relativeFretDistances[colIndex],
        height: '100%',
        borderTop: hasTopBorder
          ? `${stringWidth}px solid ${stringColor}`
          : 'none',
        borderLeft: hasLeftBorder
          ? `${hasNut ? nutWidth : fretWidth}px solid ${
              hasNut ? nutColor : fretColor
            }`
          : 'none',
      }}
    >
      {hasInlay && <Inlay />}
      {showButton && <NoteButton rowIndex={rowIndex} colIndex={colIndex} />}
      {showHighlight && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            zIndex: 2,
            width: highlightDiameter,
            height: highlightDiameter,
            borderRadius: '50%',
            backgroundColor: highlightColor,
          }}
        />
      )}
    </div>
  );
};

export default Cell;
