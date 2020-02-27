import pokepediaFacadeService from "@/core/api/PokepediaFacadeService";

import { env } from "@/environment";

jest.mock("@/environment", () => ({
  env: {
    apiUrl: "http://fake-api-url"
  }
}));

const mockResponse = {
  json: jest.fn()
};

const mockFetch = () => Promise.resolve(mockResponse);

describe("PokepediaFacadeService", () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(mockFetch);
  });

  it("should make a get request", async () => {
    const endpoint = "my-fake-endpoint";

    await pokepediaFacadeService.get(endpoint);

    expect(window.fetch).toHaveBeenCalledWith(`${env.apiUrl}/${endpoint}`);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
