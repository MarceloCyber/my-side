import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

test('renders search bar', () => {
    const { container } = render(<Home />);
    console.log(container.innerHTML);
    const searchBar = screen.getByPlaceholderText(/Pesquisar.../i);
    expect(searchBar).toBeInTheDocument();
});

