import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectDetail from "@/pages/ProjectDetail";
import { getProjectBySlug } from "@/data/projects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? pageHead({
          title: loaderData.project.title,
          description: loaderData.project.description,
          path: `/project/${params.slug}`,
          image: loaderData.project.coverImage,
          type: "article",
        })
      : {},
  component: ProjectDetail,
});
