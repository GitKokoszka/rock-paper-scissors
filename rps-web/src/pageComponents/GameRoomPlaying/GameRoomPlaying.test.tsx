import "@testing-library/jest-dom/extend-expect";
import { render } from "test-utils";
import GameRoomPlaying from "./GameRoomPlaying";

it("Should render with no errors", () => {
  render(<GameRoomPlaying />);
});
