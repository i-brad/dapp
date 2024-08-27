import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = (value, fractionDigits = 0, currency = "") => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  }).format(value);
  return formatted.replace(currency, "");
};

export function shortenAddress(address) {
  if (address.length < 10) {
    // If the address is too short to be shortened, return it as is
    return address;
  }

  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}.....${end}`;
}

export const isMobileWidth = (width = 640) =>
  window.matchMedia(`(max-width:${width}px)`).matches;

export function formatNumber(number) {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return number.toLocaleString();
  }
}

export function formatDuration(createdDateString, dateString) {
  const targetDate = new Date(dateString);
  const now = new Date(createdDateString);

  // Calculate the total difference in milliseconds
  const totalMilliseconds = targetDate.getTime() - now.getTime();

  // Convert milliseconds to days, hours, and minutes
  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(totalMilliseconds / millisecondsInDay);
  const hours = Math.floor(
    (totalMilliseconds % millisecondsInDay) / millisecondsInHour
  );
  const minutes = Math.floor(
    (totalMilliseconds % millisecondsInHour) / millisecondsInMinute
  );

  // Format the result
  const dayStr = days > 0 ? `${days}d` : "";
  const hourStr = hours > 0 ? `${hours}h` : "";
  const minuteStr = minutes > 0 ? `${minutes}m` : "";

  // Combine the parts, filtering out empty strings and joining with commas
  return [dayStr, hourStr, minuteStr].filter(Boolean).join(", ");
}

export function calculateCompletionPercentage(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Calculate the total duration between the start and end dates
  const totalDuration = end.getTime() - start.getTime();

  // Calculate the duration between the start date and today
  const completedDuration = today.getTime() - start.getTime();

  // Calculate the percentage of completion
  const percentage = (completedDuration / totalDuration) * 100;

  // Cap the percentage between 0% and 100%
  const cappedPercentage = Math.min(Math.max(percentage, 0), 100);

  return cappedPercentage;
}

export function formDataToObject(formData) {
  const object = {};

  formData.forEach((value, key) => {
    object[key] = value;
  });

  return object;
}
