/**
 * Format a date into `YYYY-MM-DD` or `YYYY-MM-DD HH:mm`.
 *
 * @param {string | Date} date - The date to format (can be a Date object or a valid date string).
 * @param {boolean} [includeTime=false] - Whether to include hours and minutes in the output.
 * @returns {string} A formatted date string.
 *
 * @example
 * dateFormat("2025-08-17"); // "2025-08-17"
 * dateFormat(new Date(), true); // "2025-08-17 14:30"
 */
export const dateFormat = (
  date: string | Date,
  includeTime: boolean = false
): string => {
  const newDate = new Date(date);

  const addZero = (num: number) => num.toString().padStart(2, "0");

  const formattedDate = `${newDate.getFullYear()}-${addZero(
    newDate.getMonth() + 1
  )}-${addZero(newDate.getDate())}`;

  if (includeTime) {
    return `${formattedDate} ${addZero(newDate.getHours())}:${addZero(
      newDate.getMinutes()
    )}`;
  }

  return formattedDate;
};
