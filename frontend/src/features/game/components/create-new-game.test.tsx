import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateNewGame from "./create-new-game";

const { mutateMock, navigateMock } = vi.hoisted(() => {
  return {
    mutateMock: vi.fn(),
    navigateMock: vi.fn(),
  };
});

vi.mock("../hooks/use-create-new-game", () => ({
  useCreateNewGame: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h1>{children}</h1>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select
      data-testid="select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: () => null,
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectGroup: ({ children }: any) => <>{children}</>,
  SelectLabel: ({ children }: any) => <span>{children}</span>,
  SelectItem: ({ children, value }: any) => (
    <option value={value}>{children}</option>
  ),
}));

// Mock del ícono
vi.mock("lucide-react", () => ({
  Play: () => <span data-testid="play-icon" />,
}));

// ------------------ Tests ------------------

describe("CreateNewGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title and button", () => {
    render(<CreateNewGame />);

    expect(screen.getByText("Iniciar nuevo juego")).toBeInTheDocument();
    expect(screen.getByText("Iniciar juego nuevo")).toBeInTheDocument();
  });

  it("changes totalCards when selecting another option", () => {
    render(<CreateNewGame />);

    const select = screen.getByTestId("select");

    // Valor inicial = options[2] = 8
    expect(select).toHaveValue("8");

    fireEvent.change(select, { target: { value: "12" } });

    expect(select).toHaveValue("12");
  });

  it("calls createNewGame with selected totalCards", () => {
    render(<CreateNewGame />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "10" } });

    fireEvent.click(screen.getByText("Iniciar juego nuevo"));

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith(
      { totalCards: 10 },
      expect.any(Object)
    );
  });

  it("navigates to /app/game on success", () => {
    render(<CreateNewGame />);

    fireEvent.click(screen.getByText("Iniciar juego nuevo"));

    const onSuccess = mutateMock.mock.calls[0][1].onSuccess;

    onSuccess();

    expect(navigateMock).toHaveBeenCalledWith({ to: "/app/game" });
  });
});
