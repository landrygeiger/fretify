import { FC } from 'react';
import * as Note from '../../types/note';

type Props = {
  note: Note.Note;
  onClick: (note: Note.Note) => unknown;
};

const NoteButton: FC<Props> = ({ note, onClick }) => {
  const handleClick = () => {
    onClick(note);
  };
  return <button onClick={handleClick}>{Note.toString(note)}</button>;
};

export default NoteButton;
