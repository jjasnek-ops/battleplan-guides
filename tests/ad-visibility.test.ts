import { describe, expect, test } from 'vitest';
import { canLoadAd, type AdVisibility } from '../src/lib/ad-visibility';
const base: AdVisibility = {
  viewportWidth: 390,
  viewportHeight: 720,
  containerWidth: 343,
  creativeWidth: 300,
  minViewportWidth: 0,
  maxViewportWidth: 767,
  minViewportHeight: 0,
  requiresConsent: false,
  accepted: false,
  inView: true,
};
describe('ad visibility and loading eligibility', () => {
  test('automatic mode loads a fitting mobile unit without a stored choice', () => {
    expect(canLoadAd(base)).toBe(true);
  });
  test('opt-in mode still respects an unchosen or declined visitor', () => {
    expect(canLoadAd({ ...base, requiresConsent: true })).toBe(false);
    expect(canLoadAd({ ...base, requiresConsent: true, accepted: true })).toBe(true);
  });
  test('a desktop-width viewport does not make a narrow article column fit 728px', () => {
    expect(
      canLoadAd({
        ...base,
        viewportWidth: 1280,
        containerWidth: 706,
        creativeWidth: 728,
        maxViewportWidth: 100000,
      }),
    ).toBe(false);
    expect(
      canLoadAd({
        ...base,
        viewportWidth: 1280,
        containerWidth: 728,
        creativeWidth: 728,
        maxViewportWidth: 100000,
      }),
    ).toBe(true);
  });
  test('inactive responsive variants and offscreen placements never request ads', () => {
    expect(canLoadAd({ ...base, viewportWidth: 1280 })).toBe(false);
    expect(canLoadAd({ ...base, minViewportWidth: 1280 })).toBe(false);
    expect(canLoadAd({ ...base, inView: false })).toBe(false);
  });
  test('a fixed skyscraper needs both spare width and enough height', () => {
    const rail = {
      ...base,
      viewportWidth: 1920,
      containerWidth: 160,
      creativeWidth: 160,
      minViewportWidth: 1700,
      maxViewportWidth: 100000,
      minViewportHeight: 780,
    };
    expect(canLoadAd(rail)).toBe(false);
    expect(canLoadAd({ ...rail, viewportHeight: 900 })).toBe(true);
    expect(canLoadAd({ ...rail, viewportHeight: 900, viewportWidth: 1440 })).toBe(false);
  });
  test('responsive native units fit available width but hidden containers do not load', () => {
    expect(canLoadAd({ ...base, creativeWidth: 0 })).toBe(true);
    expect(canLoadAd({ ...base, creativeWidth: 0, containerWidth: 0 })).toBe(false);
    expect(canLoadAd({ ...base, viewportWidth: 0 })).toBe(false);
  });
});
