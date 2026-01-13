import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameBoard from "./game-board";

// Mock del componente hijo MemoriceCard
vi.mock("./memorice-card", () => ({
  MemoriceCard: ({ card }: any) => (
    <div data-testid="memorice-card">{card.id}</div>
  ),
}));

// Mock de Link de TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("GameBoard", () => {
  const mockGame = {
    id: "game-1",
    moves: 5,
    errors: 2,
    status: "in_progress",
  };

  const mockCards = [
    { id: "card-1", name: "Fox", image: "fox.png", status: "hidden" },
    { id: "card-2", name: "Cat", image: "cat.png", status: "hidden" },
    { id: "card-3", name: "Dog", image: "dog.png", status: "hidden" },
  ];

  it("renders game stats (moves and errors)", () => {
    render(<GameBoard game={mockGame as any} cards={mockCards as any} />);

    expect(screen.getByText(/Movimientos: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Errores: 2/i)).toBeInTheDocument();
  });

  it("does not show 'Felicidades!!' when game is not finished", () => {
    render(<GameBoard game={mockGame as any} cards={mockCards as any} />);

    expect(screen.queryByText(/Felicidades/i)).not.toBeInTheDocument();
  });

  it("shows 'Felicidades!!' when game is finished", () => {
    const finishedGame = { ...mockGame, status: "finished" };

    render(<GameBoard game={finishedGame as any} cards={mockCards as any} />);

    expect(screen.getByText(/Felicidades/i)).toBeInTheDocument();
  });

  it("renders all cards", () => {
    render(<GameBoard game={mockGame as any} cards={mockCards as any} />);

    const cards = screen.getAllByTestId("memorice-card");
    expect(cards).toHaveLength(3);
  });

  it("renders 'Jugar otra vez' link", () => {
    render(<GameBoard game={mockGame as any} cards={mockCards as any} />);

    const link = screen.getByText(/jugar otra vez/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("to", "/app/game/new");
  });
});
