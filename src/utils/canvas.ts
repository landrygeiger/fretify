import { Effect } from 'effect';

export const drawCenteredCircle =
  (ctx: CanvasRenderingContext2D) =>
  (x: number) =>
  (y: number) =>
  (r: number) =>
  (config: { color?: string; filled?: boolean }) =>
    Effect.sync(() => {
      if (config.color) {
        ctx.strokeStyle = config.color;
        ctx.fillStyle = config.color;
      }
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      if (config.filled) {
        ctx.fill();
      }
      ctx.stroke();
    });
