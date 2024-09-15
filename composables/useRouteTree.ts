import { useRouter, type RouteRecordRaw } from "vue-router";
import { computed, type ComputedRef } from "vue";

export interface RouteNode {
  name: string;
  path: string;
  description?: string;
  children: RouteNode[];
}

export function useNestedRouteTree(): ComputedRef<RouteNode[]> {
  const router = useRouter();

  const buildRouteTree = (routes: RouteRecordRaw[]): RouteNode[] => {
    const root: RouteNode[] = [];

    routes.forEach((route) => {
      const segments = route.path.split("/").filter(Boolean);
      let currentLevel = root;

      segments.forEach((segment, index) => {
        const fullPath = "/" + segments.slice(0, index + 1).join("/");
        let existingNode = currentLevel.find((node) => node.path === fullPath);

        if (!existingNode) {
          existingNode = {
            path: fullPath,
            name: index === segments.length - 1 ? (route.name as string) : "",
            description:
              index === segments.length - 1
                ? (route.meta?.description as string)
                : "",
            children: [],
          };
          currentLevel.push(existingNode);
        }

        if (index === segments.length - 1) {
          existingNode.name = route.name as string;
        } else {
          currentLevel = existingNode.children;
        }
      });
    });

    return root;
  };

  const routeTree = computed(() => {
    const routes = router.getRoutes();
    return buildRouteTree(routes);
  });

  return routeTree;
}
