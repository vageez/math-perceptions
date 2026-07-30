---
title: Formula Sheet
description: Every Unit 3 formula with a clue for when to use it.
sidebar:
  order: 60
---

> **Choose from the triangle’s information first. Then use the formula.**

## Formula map

```text
RIGHT TRIANGLE
  two known sides                  → Pythagorean Theorem
  angle + side information        → SOH CAH TOA

ANY TRIANGLE
  complete opposite pair          → Sine Law
  three sides; need area          → Heron’s Formula
  two sides + included angle      → SAS Area Formula
```

## 1. Pythagorean Theorem

$$
a^2+b^2=c^2
$$

**Use when:** the triangle is right-angled, two sides are known, and one side is missing.

- `a`, `b` = legs
- `c` = hypotenuse, opposite `90°`

**Find the hypotenuse:** $c=\sqrt{a^2+b^2}$

**Find a leg:** $a=\sqrt{c^2-b^2}$

**Do not use:** on a non-right triangle.

---

## 2. SOH CAH TOA

$$
\sin\theta=\frac{O}{H}
\qquad
\cos\theta=\frac{A}{H}
\qquad
\tan\theta=\frac{O}{A}
$$

**Use when:** the triangle is right-angled and the question connects a non-right angle with sides.

- Choose reference angle `θ` first.
- `H` is opposite `90°`.
- `O` is across from `θ`.
- `A` touches `θ` but is not `H`.

**Find a side:** use regular `sin`, `cos`, or `tan`.

**Find an angle:** use `sin⁻¹`, `cos⁻¹`, or `tan⁻¹`.

---

## 3. Sine Law

$$
\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}
$$

**Use when:** a complete side–opposite-angle pair is known and another side or angle is required.

**Remember:** `a ↔ A`, `b ↔ B`, and `c ↔ C` are opposite partners.

For angles, the reciprocal form is convenient:

$$
\frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}
$$

---

## 4. Triangle angle sum

$$
A+B+C=180°
$$

**Use when:** two angles are known or a multi-step problem needs the third angle.

---

## 5. Semiperimeter

$$
s=\frac{a+b+c}{2}
$$

**Use before:** Heron’s Formula.

`s` means half the perimeter, not the full perimeter.

---

## 6. Heron’s Formula

$$
A=\sqrt{s(s-a)(s-b)(s-c)}
$$

**Use when:** all three side lengths are known and area is required.

**Remember:** calculate `s` first and keep all four factors under the square root.

---

## 7. SAS Area Formula

$$
A=\frac12ab\sin C
$$

**Use when:** two sides and the angle between them are known and area is required.

Equivalent forms:

$$
A=\frac12bc\sin A
\qquad
A=\frac12ca\sin B
$$

**Remember:** the angle must be included between the two selected sides.

## Formula selection drill

| If the question gives… | Start with… |
|---|---|
| Right triangle, two sides | Pythagoras |
| Right triangle, angle and side | SOH CAH TOA |
| Non-right triangle, complete opposite pair | Sine Law |
| Three sides and asks for area | Semiperimeter, then Heron |
| Two sides and included angle, asks for area | SAS area formula |
| Two angles | Subtract from `180°` |

## Calculator and answer check

- [ ] Degree mode is on.
- [ ] The complete ratio or product is inside brackets.
- [ ] I used inverse trig only when finding an angle.
- [ ] I kept full precision until the final answer.
- [ ] I rounded as requested.
- [ ] Length has linear units; area has square units.
- [ ] The answer fits the triangle.

[← SAS Area Formula](sas-area-formula.md) · [Vocabulary →](vocabulary.md)
