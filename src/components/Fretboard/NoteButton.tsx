import { FC, useState } from 'react';
import { useFretboardContext } from '../../contexts/FretboardContext';

type Props = {
  rowIndex: number;
  colIndex: number;
};

const NoteButton: FC<Props> = ({ rowIndex, colIndex }) => {
  const { onClick, noteButtonDiameter, noteButtonColor, noteButtonHoverColor } =
    useFretboardContext();

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

export default NoteButton;
