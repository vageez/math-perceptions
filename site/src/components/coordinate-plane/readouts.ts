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
export function reduceFraction(rise: number, run: number): string {
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

// ---------------------------------------------------------------------------
// mode="line"  ->  y = mx + b
// ---------------------------------------------------------------------------

export type LineReadout = {
  equation: string;   // "y = 2x + 3", "y = -1/2x - 4", "y = 3", or "x = 2"
  isVertical: boolean;
  meaning: string;
  /** y-intercept as a number, or null for a vertical line (no y-intercept form) */
  bValue: number | null;
};

/** Format the "mx" term: 1 -> "x", -1 -> "-x", 0 -> "", else "3/2x" */
function slopeTerm(rise: number, run: number): string {
  if (rise === 0) return '';
  const s = reduceFraction(rise, run);
  if (s === '1') return 'x';
  if (s === '-1') return '-x';
  return `${s}x`;
}

export function describeLine(p1: Pt, p2: Pt): LineReadout {
  const rise = n(p2.y - p1.y);
  const run = n(p2.x - p1.x);

  if (run === 0 && rise === 0) {
    return { equation: '—', isVertical: false, bValue: null,
      meaning: 'Both points are in the same place — drag them apart to define a line.' };
  }

  if (run === 0) {
    return { equation: `x = ${n(p1.x)}`, isVertical: true, bValue: null,
      meaning: 'A vertical line has no slope, so it cannot be written as y = mx + b. It is written x = a number.' };
  }

  // b = y1 - (rise/run) * x1, kept exact as (y1*run - rise*x1)/run
  const bNum = n(p1.y * run - rise * p1.x);
  const bStr = reduceFraction(bNum, run);
  const bValue = bNum / run;

  if (rise === 0) {
    return { equation: `y = ${bStr}`, isVertical: false, bValue,
      meaning: 'The slope is 0, so the line is horizontal: y stays the same for every x.' };
  }

  const mTerm = slopeTerm(rise, run);
  let eq = `y = ${mTerm}`;
  if (bValue !== 0) {
    const sign = bValue > 0 ? '+' : '-';
    const mag = bStr.startsWith('-') ? bStr.slice(1) : bStr;
    eq += ` ${sign} ${mag}`;
  }

  const dir = rise / run > 0 ? 'rises' : 'falls';
  const crosses = bValue === 0 ? 'through the origin' : `crossing the y-axis at ${bStr}`;
  return { equation: eq, isVertical: false, bValue,
    meaning: `The line ${dir} from left to right, ${crosses}.` };
}

// ---------------------------------------------------------------------------
// mode="types" ->  relationship between two lines
// ---------------------------------------------------------------------------

export type TypesReadout = {
  m1: string;
  m2: string;
  label: string;   // "Parallel" | "Perpendicular" | "Neither" | "The same line"
  meaning: string;
};

function slopeLabel(rise: number, run: number): string {
  if (run === 0 && rise === 0) return '—';
  if (run === 0) return 'undefined';
  return reduceFraction(rise, run);
}

export function describeTypes(a1: Pt, a2: Pt, b1: Pt, b2: Pt): TypesReadout {
  const r1 = n(a2.y - a1.y), u1 = n(a2.x - a1.x);
  const r2 = n(b2.y - b1.y), u2 = n(b2.x - b1.x);
  const m1 = slopeLabel(r1, u1);
  const m2 = slopeLabel(r2, u2);

  const degenerate = (r1 === 0 && u1 === 0) || (r2 === 0 && u2 === 0);
  if (degenerate) {
    return { m1, m2, label: '—',
      meaning: 'Each line needs two different points — drag them apart.' };
  }

  // Direction vectors (run, rise). Integer cross/dot products avoid float error.
  const cross = u1 * r2 - r1 * u2; // 0 => parallel
  const dot = u1 * u2 + r1 * r2;   // 0 => perpendicular

  if (cross === 0) {
    // collinear? does b1 lie on line a1->a2
    const onSame = u1 * (b1.y - a1.y) - r1 * (b1.x - a1.x) === 0;
    if (onSame) {
      return { m1, m2, label: 'The same line',
        meaning: 'Same slope and they share points, so this is one line drawn twice.' };
    }
    const why = u1 === 0
      ? 'Both lines are vertical, so they never meet.'
      : `Both slopes are ${m1}. Equal slopes mean the lines never meet.`;
    return { m1, m2, label: 'Parallel', meaning: why };
  }

  if (dot === 0) {
    const why = (u1 === 0 || u2 === 0)
      ? 'One line is vertical and the other is horizontal — they meet at a right angle.'
      : `${m1} × ${m2} = -1, so the lines meet at a right angle.`;
    return { m1, m2, label: 'Perpendicular', meaning: why };
  }

  return { m1, m2, label: 'Neither',
    meaning: `Slopes ${m1} and ${m2} are different, and their product is not -1, so the lines cross at an angle.` };
}
