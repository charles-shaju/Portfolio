import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Charles Shaju — Robotics & Embedded Systems Engineer",
      description:
        "Robotics and embedded systems engineer with two years of marine robotics on real dams: PID-tuned autonomous surface vessels and underwater ROVs. Now building ROS 2, perception and control skills.",
      path: "/",
    }),
  component: Index,
});
