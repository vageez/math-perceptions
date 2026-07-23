---
title: Systems of Equations
description: Solve two linear equations by graphing, substitution, and elimination.
sidebar:
  order: 50
---

> **Question:** How do I find the values that make two equations true at the same time?

## Think of two roads crossing

Each equation is a road. The solution is the point that lies on both roads.

```text
 y
 ↑       line 1
 │         /
 │        / 
 │       ★  solution (x, y)
 │      / \
 │     /   \ line 2
 └────────────────→ x

 One intersection → one solution
 Parallel lines   → no solution
 Same line        → infinitely many solutions
```

## Worked example

**Solve the system $y = 2x + 1$ and $y = x + 4$.**

1. Both equations are already solved for $y$, so the two right-hand sides must be equal: $2x + 1 = x + 4$.
2. Subtract $x$ from both sides: $x + 1 = 4$.
3. Subtract $1$ from both sides: $x = 3$.
4. Substitute $x = 3$ into the simpler equation: $y = 3 + 4 = 7$.
5. Check in the *other* equation: $2(3) + 1 = 7$. ✓

**Answer:** $(3,\ 7)$ — the point where the two lines cross.

## Formal meaning

A **system of linear equations** contains two or more equations considered together. A solution is an ordered pair that satisfies every equation in the system.

## Three methods

| Method | Best clue | Main idea |
|---|---|---|
| Graphing | A graph is required or equations are easy to graph | Draw both lines and read the intersection |
| Comparison / substitution | A variable is already isolated or easy to isolate | Replace equals with equals |
| Elimination | Coefficients already match or can easily be made to match | Add or subtract equations to remove a variable |

## Method 1 — Graphing

Solve:

$$
y=x+1
$$

$$
y=-x+5
$$

Graph both. They meet at `(2, 3)`, so:

$$
x=2,\quad y=3
$$

Graphing may give an estimate if the intersection is not exactly on grid lines.

## Method 2 — Comparison / substitution

Use comparison when both equations equal the same variable.

$$
y=2x+1
$$

$$
y=-x+7
$$

Because both expressions equal `y`, set them equal:

$$
2x+1=-x+7
$$

$$
3x=6 \Rightarrow x=2
$$

Substitute into either original equation:

$$
y=2(2)+1=5
$$

Solution: `(2, 5)`.

### Substitution — one variable isolated

Use substitution when only **one** equation has a variable by itself.

$$
y=3x-2
$$

$$
2x+y=8
$$

Replace `y` in the second equation with `3x − 2`:

$$
2x+(3x-2)=8
$$

$$
5x-2=8 \Rightarrow 5x=10 \Rightarrow x=2
$$

Substitute back: `y = 3(2) − 2 = 4`.

Solution: `(2, 4)`. Comparison and substitution are the same core idea — replace equals with equals.

## Method 3 — Elimination

Solve:

$$
2x+y=11 \qquad (1)
$$

$$
x-y=1 \qquad (2)
$$

Add the equations. `+y` and `−y` cancel:

$$
3x=12 \Rightarrow x=4
$$

Substitute into an original equation:

$$
4-y=1 \Rightarrow y=3
$$

Solution: `(4, 3)`.

### If nothing cancels

Multiply one or both **entire equations** so a pair of coefficients become opposites.

$$
x+2y=7 \qquad (1)
$$

$$
3x+y=11 \qquad (2)
$$

Multiply equation (2) by `−2` so the `y` terms become opposites:

$$
-6x-2y=-22 \qquad (2')
$$

Add (1) and (2'). The `+2y` and `−2y` cancel:

$$
-5x=-15 \Rightarrow x=3
$$

Substitute into equation (1): `3 + 2y = 7`, so `y = 2`.

Solution: `(3, 2)`. (Multiplying (1) by `−3` to eliminate `x` gives the same answer — choose the easier path.)

## How many solutions?

Not every system has one answer. When you solve and **both variables disappear**, read the statement that is left:

| What remains | Meaning | Picture |
|---|---|---|
| A false statement, e.g. `0 = 5` | **No solution** | Parallel lines |
| A true statement, e.g. `0 = 0` | **Infinitely many solutions** | Same line |

Example: solving `y = 2x + 1` and `y = 2x + 4` by comparison gives `2x + 1 = 2x + 4`, so `1 = 4` — false. No solution, because the lines are parallel.

## Always check

Substitute the ordered pair into **both original equations**.

For `(4, 3)`:

- `2(4) + 3 = 11` ✓
- `4 − 3 = 1` ✓

## Word-problem setup

1. Name the unknowns.
2. Write one equation for each fact.
3. Solve the system.
4. Answer in words with units.

Example: Adult tickets cost \$10 and student tickets cost \$6. A total of 20 tickets brought in \$152.

Let `a` = adult tickets and `s` = student tickets.

$$
a+s=20
$$

$$
10a+6s=152
$$

Solving gives `a = 8` and `s = 12`.

## More worked examples

### Example 2 — Elimination when a variable already matches

**Solve $2x + 3y = 12$ and $2x - y = 4$.**

1. Both equations have the same $x$ term, $2x$, so subtracting removes it.
2. Subtract the second from the first: $(2x + 3y) - (2x - y) = 12 - 4$.
3. The $x$ terms cancel and $3y - (-y) = 4y$, so $4y = 8$.
4. Divide by $4$: $y = 2$.
5. Substitute into $2x - y = 4$: $2x - 2 = 4$, so $2x = 6$ and $x = 3$.
6. Check in the first equation: $2(3) + 3(2) = 6 + 6 = 12$. ✓

**Answer:** $(3,\ 2)$.

### Example 3 — A system with no solution

**Solve $x + y = 5$ and $2x + 2y = 3$.**

1. Rearrange each into $y = mx + b$ to compare them.
2. First: $y = -x + 5$.
3. Second: $2y = 3 - 2x$, so $y = -x + \tfrac{3}{2}$.
4. Both slopes are $-1$, but the intercepts $5$ and $\tfrac{3}{2}$ are different.
5. Equal slopes with different intercepts means the lines are parallel, and parallel lines never cross.

**Answer:** **No solution.** Do not keep solving — if the variables cancel and leave a false statement, that is the signal.

## When you see… think…

| When you see… | Think… |
|---|---|
| Two equations, same two variables | System |
| Both equations equal `y` | Compare the right sides |
| One variable already isolated | Substitute its expression into the other equation |
| Opposite coefficients | Add to eliminate |
| Matching coefficients with same signs | Subtract to eliminate |
| Asked where lines meet | Find the ordered-pair solution |
| Both variables vanish while solving | Check the leftover statement: false → no solution; true → infinitely many |

## Common exam mistakes

- Giving only `x` instead of the ordered pair `(x, y)`.
- Forgetting to substitute back for the second variable.
- Multiplying only one term instead of the whole equation.
- Adding or subtracting signs incorrectly.
- Checking the answer in only one equation.
- Forgetting units or a written conclusion in a word problem.

## Quick check

Solve:

$$
y=x+4
$$

$$
y=3x
$$

<details>
<summary>Answer</summary>

**Solve $y = x + 4$ and $y = 3x$**

1. Both equations are solved for $y$, so set the right-hand sides equal: $x + 4 = 3x$.
2. Subtract $x$ from both sides: $4 = 2x$.
3. Divide by $2$: $x = 2$.
4. Substitute into $y = 3x$: $y = 3(2) = 6$.
5. Check in the other equation: $2 + 4 = 6$. ✓

**Answer:** $(2,\ 6)$.

</details>

## Mission complete?

- [ ] I know a solution must satisfy both equations.
- [ ] I can choose graphing, comparison/substitution, or elimination.
- [ ] I know that if both variables vanish, the system has no solution or infinitely many.
- [ ] I solve for both variables.
- [ ] I write the answer as an ordered pair or in context.
- [ ] I check my answer in both original equations.

[← Types of Lines](types-of-lines.md) · [Unit Formula Sheet →](formula-sheet.md)
