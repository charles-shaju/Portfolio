import { useEffect, type ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { PageTransition } from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { useLocation } from "@/lib/router-compat";
import appCss from "../styles.css?url";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Charles Shaju",
  jobTitle: "Embedded Systems Engineer",
  url: "https://charles-shaju.lovable.app/",
  image: "https://charles-shaju.lovable.app/og-image.jpg",
  email: "mailto:charlesshaju00@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kalamassery, Cochin",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: "Rajagiri College of Social Science",
  worksFor: { "@type": "Organization", name: "i4 Marine Technologies" },
  knowsAbout: ["Embedded Systems", "IoT", "Robotics", "Autonomous Marine Vehicles", "Machine Learning", "ESP32", "Raspberry Pi", "Pixhawk", "ArduPilot"],
  sameAs: [
    "https://linkedin.com/in/charles-shaju",
    "https://github.com/charles-shaju",
    "https://x.com/Mr__CS",
    "https://medium.com/@charles-shaju",
    "https://instagram.com/charles_shaju",
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Charles Shaju — Embedded Systems Engineer | IoT & Robotics" },
      {
        name: "description",
        content:
          "Portfolio of Charles Shaju, Embedded Systems Engineer specializing in IoT, robotics, autonomous marine vehicles, and AI-driven hardware. Published patent application (under examination), MCA student, based in Kerala, India.",
      },
      { name: "author", content: "Charles Shaju" },
      {
        name: "keywords",
        content:
          "Charles Shaju, embedded systems engineer, IoT developer, robotics engineer, ESP32, Raspberry Pi, Pixhawk, ArduPilot, autonomous marine vehicles, ROV, ASV, embedded AI, Kerala, India",
      },
      { property: "og:site_name", content: "Charles Shaju" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Mr__CS" },
      { name: "twitter:creator", content: "@Mr__CS" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Work+Sans:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: RootError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AnimatedOutlet() {
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        <Outlet />
      </PageTransition>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SkipToContent />
            <Layout>
              <AnimatedOutlet />
            </Layout>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-xl">This page didn't load</h1>
        <p className="mb-6 text-muted-foreground">Something went wrong. Try again or head back home.</p>
        <div className="flex justify-center gap-2">
          <button
            className="rounded bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className="rounded border border-border px-4 py-2">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
