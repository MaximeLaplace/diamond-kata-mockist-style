import { generateDiamond, generateTopHalf, generateLine } from ".";
import type { Character, GenerateLineDependency, GenerateTopHalfDependency } from ".";

describe("Generate Diamond", () => {
  it("Should generate a diamond of dimension 1 when given dimension 1", () => {
    // GIVEN
    const dimension = 1;
    const mockedGenerateLine: GenerateLineDependency = ({ dimension, lineNumber }) => ["*"];
    const mockedGenerateTopHalf: GenerateTopHalfDependency = ({ dimension }) => [];

    // WHEN
    const actual = generateDiamond({ generateLine: mockedGenerateLine, generateTopHalf: mockedGenerateTopHalf })(
      dimension
    );

    // THEN
    const expected = [["*"]];
    expect(actual).toEqual(expected);
  });

  it("Should generate a diamond of dimension 3 when given dimension 3", () => {
    // GIVEN
    const dimension = 3;

    const mockedGenerateLine = jest.fn().mockReturnValueOnce(["*", "*", "*"]);

    const mockedGenerateTopHalf = jest.fn().mockReturnValueOnce([[" ", "*", " "]]);

    // WHEN
    const actual = generateDiamond({
      generateLine: mockedGenerateLine,
      generateTopHalf: mockedGenerateTopHalf,
    })(dimension);

    // THEN
    const expected: Character[][] = [
      [" ", "*", " "],
      ["*", "*", "*"],
      [" ", "*", " "],
    ];
    expect(actual).toEqual(expected);
  });

  it("Should generate a diamond of dimension 5 when given dimension 5", () => {
    // GIVEN
    const dimension = 3;

    const mockedGenerateLine = jest.fn().mockReturnValueOnce(["*", "*", "*", "*", "*"]);

    const mockedGenerateTopHalf = jest.fn().mockReturnValueOnce([
      [" ", " ", "*", " ", " "],
      [" ", "*", "*", "*", " "],
    ]);

    // WHEN
    const actual = generateDiamond({
      generateLine: mockedGenerateLine,
      generateTopHalf: mockedGenerateTopHalf,
    })(dimension);

    // THEN
    const expected: Character[][] = [
      [" ", " ", "*", " ", " "],
      [" ", "*", "*", "*", " "],
      ["*", "*", "*", "*", "*"],
      [" ", "*", "*", "*", " "],
      [" ", " ", "*", " ", " "],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Generate top half", () => {
  it("Should generate top half for dimension 1", () => {
    // GIVEN
    const dimension = 1;

    // WHEN
    const mockedGenerateLine = jest.fn().mockReturnValueOnce([]);

    const actual = generateTopHalf({ dimension, generateLine: mockedGenerateLine });

    // THEN
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it("Should generate top half for dimension 3", () => {
    // GIVEN
    const dimension = 3;

    // WHEN
    const mockedGenerateLine = jest.fn().mockReturnValueOnce([" ", "*", " "]);

    const actual = generateTopHalf({ dimension, generateLine: mockedGenerateLine });

    // THEN
    const expected = [[" ", "*", " "]];
    expect(actual).toEqual(expected);
  });

  it("Should generate top half for dimension 5", () => {
    // GIVEN
    const dimension = 5;

    // WHEN
    const mockedGenerateLine = jest
      .fn() //
      .mockReturnValueOnce([" ", " ", "*", " ", " "]) //
      .mockReturnValueOnce([" ", "*", "*", "*", " "]);

    const actual = generateTopHalf({ dimension, generateLine: mockedGenerateLine });

    // THEN
    const expected = [
      [" ", " ", "*", " ", " "],
      [" ", "*", "*", "*", " "],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Generate line", () => {
  it("Should generate lineNumber 0 for dimension 1", () => {
    // GIVEN
    const dimension = 1;
    const lineNumber = 0;

    // WHEN
    const actual = generateLine({ dimension, lineNumber });

    // THEN
    const expected = ["*"];
    expect(actual).toEqual(expected);
  });

  it("Should generate lineNumber 0 for dimension 7", () => {
    // GIVEN
    const dimension = 7;
    const lineNumber = 0;

    // WHEN
    const actual = generateLine({ dimension, lineNumber });

    // THEN
    const expected = [" ", " ", " ", "*", " ", " ", " "];
    expect(actual).toEqual(expected);
  });

  it("Should generate lineNumber 2 for dimension 7", () => {
    // GIVEN
    const dimension = 7;
    const lineNumber = 2;

    // WHEN
    const actual = generateLine({ dimension, lineNumber });

    // THEN
    const expected = [" ", "*", "*", "*", "*", "*", " "];
    expect(actual).toEqual(expected);
  });

  it("Should generate lineNumber 3 for dimension 7", () => {
    // GIVEN
    const dimension = 7;
    const lineNumber = 3;

    // WHEN
    const actual = generateLine({ dimension, lineNumber });

    // THEN
    const expected = ["*", "*", "*", "*", "*", "*", "*"];
    expect(actual).toEqual(expected);
  });
});
