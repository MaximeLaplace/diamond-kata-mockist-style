export type Character = "*" | " ";
export type GenerateLineInput = { dimension: number; lineNumber: number };
export type GenerateLineDependency = ({ dimension, lineNumber }: GenerateLineInput) => Character[];

export type GenerateTopHalfInput = { dimension: number; generateLine: GenerateLineDependency };
export type GenerateTopHalfDependency = ({ dimension, generateLine }: GenerateTopHalfInput) => Character[][];

export type Dependencies = {
  generateLine: GenerateLineDependency;
  generateTopHalf: GenerateTopHalfDependency;
};

const repeatCharacter =
  (character: Character) =>
  (times: number): Character[] =>
    Array(times).fill(character);

export const generateLine: GenerateLineDependency = ({ dimension, lineNumber }) => {
  const starsAmount = lineNumber * 2 + 1;
  const leadingOrTrailingSpacesAmount = (dimension - starsAmount) / 2;

  const stars = repeatCharacter("*")(starsAmount);
  const spaces = repeatCharacter(" ")(leadingOrTrailingSpacesAmount);

  return [...spaces, ...stars, ...spaces];
};

export const generateTopHalf: GenerateTopHalfDependency = ({ dimension, generateLine }) =>
  [...Array((dimension - 1) / 2)].map((_, lineNumber) => generateLine({ lineNumber, dimension }));

export const generateDiamond =
  ({ generateLine, generateTopHalf }: Dependencies) =>
  (dimension: number): Character[][] => {
    const diamondTopHalf = generateTopHalf({ dimension, generateLine });

    const middleLineIndex = (dimension - 1) / 2;

    return [
      ...diamondTopHalf,
      generateLine({ dimension, lineNumber: middleLineIndex }),
      ...diamondTopHalf.slice().reverse(),
    ];
  };

const partiallyAppliedGenerateDiamond = ({ generateLine }) => generateDiamond({ generateLine, generateTopHalf });

export default partiallyAppliedGenerateDiamond;
