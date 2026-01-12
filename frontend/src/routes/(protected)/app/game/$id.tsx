import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/app/game/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = useParams({ strict: false });
  return (
    <div>
      Hello "/(protected)/app/game/$id"!
      {JSON.stringify(data)}
    </div>
  );
}
