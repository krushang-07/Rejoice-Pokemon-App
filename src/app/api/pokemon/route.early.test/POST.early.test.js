import { OpenAI } from "openai";
import { POST } from "../route";

// Mocking the necessary functions
jest.mock("openai", () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      };
    }),
  };
});

jest.mock("../../../../helper/chatHelper", () => {
  return {
    extractPokemonName: () => "Pikachu",
    fetchPokemonDetails: () => ({ type: "Electric", abilities: ["Static"] }),
    fetchPokemonImage: () => "http://example.com/pikachu.png",
  };
});

describe("POST() POST method", () => {
  let openaiMock;

  beforeEach(() => {
    openaiMock = new OpenAI();
  });

  describe("Happy paths", () => {
    it("should return a successful response with valid prompt", async () => {
      // Arrange
      const req = {
        json: async () => ({ prompt: "Tell me about Pikachu" }),
      };
      openaiMock.chat.completions.create.mockResolvedValue({
        choices: [
          { message: { content: "Pikachu is an Electric-type Pokémon." } },
        ],
      });

      // Act
      const response = await POST(req);
      const responseData = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(responseData.response).toBe(
        "Pikachu is an Electric-type Pokémon."
      );
      expect(responseData.imageUrl).toBe("http://example.com/pikachu.png");
      expect(responseData.additionalData).toEqual({
        type: "Electric",
        abilities: ["Static"],
      });
    });
  });

  describe("Edge cases", () => {
    it("should return a 400 error if prompt is missing", async () => {
      // Arrange
      const req = {
        json: async () => ({}),
      };

      // Act
      const response = await POST(req);
      const responseData = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(responseData.error).toBe("Prompt is required");
    });

    it("should return a 500 error if OpenAI API fails", async () => {
      // Arrange
      const req = {
        json: async () => ({ prompt: "Tell me about Pikachu" }),
      };
      openaiMock.chat.completions.create.mockRejectedValue(
        new Error("API Error")
      );

      // Act
      const response = await POST(req);
      const responseData = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(responseData.error).toBe("Internal Server Error");
    });
  });
});
