import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('devrait afficher le logo', () => {
    renderNavbar();
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('devrait afficher les liens de navigation', () => {
    renderNavbar();
    expect(screen.getByText(/accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/projets/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('devrait avoir des liens fonctionnels', () => {
    renderNavbar();
    const homeLink = screen.getByRole('link', { name: /accueil/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
