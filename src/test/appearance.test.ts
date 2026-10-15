import { describe, expect, it } from "vitest";
import { accentTokens, normalizeRGB } from "@/lib/appearance";

describe("RGB accent inputs", () => {
  it("accepts all three channels and clamps them to 0–255", () => {
    expect(normalizeRGB([-10, 128.4, 300])).toEqual([0, 128, 255]);
    expect(normalizeRGB([20, 80, 200])).toEqual([20, 80, 200]);
  });
  it("rejects invalid saved RGB values", () => {
    expect(normalizeRGB([1, 2])).toBeUndefined();
    expect(normalizeRGB([0, NaN, 255])).toBeUndefined();
  });
  it("chooses readable foregrounds for black and white accents", () => {
    expect(accentTokens([0, 0, 0]).foreground).toBe("oklch(1 0 0)");
    expect(accentTokens([255, 255, 255]).foreground).toBe("oklch(0.12 0 0)");
  });
});