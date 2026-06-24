/**
 * Formats a date string into DD MMM YYYY (e.g., 01 Jan 2024)
 * @param {string|Date} date - The date to format
 */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/**
 * Calculates total inclusive days between dates
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 */
const getLeaveDays = (startDate, endDate) => {
  // Convert difference from ms to days, add 1 for inclusive count
  return (
    Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    ) + 1
  );
};

export { formatDate, getLeaveDays };
