import ContainerBox from "@/components/ui/container-box";
import StatsTable from "@/features/stats/components/stats-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/app/stats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContainerBox className="flex flex-1 justify-center items-center">
      <StatsTable />
    </ContainerBox>
  );
}
