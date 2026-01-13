import { render, screen, within } from "@testing-library/react";
import * as statsHook from "../hooks/use-get-stats";
import { vi } from "vitest";
import StatsTable from "./stats-table";

// Mock de Link para resolver $id
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, params }: any) => {
    const href = to.replace("$id", params?.id || "");
    return <a href={href}>{children}</a>;
  },
}));

describe("StatsTable", () => {
  it("renders rows with correct data", () => {
    const mockData = [
      { id: "1", totalCards: 10, moves: 5, errors: 2 },
      { id: "2", totalCards: 8, moves: 3, errors: 1 },
    ];

    vi.spyOn(statsHook, "default").mockReturnValue({
      data: mockData,
      isLoading: false,
    } as any);

    render(<StatsTable />);

    // La tabla renderiza header + filas
    const rows = screen.getAllByRole("row");
    // El primer row normalmente es el header
    expect(rows.length).toBe(mockData.length + 1);

    // Verifica el contenido de la primera fila
    const firstRowCells = within(rows[1]).getAllByRole("cell");
    expect(firstRowCells[0]).toHaveTextContent("1");
    expect(firstRowCells[1]).toHaveTextContent("10");
    expect(firstRowCells[2]).toHaveTextContent("5");
    expect(firstRowCells[3]).toHaveTextContent("2");
    expect(within(firstRowCells[4]).getByText("Ir")).toHaveAttribute(
      "href",
      "/app/game/1"
    );
  });
});
