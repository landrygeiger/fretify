import { Effect, flow } from 'effect';
import { FC, useEffect, useRef } from 'react';

/**
 * Multiply the scale length by this fret factor to find the location of the
 * first fret. Multiply the remaining scale length by the factor to find the
 * location of the second fret, and so on.
 */
const FRET_DISTANCE_FACTOR = 1 / 17.817154;

const getFretDistancesForScaleLength =
  (distanceFactor: number) =>
  (scaleLength: number) =>
  (numFrets: number): number[] => {
    if (numFrets <= 0) {
      return [];
    }

    const newFretWidth = scaleLength * distanceFactor;
    const remainingFretboardWidth = scaleLength - newFretWidth;

    return [newFretWidth].concat(
      getFretDistancesForScaleLength(distanceFactor)(remainingFretboardWidth)(
        numFrets - 1
      )
    );
  };

const convertFretDistancesToPx =
  (fretboardLengthPx: number) => (fretDistances: number[]) => {
    const totalDist = fretDistances.reduce((prev, curr) => prev + curr, 0);
    const pxPerLength = fretboardLengthPx / totalDist;
    return fretDistances.map((dist) => dist * pxPerLength);
  };

/**
 * Determines the width in pixels for each of the desired frets.
 * @param distanceFactor What percent of the remaining fret space should the
 * next fret take up. Typically about 17.817 in real life.
 * @param fretboardLengthPx The length in pixels that all frets should take up.
 * @param numFrets The number of frets that should be on the fretboard.
 * @returns The distances in pixels between each fret. Index 0 is the distance between the nut
 * and the first fret.
 */
const getFretDistancesPx =
  (distanceFactor: number) => (fretboardLengthPx: number) =>
    flow(
      // Scale length is arbitrary because it is going to be scaled into pixels anyway.
      getFretDistancesForScaleLength(distanceFactor)(1),
      convertFretDistancesToPx(fretboardLengthPx)
    );

const getCanvas2DContext = (
  canvas: HTMLCanvasElement
): Effect.Effect<CanvasRenderingContext2D, Error> => {
  const ctx = canvas.getContext('2d');
  return ctx !== null
    ? Effect.succeed(ctx)
    : Effect.fail(new Error('Failed to get 2d canvas context.'));
};

const drawFretboardIn2DContext =
  (fretboardLengthPx: number) =>
  (fretboardWidthPx: number) =>
  (numFrets: number) =>
  (numStrings: number) =>
  (fretDistanceFactor: number) =>
  (ctx: CanvasRenderingContext2D) =>
    Effect.sync(() => {
      let totalFretDistPx = 0;
      // Num frets + 1 so that we can use one fret as the distance behind the nut
      const distsPx = getFretDistancesPx(fretDistanceFactor)(fretboardLengthPx)(
        numFrets + 1
      );

      // Draw fret bars (don't draw last fret bar)
      distsPx.slice(0, -1).forEach((distPx, i) => {
        totalFretDistPx += distPx;
        ctx.lineWidth = i === 0 ? 6 : i === distsPx.length - 1 ? 0 : 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.floor(totalFretDistPx), 0);
        ctx.lineTo(Math.floor(totalFretDistPx), fretboardWidthPx);
        ctx.stroke();
      });

      const stringDistance = fretboardWidthPx / numStrings;
      let totalStringDistPx = stringDistance / 2;
      [...Array(numStrings)].forEach(() => {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        // Drawing at 0.5px intervals makes lines look less antialiased.
        ctx.moveTo(0.5, Math.floor(totalStringDistPx) + 0.5);
        ctx.lineTo(
          fretboardLengthPx + 0.5,
          Math.floor(totalStringDistPx) + 0.5
        );
        ctx.stroke();
        totalStringDistPx += stringDistance;
      });
    });

const drawFretboardOnCanvas =
  (numFrets: number) =>
  (numStrings: number) =>
  (fretDistanceFactor: number) =>
  (canvas: HTMLCanvasElement) =>
    Effect.gen(function* () {
      const ctx = yield* getCanvas2DContext(canvas);
      console.log(canvas.width, canvas.height);
      return yield* drawFretboardIn2DContext(canvas.width)(canvas.height)(
        numFrets
      )(numStrings)(fretDistanceFactor)(ctx);
    });

type Props = {
  numStrings: number;
  numFrets: number;
  highlightNote?: {
    string: number;
    fret: number;
  };
};

/**
 * Renders a fretboard with the given number of strings and frets. Provides the
 * ability to highlight a specific note.
 */
const Fretboard: FC<Props> = ({ numStrings, numFrets, highlightNote }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      Effect.runFork(
        drawFretboardOnCanvas(numFrets)(numStrings)(FRET_DISTANCE_FACTOR)(
          canvasRef.current
        )
      );
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={125}
      style={{ imageRendering: 'pixelated' }}
    ></canvas>
  );
};

export default Fretboard;
