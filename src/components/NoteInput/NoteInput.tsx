import { FC } from 'react';
import * as Note from '../../types/note';
import NoteButton from './NoteButton';

type Props = {
  noteBases?: Note.Base[];
  showRareEnharmonics?: boolean;
  onClick?: (note: Note.Note) => unknown;
  className?: string;
};

const NoteInput: FC<Props> = ({
  noteBases = Note.bases,
  showRareEnharmonics = false,
  onClick = () => {},
  className = '',
}) => {
  const notes: Note.Note[] = [
    ...noteBases.map((base) => ({ base, modifier: '#' as const })),
    ...noteBases.map((base) => ({ base, modifier: null })),
    ...noteBases.map((base) => ({ base, modifier: 'b' as const })),
  ];

  const isButtonVisible = (note: Note.Note) =>
    showRareEnharmonics || !Note.isRareEnharmonic(note);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${noteBases.length}, 1fr)`,
        gap: '4px',
      }}
      className={className}
    >
      {notes.map((note) =>
        isButtonVisible(note) ? (
          <NoteButton note={note} onClick={onClick} key={Note.toString(note)} />
        ) : (
          <div key={Note.toString(note)} />
        )
      )}
    </div>
  );
};

export default NoteInput;
