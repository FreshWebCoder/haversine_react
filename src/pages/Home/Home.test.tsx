import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from './index';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      };
    }
  });
});

beforeEach(() => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>,
  );
})

test('Test initial render of Home page', () => {
  expect(screen.getByText(/City of origin/i)).toBeInTheDocument();
  expect(screen.getByText(/City of destination/i)).toBeInTheDocument();
  expect(screen.getByText(/Passengers/i)).toBeInTheDocument();
  expect(screen.getByText(/Date/i)).toBeInTheDocument();
});
