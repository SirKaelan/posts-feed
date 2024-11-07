export const truncateText = (text: string, charLimit: number): string => {
  return text.length > charLimit
    ? text.substring(0, charLimit).trim() + "..."
    : text;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
