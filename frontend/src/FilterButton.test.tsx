import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "./FilterButton";

describe("FilterButton", () => {
  it("renders with the correct initial state", () => {
    render(<FilterButton src="/test.png" name="Test" onToggle={jest.fn()} />);
    
    const button = screen.getByText("Test").parentElement;
    expect(button).toHaveStyle("background-color: rgb(139, 139, 139)");
  });

  it("calls onToggle with the correct arguments on click", () => {
    const mockOnToggle = jest.fn();
    render(<FilterButton src="/test.png" name="Test" onToggle={mockOnToggle} />);
    
    const button = screen.getByText("Test").closest(".filter-button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button!);
    
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 1);
  });

  it("cycles through states correctly", () => {
    const mockOnToggle = jest.fn();
    render(<FilterButton src="/test.png" name="Test" onToggle={mockOnToggle} />);
    
    const button = screen.getByText("Test").closest(".filter-button");
    expect(button).toBeInTheDocument();

    // Click to state 1
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 1);
    expect(button).toHaveStyle("background-color: green");

    // Click to state 2
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 2);
    expect(button).toHaveStyle("background-color: rgb(172, 0, 0)");

    // Click to state 0
    fireEvent.click(button!);
    expect(mockOnToggle).toHaveBeenCalledWith("Test", 0);
    expect(button).toHaveStyle("background-color: rgb(139, 139, 139)");
  });
});