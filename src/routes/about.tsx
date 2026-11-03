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
      image: "https://charles-shaju.lovable.app/__l5e/assets-v1/58868d79-c7a8-42b9-91ac-97e4d58a2a2e/charles-portrait.png",
      type: "profile",
    }),
  component: About,
});
