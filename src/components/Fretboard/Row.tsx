import { FC } from 'react';
import { useFretboardContext } from '../../contexts/FretboardContext';
import Cell from './Cell';
import { range } from 'effect/Array';

const Row: FC<{ index: number }> = ({ index }) => {
  const { numStrings, numFrets } = useFretboardContext();
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

export default Row;
