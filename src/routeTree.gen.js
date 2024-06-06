/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as SignInImport } from './routes/sign-in'
import { Route as ContactImport } from './routes/contact'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as homeIndexImport } from './routes/(home)/index'
import { Route as AuthenticateddashboardPlannerImport } from './routes/_authenticated/(dashboard)/planner'
import { Route as AuthenticatedcatalogCatalogIndexImport } from './routes/_authenticated/(catalog)/catalog.index'
import { Route as AuthenticatedcatalogCatalogSearchImport } from './routes/_authenticated/(catalog)/catalog.search'
import { Route as AuthenticatedcatalogCatalogCatalogIdImport } from './routes/_authenticated/(catalog)/catalog.$catalogId'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => rootRoute,
})

const SignInRoute = SignInImport.update({
  path: '/sign-in',
  getParentRoute: () => rootRoute,
})

const ContactRoute = ContactImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
})

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
})

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
})

const homeIndexRoute = homeIndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
})

const AuthenticateddashboardPlannerRoute =
  AuthenticateddashboardPlannerImport.update({
    path: '/planner',
    getParentRoute: () => AuthenticatedRoute,
  })

const AuthenticatedcatalogCatalogIndexRoute =
  AuthenticatedcatalogCatalogIndexImport.update({
    path: '/catalog/',
    getParentRoute: () => AuthenticatedRoute,
  })

const AuthenticatedcatalogCatalogSearchRoute =
  AuthenticatedcatalogCatalogSearchImport.update({
    path: '/catalog/search',
    getParentRoute: () => AuthenticatedRoute,
  })

const AuthenticatedcatalogCatalogCatalogIdRoute =
  AuthenticatedcatalogCatalogCatalogIdImport.update({
    path: '/catalog/$catalogId',
    getParentRoute: () => AuthenticatedRoute,
  })

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticateddashboardPlannerRoute,
    AuthenticatedcatalogCatalogCatalogIdRoute,
    AuthenticatedcatalogCatalogSearchRoute,
    AuthenticatedcatalogCatalogIndexRoute,
  }),
  AboutRoute,
  ContactRoute,
  SignInRoute,
  SignUpRoute,
  homeIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/_authenticated",
        "/about",
        "/contact",
        "/sign-in",
        "/sign-up",
        "/"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.jsx",
      "children": [
        "/_authenticated/planner",
        "/_authenticated/catalog/$catalogId",
        "/_authenticated/catalog/search",
        "/_authenticated/catalog/"
      ]
    },
    "/about": {
      "filePath": "about.jsx"
    },
    "/contact": {
      "filePath": "contact.jsx"
    },
    "/sign-in": {
      "filePath": "sign-in.jsx"
    },
    "/sign-up": {
      "filePath": "sign-up.jsx"
    },
    "/": {
      "filePath": "(home)/index.jsx"
    },
    "/_authenticated/planner": {
      "filePath": "_authenticated/(dashboard)/planner.jsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/catalog/$catalogId": {
      "filePath": "_authenticated/(catalog)/catalog.$catalogId.jsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/catalog/search": {
      "filePath": "_authenticated/(catalog)/catalog.search.jsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/catalog/": {
      "filePath": "_authenticated/(catalog)/catalog.index.jsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
