import { render, screen, fireEvent } from "@testing-library/react";
import FilterContainer from "./FilterContainer";

type FilterButtonProps = {
    src: string;
    name: string;
    onToggle: (name: string, state: number) => void;
};
  
jest.mock("./FilterButton", () => ({ src, name, onToggle }: FilterButtonProps) => (
    <button data-testid={`filter-button-${name}`} onClick={() => onToggle(name, 1)}>
        {name}
    </button>
));

describe("FilterContainer", () => {
    it("renders all filter buttons", () => {
        render(<FilterContainer onToggle={jest.fn()} />);
        
        const filterNames = [
            "Fire", "Plant", "Earth", "Cold", "Air", 
            "Lightning", "Water", "Metal", "Light", "Dark"
        ];
    
        filterNames.forEach(name => {
            expect(screen.getByTestId(`filter-button-${name}`)).toBeInTheDocument();
        });
    });

    it("calls onToggle with the correct arguments when a button is clicked", () => {
        const mockOnToggle = jest.fn();
        render(<FilterContainer onToggle={mockOnToggle} />);

        const fireButton = screen.getByTestId("filter-button-Fire");
        fireEvent.click(fireButton!);

        expect(mockOnToggle).toHaveBeenCalledWith("Fire", 1);
    });
});