import { render, screen } from "@testing-library/react";
import ElementIcon from "./ElementIcon";

describe("ElementIcon", () => {
  it("renders the icon with the correct src and alt text", () => {
    render(<ElementIcon src="/test.png" name="Test" />);
    
    const img = screen.getByAltText("Test");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test.png");
  });

  it("renders the icon with the correct title", () => {
    render(<ElementIcon src="/test.png" name="Test" />);
    
    const icon = screen.getByTitle("Test");
    expect(icon).toBeInTheDocument();
  });
});