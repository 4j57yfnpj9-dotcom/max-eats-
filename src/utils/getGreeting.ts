// Pure function: given an hour of the day, return the right greeting.
// Takes an optional `hour` argument (instead of always reading the clock
// itself) so it's easy to call with a fixed value later if needed.
export function getGreeting(hour: number = new Date().getHours()): string {
  if (hour < 12) return 'Good morning,';
  if (hour < 18) return 'Good afternoon,';
  return 'Good evening,';
}
