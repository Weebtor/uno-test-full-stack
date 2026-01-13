import { queryClient } from "@/common/providers/query-client";
import ContainerBox from "@/components/ui/container-box";
import CreateNewGame from "@/features/game/components/new-game-button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(protected)/app/game/new")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["get-current-game"] });
  }, []);
  return (
    <ContainerBox className="flex flex-1 justify-center items-center">
      <CreateNewGame />
    </ContainerBox>
  );
}
