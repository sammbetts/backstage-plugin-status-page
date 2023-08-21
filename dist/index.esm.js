import { createRouteRef, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

const rootRouteRef = createRouteRef({
  id: "status-page"
});

const statusPagePlugin = createPlugin({
  id: "status-page",
  routes: {
    root: rootRouteRef
  }
});
const StatusPage = statusPagePlugin.provide(
  createRoutableExtension({
    name: "StatusPage",
    component: () => import('./esm/index-79c64529.esm.js').then((m) => m.StatusPage),
    mountPoint: rootRouteRef
  })
);

export { StatusPage, statusPagePlugin };
//# sourceMappingURL=index.esm.js.map
