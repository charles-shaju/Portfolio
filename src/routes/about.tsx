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
      image: "https://charles-shaju.lovable.app/__l5e/assets-v1/78bc6133-c27d-4c5b-97ac-532115674562/professional-black-background-portrait.png",
      type: "profile",
    }),
  component: About,
});
