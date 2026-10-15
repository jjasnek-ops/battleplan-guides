export interface AdVisibility {
  viewportWidth: number;
  viewportHeight: number;
  containerWidth: number;
  creativeWidth: number;
  minViewportWidth: number;
  maxViewportWidth: number;
  minViewportHeight: number;
  requiresConsent: boolean;
  accepted: boolean;
  inView: boolean;
}
/** Only fitting, visible units request ads; fixed creatives retain their original size. */
export function canLoadAd(state: AdVisibility): boolean {
  return (
    state.viewportWidth > 0 &&
    state.viewportHeight > 0 &&
    state.containerWidth > 0 &&
    state.viewportWidth >= state.minViewportWidth &&
    state.viewportWidth <= state.maxViewportWidth &&
    state.viewportHeight >= state.minViewportHeight &&
    state.containerWidth >= state.creativeWidth &&
    (!state.requiresConsent || state.accepted) &&
    state.inView
  );
}
