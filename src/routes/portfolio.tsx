import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/pages/Portfolio";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      title: "Portfolio",
      description:
        "Robotics, IoT and embedded systems projects by Charles Shaju: underwater ROV, autonomous catamaran, smart altimeter, GPS tracker, LoRa mesh and more.",
      path: "/portfolio",
    }),
  component: Portfolio,
});
