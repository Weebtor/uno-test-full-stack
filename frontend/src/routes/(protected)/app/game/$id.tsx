import ContainerBox from "@/components/ui/container-box";
import LoadingScreen from "@/features/auth/components/loading-screen";
import GameBoard from "@/features/game/components/game-board";
import { useGetGameById } from "@/features/game/hooks/use-get-game-by-id";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/app/game/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isFetching } = useGetGameById(id);

  if (isFetching || !id) return <LoadingScreen />;

  if (!data) return <Navigate to="/app/stats" />;

  return (
    <ContainerBox className="flex flex-1 justify-center items-center">
      <GameBoard {...data} />
    </ContainerBox>
  );
}
