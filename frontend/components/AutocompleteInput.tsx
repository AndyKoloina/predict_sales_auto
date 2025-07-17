'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Propriétés du composant AutocompleteInput
 */
interface AutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
}

/**
 * Composant AutocompleteInput
 * Champ de saisie avec autocomplétion basée sur une liste de suggestions
 */
export default function AutocompleteInput({ 
  label, 
  value, 
  onChange, 
  suggestions 
}: AutocompleteProps) {
  // États locaux
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Gestion du changement de valeur dans l'input
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const userInput = e.currentTarget.value;
    onChange(userInput);

    // Filtrage des suggestions basé sur la saisie utilisateur
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  /**
   * Gestion du clic sur une suggestion
   */
  const handleSuggestionClick = (suggestion: string): void => {
    onChange(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  /**
   * Gestion du focus sur l'input
   */
  const handleInputFocus = (): void => {
    if (value && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  /**
   * Effet pour gérer les clics à l'extérieur du composant
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const shouldShowSuggestions = showSuggestions && value && filteredSuggestions.length > 0;

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Label du champ */}
      {label && (
        <label className="text-slate-400 block mb-1">
          {label}
        </label>
      )}
      
      {/* Champ de saisie */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="w-full p-2 bg-slate-800 border border-slate-700 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-slate-400"
        autoComplete="off"
        placeholder="Tapez pour rechercher..."
      />
      
      {/* Liste des suggestions */}
      {shouldShowSuggestions && (
        <ul className="absolute z-10 w-full bg-slate-700 border border-slate-600 rounded-md max-h-60 overflow-auto mt-1 shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-cyan-500 hover:text-slate-900 transition-colors duration-200"
              role="option"
              aria-selected={false}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}