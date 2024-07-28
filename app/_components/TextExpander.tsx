'use client'
import { useState } from 'react';
type TextExpanderProps = {
  children: string | null
}

function TextExpander({ children }:TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  if(children === null) return null;
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className='text-primary-700 border-b border-primary-700 leading-3  py-1'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}

export default TextExpander;
