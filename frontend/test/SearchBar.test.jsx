import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/ui/SearchBar';
import { jest } from '@jest/globals';

describe('SearchBar', () => {
  test('renders the search input', () => {
    const setSearchTerm = jest.fn();
    
    render(
      <SearchBar 
        searchTerm="" 
        setSearchTerm={setSearchTerm} 
        suggestions={[]}
      />
    );
    
    const input = screen.getByPlaceholderText(/search for a country/i);
    expect(input).toBeInTheDocument();
  });
  
  test('updates search term on input change', () => {
    const setSearchTerm = jest.fn();
    
    render(
      <SearchBar 
        searchTerm="" 
        setSearchTerm={setSearchTerm} 
        suggestions={[]}
      />
    );
    
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'canada' } });
    
    expect(setSearchTerm).toHaveBeenCalledWith('canada');
  });
  
  test('shows clear button when search term exists', () => {
    const setSearchTerm = jest.fn();
    
    render(
      <SearchBar 
        searchTerm="canada" 
        setSearchTerm={setSearchTerm} 
        suggestions={[]}
      />
    );
    
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(setSearchTerm).toHaveBeenCalledWith('');
  });
  
  test('shows suggestions when focused and suggestions exist', async () => {
    const setSearchTerm = jest.fn();
    const suggestions = ['Canada', 'Cambodia', 'Cameroon'];
    
    render(
      <SearchBar 
        searchTerm="ca" 
        setSearchTerm={setSearchTerm} 
        suggestions={suggestions}
      />
    );
    
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.focus(input);
    
    // Wait for suggestions to appear
    const suggestionItems = await screen.findAllByRole('listitem');
    expect(suggestionItems).toHaveLength(3);
    
    // Click on a suggestion
    fireEvent.click(suggestionItems[0]);
    expect(setSearchTerm).toHaveBeenCalledWith('Canada');
  });
});
