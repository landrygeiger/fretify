import { Effect } from "effect";
import { isNull } from "effect/Predicate";
import PitchFinder from "pitchfinder";

const NOTE_LETTERS = [
  "A", "B", "C", "D", "E", "F", "G"
]

const NOTE_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const 

const cmajor = [3, 5, 7, 8, 10, 0, 2]

const BASE_NOTES = ["A", "B", "C", "D", "E", "F", "G"] as const;

type BaseNote = (typeof BASE_NOTES)[number];

const sharp = (note: BaseNote): SharpNote => `${note}#`;

const SHARP_NOTES = BASE_NOTES.map(sharp);

type SharpNote = BaseNote extends any ? `${BaseNote}#` : never;

type FlatNote = BaseNote extends any ? `${BaseNote}b` : never;

const NOTES = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "E#",
  "Fb",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

type Note = "C" | "C#";

const PITCH_DETECTION_BUFFER_SIZE = 4096;

const MAX_FREQUENCY = 2000;

const detectFrequency = PitchFinder.YIN();

const getUserAudioStream = Effect.tryPromise({
  try: () => navigator.mediaDevices.getUserMedia({ audio: true }),
  catch: (e) => e as DOMException,
});

const scanForNotes = (yieldNote: (note: Note) => unknown) =>
  Effect.gen(function* () {
    const audioContext = new AudioContext();

    const stream = yield* getUserAudioStream;
    const streamSource = audioContext.createMediaStreamSource(stream);

    const analyser = audioContext.createAnalyser();
    streamSource.connect(analyser);

    const buffer = new Float32Array(PITCH_DETECTION_BUFFER_SIZE);

    Effect.sync(() => {
      analyser.getFloatTimeDomainData(buffer);
      const frequency = detectFrequency(buffer);
      if (!isNull(frequency) && frequency <= MAX_FREQUENCY) {
      }
    });
  });
