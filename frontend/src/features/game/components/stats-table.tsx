import React, { useMemo } from "react";
import useGetStats from "../hooks/use-get-stats";
import DataTable from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { GameModel } from "../types/game.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const StatsTable = () => {
  const { data, isLoading } = useGetStats();
  const colums: ColumnDef<GameModel>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        header: "Cartas",
        accessorKey: "totalCards",
      },
      {
        header: "Movimientos",
        accessorKey: "moves",
      },
      {
        header: "Errores",
        accessorKey: "errors",
      },
      {
        header: "Ver",
        accessorKey: "id",
        cell: ({ getValue }) => (
          <Button asChild>
            <Link to="/app/game/$id" params={{ id: getValue() as string }}>
              Ir
            </Link>
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <Card>
      <CardContent>
        <DataTable columns={colums} data={data || []} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default StatsTable;
