import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  validationPattern?: string;
};

export function TagInput({
  value = [],
  onChange,
  placeholder,
  validationPattern
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!value.includes(inputValue)) {
        onChange([...value, inputValue]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const validateTag = (tag: string) => {
    if (!validationPattern) return true;
    return new RegExp(validationPattern).test(tag);
  };

  return (
    <div>
      <div className='mb-2 flex flex-wrap gap-1'>
        {value.map((tag) => {
          const isValid = validateTag(tag);
          return (
            <Badge key={tag} variant={isValid ? 'secondary' : 'destructive'}>
              {tag}
              <button
                type='button'
                className='hover:bg-muted ml-1 rounded-full outline-none'
                onClick={() => removeTag(tag)}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          );
        })}
      </div>
      <Input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
}
