import { NonEmptyArray } from "effect/Array";

type Note = `${"A" | "B" | "C" | "D" | "E" | "F" | "G"}${
  | "bb"
  | "b"
  | ""
  | "#"
  | "##"}`;

type Scale = NonEmptyArray<Note>;

const C_IONIAN: Scale = ["C", "D", "E", "F", "G", "A", "B"];
const C_SHARP_IONIAN: Scale = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];
const D_FLAT_IONIAN: Scale = ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];
const D_IONIAN: Scale = ["D", "E", "F#", "G", "A", "B", "C#"];
const D_SHARP_IONIAN: Scale = ["D#", "E#", "F##", "G#", "A#", "B#", "C##"];
const E_FLAT_IONIAN: Scale = ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
const E_IONIAN: Scale = ["E", "F#", "G#", "A", "B", "C#", "D#"];
const E_SHARP_IONIAN: Scale = ["E#", "F##", "G##", "A#", "B#", "C##", "D##"];
const F_FLAT_IONIAN: Scale = ["Fb", "Gb", "Ab", "Bbb", "Cb", "Db", "Eb"];
const F_IONIAN: Scale = ["F", "G", "A", "Bb", "C", "D", "E"];
const F_SHARP_IONIAN: Scale = ["F#", "G#", "A#", "B", "C#", "D#", "E#"];
const G_FLAT_IONIAN: Scale = ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"];
const G_IONIAN: Scale = ["G", "A", "B", "C", "D", "E", "F#"];
const G_SHARP_IONIAN: Scale = ["G#", "A#", "B#", "C#", "D#", "E#", "F##"];
const A_FLAT_IONIAN: Scale = ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];
const A_IONIAN: Scale = ["A", "B", "C#", "D", "E", "F#", "G#"];
const A_SHARP_IONIAN: Scale = ["A#", "B#", "C##", "D#", "E#", "F##", "G##"];
const B_FLAT_IONIAN: Scale = ["Bb", "C", "D", "Eb", "F", "G", "A"];
const B_IONIAN: Scale = ["B", "C#", "D#", "E", "F#", "G#", "A#"];
const B_SHARP_IONIAN: Scale = ["B#", "C##", "D##", "E#", "F##", "G##", "A##"];

// import { match } from "ts-pattern";

// type Note = {
//   l: "A" | "B" | "C" | "D" | "E" | "F" | "G";
//   a: "#" | "b" | null;
// };

// type NoteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// const toNumber = (note: Note): NoteNumber =>
//   match(note)
//     .with({ l: "A", a: null }, (): NoteNumber => 0)
//     .with({ l: "A", a: "#" }, (): NoteNumber => 1)
//     .with({ l: "A", a: "b" }, (): NoteNumber => 11)
//     .with({ l: "B", a: null }, (): NoteNumber => 2)
//     .with({ l: "B", a: "#" }, (): NoteNumber => 3)
//     .with({ l: "B", a: "b" }, (): NoteNumber => 1)
//     .with({ l: "C", a: null }, (): NoteNumber => 3)
//     .with({ l: "C", a: "#" }, (): NoteNumber => 4)
//     .with({ l: "C", a: "b" }, (): NoteNumber => 2)
//     .with({ l: "D", a: null }, (): NoteNumber => 5)
//     .with({ l: "D", a: "#" }, (): NoteNumber => 6)
//     .with({ l: "D", a: "b" }, (): NoteNumber => 4)
//     .with({ l: "E", a: null }, (): NoteNumber => 7)
//     .with({ l: "E", a: "#" }, (): NoteNumber => 8)
//     .with({ l: "E", a: "b" }, (): NoteNumber => 6)
//     .with({ l: "F", a: null }, (): NoteNumber => 8)
//     .with({ l: "F", a: "#" }, (): NoteNumber => 9)
//     .with({ l: "F", a: "b" }, (): NoteNumber => 7)
//     .with({ l: "G", a: null }, (): NoteNumber => 10)
//     .with({ l: "G", a: "#" }, (): NoteNumber => 11)
//     .with({ l: "G", a: "b" }, (): NoteNumber => 9)
//     .exhaustive();

// const makeScale = ()

// const naturalNotes = ["A", "B", "C", "D", "E", "F", "G"] as const;
// type NaturalNote = (typeof naturalNotes)[number];

// const sharpNotes = ["A#", "B#", "C#", "D#", "E#", "F#", "G#"] as const;
// type SharpNote = (typeof sharpNotes)[number];

// const flatNotes = ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"] as const;
// type FlatNote = (typeof flatNotes)[number];

// type AccidentalNote = SharpNote | FlatNote;
// type Note = NaturalNote | AccidentalNote;

// const baseNoteMapping: Record<NaturalNote, NoteNumber> = {
//   A: 0,
//   B: 2,
//   C: 3,
//   D: 5,
//   E: 7,
//   F: 8,
//   G: 10,
// };

// const isNatural = (note: Note): note is NaturalNote =>
//   naturalNotes.includes(note as NaturalNote);

// const isAccidental = (note: Note): note is AccidentalNote => !isNatural(note);

// const toNatural = (note: Note): NaturalNote => note.charAt(0) as NaturalNote;

// const toNote = (num: NoteNumber, prev: Note) =>

// const cmajor: NoteNumber[] = [3, 5, 7, 8, 10, 0, 2];
