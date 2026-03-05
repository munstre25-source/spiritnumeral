import {
  getStaticParamsForRoute as getRouteStaticParams,
  getStaticParamsFromTemplate as getTemplateParams,
  isPathInStaticAllowlist,
  type RankedUrlEntry,
  type RouteKey
} from './sitemap-manifest';

export { type RouteKey };

export function getStaticParamsForRoute(routeKey: RouteKey): Array<{ number: string }> {
  return getRouteStaticParams(routeKey);
}

export function isPathStaticAllowlisted(path: string): boolean {
  return isPathInStaticAllowlist(path);
}

export function getStaticParamsFromTemplate<T>(
  toPath: (entry: RankedUrlEntry) => string | null,
  toParams: (entry: RankedUrlEntry) => T | null
): T[] {
  return getTemplateParams(toPath, toParams);
}
