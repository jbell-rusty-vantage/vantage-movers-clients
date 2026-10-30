/** RootLayout publishes only the public deployment environment on <html>.
 * Analytics reads it at event time, including after client-side navigation.
 */
export function siteVariationContext() {
  const page = window.location.pathname;
  return {
    variation_id: page === "/" ? "main-site-a-route" : "main-site-baseline",
    app: "main-site",
    environment: document.documentElement.dataset.deploymentEnvironment || "development",
    page,
    locale: document.documentElement.lang || "en",
  };
}
