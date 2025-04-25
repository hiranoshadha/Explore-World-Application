import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from '../src/contexts/ThemeContext';
import ThemeToggle from '../src/components/ui/ThemeToggle';
import { jest } from '@jest/globals';

describe('ThemeToggle', () => {
  test('renders the theme toggle button', () => {
    const toggleTheme = jest.fn();
    
    render(
      <ThemeContext.Provider value={{ darkMode: false, toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  
  test('calls toggleTheme when clicked', () => {
    const toggleTheme = jest.fn();
    
    render(
      <ThemeContext.Provider value={{ darkMode: false, toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
  
  test('displays sun icon in dark mode', () => {
    const toggleTheme = jest.fn();
    
    render(
      <ThemeContext.Provider value={{ darkMode: true, toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    // Check if the button has the correct aria-label
    const button = screen.getByRole('button', { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();
  });
  
  test('displays moon icon in light mode', () => {
    const toggleTheme = jest.fn();
    
    render(
      <ThemeContext.Provider value={{ darkMode: false, toggleTheme }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
    
    // Check if the button has the correct aria-label
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });
});
