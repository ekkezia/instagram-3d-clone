function formatTimeAgo(createdAt: unknown) {
  if (!createdAt) return 'just now';

  let date: Date | null = null; 
  if (createdAt instanceof Date) date = createdAt;
  else if (typeof createdAt === 'string' || typeof createdAt === 'number') {
    const parsed = new Date(createdAt as string | number);
    if (!isNaN(parsed.getTime())) date = parsed;
  }

  if (!date) return 'just now';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export { formatTimeAgo };