import React, { useEffect, useState } from "react";

/**
 * matchPath
 *
 * This function checks whether the currentPath matches the routePath.
 * It supports:
 *  - Exact matches (e.g., "/search" === "/search")
 *  - Dynamic parameters (e.g., "/user/:id" matches "/user/123" and captures { id: "123" })
 *  - Parent routes (prefix matches) for nested routes
 *
 * @param {string} routePath - The path defined in the route (may include parameters)
 * @param {string} currentPath - The current URL path (window.location.pathname)
 * @returns {object} - { match: boolean, params: object, remaining: string }
 */
function matchPath(routePath, currentPath) {
  // Split paths into parts and remove empty strings (for leading/trailing slashes)
  const pathParts = routePath.split("/").filter(Boolean); // e.g., "/user/:id" => ["user", ":id"]
  const currentParts = currentPath.split("/").filter(Boolean); // e.g., "/user/123" => ["user", "123"]

  // ---------- Exact match or dynamic params ----------
  if (
    pathParts.length === currentParts.length &&
    pathParts.every(
      (part, i) => part === currentParts[i] || part.startsWith(":")
    )
  ) {
    // If lengths match and every part matches OR is a param, it’s a match
    let params = {};

    // Extract parameter values if any
    pathParts.forEach((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = currentParts[i]; // remove ":" and assign value
      }
    });

    return { match: true, params, remaining: "" }; // exact match, nothing remaining for children
  }

  // ---------- Prefix match for parent routes (nested routes) ----------
  if (pathParts.every((part, i) => part === currentParts[i])) {
    // e.g., routePath = "/", currentPath = "/search" → parent route matches
    const remaining = "/" + currentParts.slice(pathParts.length).join("/"); // remaining path for child routes
    return { match: true, params: {}, remaining }; // no params at parent, remaining used for children
  }

  // ---------- No match ----------
  return { match: false, params: {}, remaining: "" };
}

/**
 * renderRoutes
 *
 * Recursively traverses the route definitions and returns the React element
 * corresponding to the current path. Supports nested routes via recursion.
 *
 * @param {Array} routes - Array of route objects: { path, element, children }
 * @param {string} currentPath - The current path to match
 * @returns {React.Element} - The matched element or 404 element
 */
function renderRoutes(routes, currentPath) {
  // Iterate through all routes at this level
  for (let route of routes) {
    const { match, params, remaining } = matchPath(route.path, currentPath);

    if (match) {
      // If the route has children, recurse using the remaining path
      if (route.children) {
        return renderRoutes(route.children, remaining);
      }

      // If no children, clone the element and inject route params as props
      return React.cloneElement(route.element, { params });
    }
  }

  // If no route matches, return a 404 fallback element
  return <h1>404 Not found</h1>;
}

/**
 * useRoutes
 *
 * Custom React hook that returns the React element corresponding to the current path.
 * It listens to the browser’s history changes and updates the element dynamically.
 *
 * @param {Array} routes - Array of route objects (like in renderRoutes)
 * @returns {React.Element} - The element to render for the current route
 */
export function useRoutes(routes) {
  // ---------- State to track current path ----------
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // ---------- Effect to listen for browser navigation ----------
  useEffect(() => {
    // Handler for popstate events (back/forward button)
    const onLocationChange = () => setCurrentPath(window.location.pathname);

    // Subscribe to popstate events
    window.addEventListener("popstate", onLocationChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []); // run only once

  // ---------- Render the element for the current path ----------
  return renderRoutes(routes, currentPath);
}
