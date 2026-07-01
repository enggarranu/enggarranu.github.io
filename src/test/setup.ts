import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  value: IntersectionObserverMock,
  writable: true,
});

Object.defineProperty(window, "matchMedia", {
  value: (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    };
  },
  writable: true,
});
