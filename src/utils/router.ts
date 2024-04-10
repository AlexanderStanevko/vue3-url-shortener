import { LocationQueryRaw, RouteLocationNormalizedLoaded, RouteParams } from 'vue-router'

export const mergeRouteQuery = (
  route: RouteLocationNormalizedLoaded,
  queryObj: LocationQueryRaw = {},
): RouteLocationNormalizedLoaded => ({
  ...route,
  query: {
    ...route.query,
    ...queryObj,
  },
})

export const mergeRouteParams = (
  route: RouteLocationNormalizedLoaded,
  paramsObj: RouteParams = {},
): RouteLocationNormalizedLoaded => ({
  ...route,
  params: {
    ...route.params,
    ...paramsObj,
  },
})
