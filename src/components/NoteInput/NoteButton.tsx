import { FC, useEffect } from 'react';
import * as Note from '../../types/note';
import Button from '../Base/Button';
import { useKeyboardContext } from '../../contexts/KeyboardContext';
import { match } from 'ts-pattern';

type Props = {
  note: Note.Note;
  enableHotkey?: boolean;
  onClick: (note: Note.Note) => unknown;
};

const NoteButton: FC<Props> = ({ note, onClick, enableHotkey = false }) => {
  const { upArrow, downArrow } = useKeyboardContext();

  const handleKeydown = (e: KeyboardEvent) => {
    const doesModifierMatch = match(note.modifier)
      .with('#', () => upArrow && !downArrow)
      .with('b', () => downArrow && !upArrow)
      .with(null, () => upArrow == downArrow)
      .with('##', () => false)
      .with('bb', () => false)
      .exhaustive();

    if (e.key.toUpperCase() == note.base && doesModifierMatch) {
      onClick(note);
    }
  };

  useEffect(() => {
    if (!enableHotkey) return;
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onClick, enableHotkey, handleKeydown]);

  const handleClick = () => {
    onClick(note);
  };

  const borderClass =
    enableHotkey &&
    ((upArrow && note.modifier === '#') || (downArrow && note.modifier === 'b'))
      ? 'border-2'
      : '';

  return (
    <Button
      onClick={handleClick}
      className={`h-12 ${Note.toClassName(note)} ${borderClass}`}
    >
      {Note.toString(note)}
    </Button>
  );
};

export default NoteButton;
