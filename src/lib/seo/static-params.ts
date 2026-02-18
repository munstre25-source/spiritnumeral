import { getStaticParamsForRoute as getRouteStaticParams, type RouteKey } from './sitemap-manifest';

export { type RouteKey };

export function getStaticParamsForRoute(routeKey: RouteKey): Array<{ number: string }> {
  return getRouteStaticParams(routeKey);
}
