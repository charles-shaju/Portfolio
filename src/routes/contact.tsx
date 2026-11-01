import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description:
        "Get in touch with Charles Shaju about robotics and embedded systems roles, collaborations and projects. Based in Kochi, Kerala, India.",
      path: "/contact",
    }),
  component: Contact,
});
