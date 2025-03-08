import { match } from 'ts-pattern';
import { getRandomElement } from '../utils/array';

export const bases = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Base = (typeof bases)[number];

export const modifiers = ['bb', 'b', '#', '##', null] as const;
export type Modifier = (typeof modifiers)[number];

export type Note = {
  base: Base;
  modifier: Modifier;
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

export const toNumber = (n: Note) =>
  match(n)
    .with({ base: 'A', modifier: 'bb' }, () => 10)
    .with({ base: 'A', modifier: 'b' }, () => 0)
    .with({ base: 'A', modifier: null }, () => 1)
    .with({ base: 'A', modifier: '#' }, () => 2)
    .with({ base: 'A', modifier: '##' }, () => 3)
    .with({ base: 'B', modifier: 'bb' }, () => 1)
    .with({ base: 'B', modifier: 'b' }, () => 2)
    .with({ base: 'B', modifier: null }, () => 3)
    .with({ base: 'B', modifier: '#' }, () => 4)
    .with({ base: 'B', modifier: '##' }, () => 5)
    .with({ base: 'C', modifier: 'bb' }, () => 2)
    .with({ base: 'C', modifier: 'b' }, () => 3)
    .with({ base: 'C', modifier: null }, () => 4)
    .with({ base: 'C', modifier: '#' }, () => 5)
    .with({ base: 'C', modifier: '##' }, () => 6)
    .with({ base: 'D', modifier: 'bb' }, () => 4)
    .with({ base: 'D', modifier: 'b' }, () => 5)
    .with({ base: 'D', modifier: null }, () => 6)
    .with({ base: 'D', modifier: '#' }, () => 7)
    .with({ base: 'D', modifier: '##' }, () => 8)
    .with({ base: 'E', modifier: 'bb' }, () => 6)
    .with({ base: 'E', modifier: 'b' }, () => 7)
    .with({ base: 'E', modifier: null }, () => 8)
    .with({ base: 'E', modifier: '#' }, () => 9)
    .with({ base: 'E', modifier: '##' }, () => 10)
    .with({ base: 'F', modifier: 'bb' }, () => 7)
    .with({ base: 'F', modifier: 'b' }, () => 8)
    .with({ base: 'F', modifier: null }, () => 9)
    .with({ base: 'F', modifier: '#' }, () => 10)
    .with({ base: 'F', modifier: '##' }, () => 11)
    .with({ base: 'G', modifier: 'bb' }, () => 9)
    .with({ base: 'G', modifier: 'b' }, () => 10)
    .with({ base: 'G', modifier: null }, () => 11)
    .with({ base: 'G', modifier: '#' }, () => 0)
    .with({ base: 'G', modifier: '##' }, () => 1)
    .exhaustive();

export const getRandom = ({
  includeBases = bases,
  includeModifiers = modifiers,
}: {
  includeBases?: Base[] | readonly Base[];
  includeModifiers?: Modifier[] | readonly Modifier[];
}): Note => ({
  base: getRandomElement(includeBases),
  modifier: getRandomElement(includeModifiers),
});
