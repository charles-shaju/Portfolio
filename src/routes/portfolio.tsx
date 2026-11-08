import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/pages/Portfolio";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead({
      title: "Portfolio",
      description:
        "Six marine robotics, autonomous systems and embedded hardware projects by Charles Shaju, including a field-tested underwater ROV, ROS 2 mobile robot and AquaScanner catamaran.",
      path: "/portfolio",
    }),
  component: Portfolio,
});
