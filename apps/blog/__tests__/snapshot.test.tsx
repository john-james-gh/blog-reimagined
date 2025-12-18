import { render } from "@testing-library/react";
import Page from "../app/page";

jest.mock("next-sanity", () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(() => Promise.resolve([])),
  })),
  defineQuery: jest.fn((query) => query),
}));

describe("Snapshots", () => {
  it("renders homepage unchanged", async () => {
    const page = await Page();
    const { container } = render(page);
    expect(container).toMatchSnapshot();
  });
});
