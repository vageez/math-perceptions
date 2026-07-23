// Pure readout logic for the CoordinatePlane component.
// Kept out of the .astro file so it can be unit-tested without a browser.

export type Pt = { x: number; y: number };

export type PointReadout = {
  place: string;
  why: string;
};

export type SlopeReadout = {
  /** m = (y2 - y1)/(x2 - x1) with the numbers substituted, e.g. "(-1 - 5)/(4 - -2)" */
  substituted: { num: string; den: string };
  /** the unreduced fraction, e.g. { num: "-6", den: "6" } */
  raw: { num: string; den: string };
  /** final value as text: "-1", "3/2", "0", or "undefined" */
  value: string;
  /** true when the line is vertical (x2 === x1) */
  undefinedSlope: boolean;
  /** plain-English interpretation */
  meaning: string;
  /** rise and run as signed numbers, for the on-grid triangle labels */
  rise: number;
  run: number;
};

const n = (v: number) => (Object.is(v, -0) ? 0 : v);
/** Render a number the way it should appear inside a subtraction: 5 - -2 reads better as 5 - (-2) */
const paren = (v: number) => (v < 0 ? `(${n(v)})` : `${n(v)}`);

export function describePoint(x: number, y: number): PointReadout {
  x = n(x);
  y = n(y);
  if (x === 0 && y === 0) return { place: 'At the origin', why: 'Both x and y are 0 → the origin' };
  if (x === 0)
    return { place: 'On the y-axis', why: 'x is 0, so the point sits on the y-axis — not in any quadrant' };
  if (y === 0)
    return { place: 'On the x-axis', why: 'y is 0, so the point sits on the x-axis — not in any quadrant' };
  const q = x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III';
  const xs = x > 0 ? 'positive' : 'negative';
  const ys = y > 0 ? 'positive' : 'negative';
  return { place: `Quadrant ${q}`, why: `x is ${xs} and y is ${ys} → Quadrant ${q}` };
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** Reduce rise/run to a signed fraction string: 2/1 -> "2", -6/6 -> "-1", 3/-2 -> "-3/2" */
function reduceFraction(rise: number, run: number): string {
  if (run === 0) return 'undefined';
  if (rise === 0) return '0';
  // Work in integers where possible (snapStep 0.5 can produce halves)
  const scale = Number.isInteger(rise) && Number.isInteger(run) ? 1 : 2;
  let a = Math.round(rise * scale);
  let b = Math.round(run * scale);
  const sign = a * b < 0 ? -1 : 1;
  a = Math.abs(a);
  b = Math.abs(b);
  const g = gcd(a, b);
  a /= g;
  b /= g;
  const magnitude = b === 1 ? `${a}` : `${a}/${b}`;
  return sign < 0 ? `-${magnitude}` : magnitude;
}

export function describeSlope(p1: Pt, p2: Pt): SlopeReadout {
  const rise = n(p2.y - p1.y);
  const run = n(p2.x - p1.x);

  const substituted = {
    num: `${n(p2.y)} - ${paren(p1.y)}`,
    den: `${n(p2.x)} - ${paren(p1.x)}`,
  };
  const raw = { num: `${rise}`, den: `${run}` };

  if (run === 0 && rise === 0) {
    return {
      substituted,
      raw,
      value: '—',
      undefinedSlope: false,
      meaning: 'Both points are in the same place — drag them apart to get a slope.',
      rise,
      run,
    };
  }

  if (run === 0) {
    return {
      substituted,
      raw,
      value: 'undefined',
      undefinedSlope: true,
      meaning: 'The run is 0. Dividing by 0 is undefined, so a vertical line has no slope value.',
      rise,
      run,
    };
  }

  const value = reduceFraction(rise, run);

  let meaning: string;
  if (rise === 0) {
    meaning = 'The rise is 0, so the line is horizontal and the slope is 0.';
  } else if (rise / run > 0) {
    meaning = 'Positive slope — the line rises from left to right.';
  } else {
    meaning = 'Negative slope — the line falls from left to right.';
  }

  return { substituted, raw, value, undefinedSlope: false, meaning, rise, run };
}
