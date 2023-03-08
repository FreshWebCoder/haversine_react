import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchResults from './index';

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
    <MemoryRouter initialEntries={['/result']}>
      <Routes>
        <Route path="/result" element={<SearchResults />} />
      </Routes>
    </MemoryRouter>,
  );
})

test('Test initial render of Search Results page', () => {
  expect(document.querySelector('.anticon-loading')).toBeInTheDocument();
});