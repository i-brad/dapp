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


const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

export function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        //${hours}:${minutes}
        return `${prefomattedDate} at ${date.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
        })}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        //${hours}:${minutes}
        return `${day} ${month} at ${date.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
        })}`;
    }

    // 10. January 2017. at 10:20
    //${hours}:${minutes}
    return `${day} ${month} ${year} at ${date.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
    })}`;
}

//Credit: https://muffinman.io/blog/javascript-time-ago-function/
// --- Main function
export function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return "now";
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return "about a minute ago";
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, "Today"); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}