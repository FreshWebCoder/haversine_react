import { getCities, calculateDistance } from "./index";

describe("API test", () => {
  it("Test success case of getCities API", () => {
    return expect(getCities('te')).resolves.toEqual(['Nantes']);
  });

  it("Test failure case of getCities API", () => {
    return expect(getCities('fail')).rejects.toBe('Bad request');
  });

  it("Test success case of calculateDistance API", () => {
    // 639012.5013871341
    return expect(calculateDistance(['Paris', 'Aix-en-Provence'])).resolves.toEqual([639012.5013871341]);
  });

  it("Test failure case of calculateDistance API", () => {
    return expect(calculateDistance(['Paris', 'Lyon', 'Dijon', 'Rennes'])).rejects.toBe('Bad request');
  });
});