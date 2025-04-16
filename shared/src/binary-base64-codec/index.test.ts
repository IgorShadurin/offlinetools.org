import { encodeBinaryBase64, decodeBinaryBase64, BinaryBase64Options } from "./index"

describe("Binary Base64 Codec", () => {
  // Test binary data (a simple text string converted to Uint8Array for testing)
  const testData = new TextEncoder().encode("Hello, World!")
  const expectedBase64 = "SGVsbG8sIFdvcmxkIQ=="
  const expectedBase64UrlSafe = "SGVsbG8sIFdvcmxkIQ=="

  // Test with a more complex binary data that would include characters that need URL-safe encoding
  const complexData = new Uint8Array([
    255, 254, 253, 252, 251, 250, 249, 248, // binary data with values that result in +/= in base64
    128, 64, 32, 16, 8, 4, 2, 1
  ])
  const complexBase64 = "/v79/Pv6+fg="
  const complexBase64UrlSafe = "__79_Pv6-fiAQCAQCAQCAQ=="

  describe("encodeBinaryBase64", () => {
    it("should correctly encode binary data to Base64", () => {
      const result = encodeBinaryBase64(testData)
      expect(result).toBe(expectedBase64)
    })

    it("should handle ArrayBuffer input", () => {
      const arrayBuffer = testData.buffer
      const result = encodeBinaryBase64(arrayBuffer)
      expect(result).toBe(expectedBase64)
    })

    it("should correctly encode binary data with URL-safe option", () => {
      const result = encodeBinaryBase64(complexData, { urlSafe: true })
      expect(result).toBe(complexBase64UrlSafe)
    })

    it("should handle empty input", () => {
      const emptyData = new Uint8Array(0)
      const result = encodeBinaryBase64(emptyData)
      expect(result).toBe("")
    })
  })

  describe("decodeBinaryBase64", () => {
    it("should correctly decode Base64 to binary data", () => {
      const result = decodeBinaryBase64(expectedBase64)
      expect(new TextDecoder().decode(result)).toBe("Hello, World!")
    })

    it("should correctly decode URL-safe Base64", () => {
      const simpleData = new Uint8Array([123, 456 % 256, 789 % 256])
      const encoded = encodeBinaryBase64(simpleData, { urlSafe: true })
      const decoded = decodeBinaryBase64(encoded, { urlSafe: true })
      
      expect(Array.from(decoded)).toEqual(Array.from(simpleData))
    })

    it("should handle empty input", () => {
      const result = decodeBinaryBase64("")
      expect(result.length).toBe(0)
    })

    it("should throw error for invalid Base64", () => {
      expect(() => {
        decodeBinaryBase64("Invalid!@#$%^")
      }).toThrow("Binary Base64 decoding failed")
    })
  })

  describe("Round-trip conversion", () => {
    it("should maintain data integrity through encode and decode", () => {
      const options: BinaryBase64Options = { urlSafe: false }
      
      // Encode then decode
      const encoded = encodeBinaryBase64(testData, options)
      const decoded = decodeBinaryBase64(encoded, options)
      
      // Compare original and round-tripped data
      expect(Array.from(decoded)).toEqual(Array.from(testData))
    })

    it("should maintain data integrity with URL-safe option", () => {
      const options: BinaryBase64Options = { urlSafe: true }
      
      // Create a simpler test array that's more predictable
      const simpleData = new Uint8Array([1, 2, 3, 4, 5])
      
      // Encode then decode with URL-safe option
      const encoded = encodeBinaryBase64(simpleData, options)
      const decoded = decodeBinaryBase64(encoded, options)
      
      // Compare original and round-tripped data
      expect(Array.from(decoded)).toEqual(Array.from(simpleData))
    })
  })
}) 