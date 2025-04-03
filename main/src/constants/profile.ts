export const SHORT_TERM = "short_term";
export const MEDIUM_TERM = "medium_term";
export const LONG_TERM = "long_term";
export const TIME_RANGES = [
  { label: "Short Term", value: SHORT_TERM },
  { label: "Medium Term", value: MEDIUM_TERM },
  { label: "Long Term", value: LONG_TERM },
];

export const TIME_RANGE_DEFAULT = SHORT_TERM;
export const MAX_DISPLAY = 5; //number of artists/tracks to display on profile
export const CACHE_EXPIRY_TIME = 1000 * 60 * 30; // 30 minutes