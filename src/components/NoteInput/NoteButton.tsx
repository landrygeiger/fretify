import { FC } from 'react';
import * as Note from '../../types/note';
import Button from '../Base/Button';

type Props = {
  note: Note.Note;
  onClick: (note: Note.Note) => unknown;
};

const NoteButton: FC<Props> = ({ note, onClick }) => {
  const handleClick = () => {
    onClick(note);
  };
  return (
    <Button onClick={handleClick} className="h-12">
      {Note.toString(note)}
    </Button>
  );
};

export default NoteButton;
