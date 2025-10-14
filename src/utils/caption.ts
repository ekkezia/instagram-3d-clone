const parseCaption = (caption: string) => {
  // Simple parser to identify hashtags and mentions
  const words = caption.split(' ');
  for (let word of words) {
    if (word.startsWith('@')) {
      // Handle mentions
      const mention = word.slice(1); // Remove the '@' symbol
      // Add a link or style to the mention (e.g., underline, color)
      word = `<a href="https://instagram.com/${mention}" className="text-blue-500 hover:underline">@${mention}</a>`;
    } else if (word.startsWith('#')) {
      // Handle hashtags
      const hashtag = word.slice(1); // Remove the '#' symbol
      // Add a link or style to the hashtag (e.g., underline, color)
      word = `<a href="https://instagram.com/explore/tags/${hashtag}" className="text-green-500 hover:underline">#${hashtag}</a>`;
    } // else, it's a regular word  
  }
  return words.join(' ');
}

export { parseCaption };