import React from 'react';

const parseCaption = (caption: string): React.ReactNode => {
  if (!caption) return null;

  // Split on whitespace but preserve words for mapping
  const parts = caption.split(/\s+/);

  return parts.map((word, idx) => {
    const isLast = idx === parts.length - 1;
    const key = `caption-${idx}`;

    if (word.startsWith('@')) {
      const mention = word.slice(1);
      return (
        <React.Fragment key={key}>
          <a href={`https://instagram.com/${mention}`} className="text-blue-500 hover:underline">@{mention}</a>
          {!isLast && ' '}
        </React.Fragment>
      );
    }

    if (word.startsWith('#')) {
      const tag = word.slice(1);
      return (
        <React.Fragment key={key}>
          <a href={`https://instagram.com/explore/tags/${tag}`} className="text-green-500 hover:underline">#{tag}</a>
          {!isLast && ' '}
        </React.Fragment>
      );
    }

    // Plain text (preserve spacing)
    return (
      <React.Fragment key={key}>
        {word}{!isLast && ' '}
      </React.Fragment>
    );
  });
};

export { parseCaption };
