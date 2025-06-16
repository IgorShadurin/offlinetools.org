export interface TimezoneConversionOptions {
  fromTimezone: string;
  toTimezone: string;
  dateTime: Date;
}

export interface TimezoneInfo {
  id: string;
  name: string;
  offset: string;
  cities: string[];
}

export interface ConversionResult {
  originalTime: string;
  convertedTime: string;
  fromTimezone: TimezoneInfo;
  toTimezone: TimezoneInfo;
  offsetDifference: string;
}

export const POPULAR_TIMEZONES: TimezoneInfo[] = [
  {
    id: 'America/New_York',
    name: 'Eastern Time (ET)',
    offset: 'UTC-5/-4',
    cities: ['New York', 'Boston', 'Miami', 'Atlanta', 'Washington DC']
  },
  {
    id: 'America/Chicago',
    name: 'Central Time (CT)',
    offset: 'UTC-6/-5',
    cities: ['Chicago', 'Dallas', 'Houston', 'New Orleans', 'Minneapolis']
  },
  {
    id: 'America/Denver',
    name: 'Mountain Time (MT)',
    offset: 'UTC-7/-6',
    cities: ['Denver', 'Phoenix', 'Salt Lake City', 'Albuquerque']
  },
  {
    id: 'America/Los_Angeles',
    name: 'Pacific Time (PT)',
    offset: 'UTC-8/-7',
    cities: ['Los Angeles', 'San Francisco', 'Seattle', 'Las Vegas', 'San Diego']
  },
  {
    id: 'Europe/London',
    name: 'Greenwich Mean Time (GMT)',
    offset: 'UTC+0/+1',
    cities: ['London', 'Edinburgh', 'Dublin', 'Cardiff']
  },
  {
    id: 'Europe/Paris',
    name: 'Central European Time (CET)',
    offset: 'UTC+1/+2',
    cities: ['Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam']
  },
  {
    id: 'Europe/Moscow',
    name: 'Moscow Time (MSK)',
    offset: 'UTC+3',
    cities: ['Moscow', 'St. Petersburg', 'Volgograd']
  },
  {
    id: 'Asia/Tokyo',
    name: 'Japan Standard Time (JST)',
    offset: 'UTC+9',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama']
  },
  {
    id: 'Asia/Shanghai',
    name: 'China Standard Time (CST)',
    offset: 'UTC+8',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
  },
  {
    id: 'Asia/Kolkata',
    name: 'India Standard Time (IST)',
    offset: 'UTC+5:30',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
  },
  {
    id: 'Australia/Sydney',
    name: 'Australian Eastern Time (AET)',
    offset: 'UTC+10/+11',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra']
  },
  {
    id: 'Pacific/Auckland',
    name: 'New Zealand Time (NZST)',
    offset: 'UTC+12/+13',
    cities: ['Auckland', 'Wellington', 'Christchurch']
  },
  {
    id: 'America/Sao_Paulo',
    name: 'Brasília Time (BRT)',
    offset: 'UTC-3/-2',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador']
  },
  {
    id: 'Asia/Dubai',
    name: 'Gulf Standard Time (GST)',
    offset: 'UTC+4',
    cities: ['Dubai', 'Abu Dhabi', 'Doha', 'Kuwait City']
  },
  {
    id: 'Africa/Cairo',
    name: 'Eastern European Time (EET)',
    offset: 'UTC+2/+3',
    cities: ['Cairo', 'Alexandria', 'Giza']
  }
];

function calculateOffsetDifference(fromTimezone: string, toTimezone: string, dateTime: Date): string {
  const fromDate = new Date(dateTime.toLocaleString('en-US', { timeZone: fromTimezone }));
  const toDate = new Date(dateTime.toLocaleString('en-US', { timeZone: toTimezone }));
  
  const diffMs = toDate.getTime() - fromDate.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  
  if (diffHours === 0) return 'Same time';
  if (diffHours > 0) return `+${diffHours} hours`;
  return `${diffHours} hours`;
}

export function convertTimezone(options: TimezoneConversionOptions): ConversionResult {
  const { fromTimezone, toTimezone, dateTime } = options;
  
  const fromFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: fromTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  const toFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  const fromTimezoneInfo = POPULAR_TIMEZONES.find(tz => tz.id === fromTimezone);
  const toTimezoneInfo = POPULAR_TIMEZONES.find(tz => tz.id === toTimezone);
  
  if (!fromTimezoneInfo || !toTimezoneInfo) {
    throw new Error('Invalid timezone provided');
  }
  
  return {
    originalTime: fromFormatter.format(dateTime),
    convertedTime: toFormatter.format(dateTime),
    fromTimezone: fromTimezoneInfo,
    toTimezone: toTimezoneInfo,
    offsetDifference: calculateOffsetDifference(fromTimezone, toTimezone, dateTime)
  };
}

export function searchTimezones(query: string): TimezoneInfo[] {
  if (!query.trim()) return POPULAR_TIMEZONES;
  
  const lowerQuery = query.toLowerCase();
  return POPULAR_TIMEZONES.filter(tz => 
    tz.name.toLowerCase().includes(lowerQuery) ||
    tz.cities.some(city => city.toLowerCase().includes(lowerQuery)) ||
    tz.id.toLowerCase().includes(lowerQuery)
  );
}

export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatTimezoneForDisplay(timezone: TimezoneInfo): string {
  return `${timezone.name} (${timezone.offset})`;
}

import './clipboard-registration';
