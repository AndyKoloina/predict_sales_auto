'use client';

import { useState, useEffect, useRef } from 'react';

type AutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
};

export default function AutocompleteInput({ label, value, onChange, suggestions }: AutocompleteProps) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    onChange(userInput);

    const filtered = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleClick = (suggestion: string) => {
    onChange(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="text-slate-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        className="w-full mt-1 p-2 bg-slate-800 border border-slate-700 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        autoComplete="off"
      />
      {showSuggestions && value && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-slate-700 border border-slate-600 rounded-md max-h-60 overflow-auto mt-1">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-cyan-500 hover:text-slate-900"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}