import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "./FilterButton";

describe("FilterButton", () => {
  it("renders with the correct initial state", () => {
    render(
      <FilterButton
        src="/test.png"
        name="Test"
        state={0}
        onToggle={jest.fn()}
      />
    );

    const button = screen.getByText("Test").parentElement;
    expect(button).toHaveStyle("background-color: rgb(139, 139, 139)");
  });

  it("calls onToggle with the correct arguments on click", () => {
    const mockOnToggle = jest.fn();
    render(
      <FilterButton
        src="/test.png"
        name="Test"
        state={0}
        onToggle={mockOnToggle}
      />
    );

    const button = screen.getByText("Test").closest(".filter-button");
    fireEvent.click(button!);

    expect(mockOnToggle).toHaveBeenCalledWith("Test", 1);
  });

  it("cycles through states correctly", () => {
    let currentValue = 0;
    const mockOnToggle = jest.fn((_, newValue) => {
      currentValue = newValue;
    });

    const { rerender } = render(
      <FilterButton
        src="/test.png"
        name="Test"
        state={currentValue}
        onToggle={mockOnToggle}
      />
    );

    const button = screen.getByText("Test").closest(".filter-button");

    // Click to state 1
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 1);
    rerender(
      <FilterButton
        src="/test.png"
        name="Test"
        state={1}
        onToggle={mockOnToggle}
      />
    );
    expect(button).toHaveStyle("background-color: green");

    // Click to state 2
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 2);
    rerender(
      <FilterButton
        src="/test.png"
        name="Test"
        state={2}
        onToggle={mockOnToggle}
      />
    );
    expect(button).toHaveStyle("background-color: rgb(172, 0, 0)");

    // Click to state 0
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 0);
    rerender(
      <FilterButton
        src="/test.png"
        name="Test"
        state={0}
        onToggle={mockOnToggle}
      />
    );
    expect(button).toHaveStyle("background-color: rgb(139, 139, 139)");
  });
});