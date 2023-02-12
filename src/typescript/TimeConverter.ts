// All values in constants described in milliseconds
export const MS_ONE_SECOND = 1000;
export const MS_ONE_MINUTE = 60_000;
export const MS_ONE_HOUR = 3_600_000;

// From seconds, minutes, hours -> milliseconds
export const secondToMillisecond = (seconds: number) => seconds * MS_ONE_SECOND;
export const minuteToMillisecond = (minutes: number) => minutes * MS_ONE_MINUTE;
export const hourToMillisecond = (hours: number) => hours * MS_ONE_HOUR;

// From milliseconds -> seconds, minutes, hours
export const millisecondToSecond = (milliseconds: number) => Math.floor(milliseconds / MS_ONE_SECOND);
export const millisecondToMinute = (milliseconds: number) => Math.floor(milliseconds / MS_ONE_MINUTE);
export const millisecondToHour = (milliseconds: number) => Math.floor(milliseconds / MS_ONE_HOUR);