import { Button } from "@/components/ui/button";
import ContainerBox from "@/components/ui/container-box";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoadingScreen from "@/features/auth/components/loading-screen";
import { useIdentity } from "@/features/auth/hooks/use-identity";
import GameBoard from "@/features/game/components/game-board";
import { useGetActiveGame } from "@/features/game/hooks/use-get-active-game";
import { Link } from "@tanstack/react-router";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Play } from "lucide-react";

export const Route = createFileRoute("/(protected)/app/game/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: game, isFetching } = useGetActiveGame();

  const { identity } = useIdentity();
  if (isFetching) return <LoadingScreen />;

  if (!game) return <Navigate to="/app/game/new" />;
  return (
    <ContainerBox className="flex flex-1 justify-center items-center">
      <Dialog open={game.game.status === "finished"}>
        <DialogContent>
          <div>
            <h2 className="text-center">Felicidades {identity?.name}!!</h2>
          </div>
          <Button asChild>
            <Link to="/app/game/new">
              <Play /> Jugar otra vez
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
      <GameBoard {...game} />
    </ContainerBox>
  );
}
