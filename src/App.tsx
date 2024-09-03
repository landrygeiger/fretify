import PitchFinder from "pitchfinder";
import { useCallback, useEffect, useState } from "react";

const App = () => {
  const [pitch, setPitch] = useState<number | null>(null);
  const detectPitch = useCallback(PitchFinder.YIN(), []);

  const getNoteName = useCallback((pitch: number) => {
    var noteNum = 12 * (Math.log(pitch / 440) / Math.log(2));
    const i = Math.round(noteNum) + 70;
    const noteStrings = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    return noteStrings[i % 12];
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      const buffer: Float32Array = new Float32Array(4096);

      setInterval(() => {
        analyser.getFloatTimeDomainData(buffer);
        const frequency = detectPitch(buffer);
        if (frequency && frequency < 2000) setPitch(frequency);
      }, 10);
    });
  }, []);

  return (
    <>
      <h1>{pitch && getNoteName(pitch)}</h1>
      <h1>{pitch}</h1>
    </>
  );
};

export default App;
