import { render, screen } from "@testing-library/react";
import ElementsDisplay from "./ElementsDisplay";

type ElementIconProps = {
    src: string;
    name: string;
};

jest.mock("./ElementIcon", () => ({ src, name }: ElementIconProps) => (
    <div data-testid={`element-icon-${name}`}>
        <img src={src} alt={name} />
    </div>
));

describe("ElementsDisplay", () => {
    const elementIcons = {
        Fire: "/fire.png",
        Water: "/water.png",
        Earth: "/earth.png",
        Air: "/air.png",
    };

    it("renders all element icons", () => {
        render(<ElementsDisplay elements={["Fire", "Water", "Earth", "Air"]} elementIcons={elementIcons} />);

        const fireIcon = screen.getByTestId("element-icon-Fire");
        const waterIcon = screen.getByTestId("element-icon-Water");
        const earthIcon = screen.getByTestId("element-icon-Earth");
        const airIcon = screen.getByTestId("element-icon-Air");

        expect(fireIcon).toBeInTheDocument();
        expect(waterIcon).toBeInTheDocument();
        expect(earthIcon).toBeInTheDocument();
        expect(airIcon).toBeInTheDocument();
    });
});