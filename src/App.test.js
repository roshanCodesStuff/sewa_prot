import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the role selection landing page', () => {
  render(<App />);

  expect(screen.getByText(/prototype view sewa/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Go to Admin View/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Go to Worker View/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Go to Client View/i })).toBeInTheDocument();
});
