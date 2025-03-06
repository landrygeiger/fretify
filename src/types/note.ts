export const bases = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Base = (typeof bases)[number];

export type Note = {
  base: Base;
  modifier: 'bb' | 'b' | '#' | '##' | null;
};

export const rareEnharmonics: Note[] = [
  { base: 'B', modifier: '#' },
  { base: 'C', modifier: 'b' },
  { base: 'E', modifier: '#' },
  { base: 'F', modifier: 'b' },
];

export const isEqual = (n1: Note, n2: Note) =>
  n1.modifier === n2.modifier && n1.base === n2.base;

export const isRareEnharmonic = (n: Note) =>
  rareEnharmonics.filter((n2) => isEqual(n, n2)).length !== 0;

export const toString = (n: Note) => `${n.base}${n.modifier ?? ''}`;
