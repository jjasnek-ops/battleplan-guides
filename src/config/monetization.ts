/** An absent value retains the template's opt-in tracking mode. */
export const trackingRequiresConsent = import.meta.env.PUBLIC_REQUIRE_CONSENT !== 'false';
