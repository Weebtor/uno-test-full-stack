import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoriceCard } from "./memorice-card";
import type { PublicCardModel } from "../types/card.types";

const { emitMock, mutateMock } = vi.hoisted(() => {
  return {
    emitMock: vi.fn(),
    mutateMock: vi.fn(),
  };
});

vi.mock("@/components/ui/spinner", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

vi.mock("../hooks/use-reveal-card", () => ({
  useRevealCard: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

vi.mock("@/lib/EventEmmiter/EventEmitter", () => ({
  default: {
    emit: emitMock,
  },
}));

vi.mock("@/lib/EventEmmiter/hooks/use-event-listener", () => ({
  default: vi.fn(),
}));

const mockCard: PublicCardModel = {
  id: "1",
  title: "Fox",
  imageUrl: "https://example.com/fox.png",
  position: 0,
  status: "hidden",
};

describe("MemoriceCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the card hidden initially", () => {
    const { container } = render(<MemoriceCard card={mockCard} />);

    expect(screen.getByText("1")).toBeInTheDocument();

    const inner = container.querySelector(".transform-3d");
    expect(inner?.className).not.toContain("rotate-y-180");
  });
  it("reveals the card when clicked and calls revealCard", () => {
    render(<MemoriceCard card={mockCard} />);

    fireEvent.click(screen.getByText("1"));

    expect(mutateMock).toHaveBeenCalledTimes(1);
  });

  it("emits events for updated cards on success", () => {
    render(<MemoriceCard card={mockCard} />);

    fireEvent.click(screen.getByText("1"));

    const onSuccess = mutateMock.mock.calls[0][1].onSuccess;

    onSuccess({
      cards: [
        { ...mockCard, id: "1", status: "revealed" },
        { ...mockCard, id: "2", status: "hidden" },
      ],
      game: {} as any,
    });

    expect(emitMock).toHaveBeenCalledWith(
      "cards-updated-1",
      expect.objectContaining({ id: "1" })
    );

    expect(emitMock).toHaveBeenCalledWith(
      "cards-updated-2",
      expect.objectContaining({ id: "2" })
    );
  });
});
