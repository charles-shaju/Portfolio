import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description:
        "About Charles Shaju — robotics and embedded systems engineer at i4 Marine Technologies, MCA student, co-inventor on a published patent application (under examination).",
      path: "/about",
      image: "https://charles-shaju.github.io/assets/media/Charles-Shaju.jpeg",
      type: "profile",
    }),
  component: About,
});
