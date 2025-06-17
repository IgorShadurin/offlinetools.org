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
  // Americas
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
    id: 'America/Toronto',
    name: 'Eastern Time (Canada)',
    offset: 'UTC-5/-4',
    cities: ['Toronto', 'Ottawa', 'Montreal', 'Quebec City']
  },
  {
    id: 'America/Vancouver',
    name: 'Pacific Time (Canada)',
    offset: 'UTC-8/-7',
    cities: ['Vancouver', 'Victoria', 'Kelowna']
  },
  {
    id: 'America/Mexico_City',
    name: 'Central Time (Mexico)',
    offset: 'UTC-6/-5',
    cities: ['Mexico City', 'Guadalajara', 'Monterrey']
  },
  {
    id: 'America/Sao_Paulo',
    name: 'Brasília Time (BRT)',
    offset: 'UTC-3/-2',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador']
  },
  {
    id: 'America/Buenos_Aires',
    name: 'Argentina Time (ART)',
    offset: 'UTC-3',
    cities: ['Buenos Aires', 'Córdoba', 'Rosario']
  },
  {
    id: 'America/Lima',
    name: 'Peru Time (PET)',
    offset: 'UTC-5',
    cities: ['Lima', 'Arequipa', 'Trujillo']
  },

  // Europe
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
    id: 'Europe/Berlin',
    name: 'Central European Time (Germany)',
    offset: 'UTC+1/+2',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt']
  },
  {
    id: 'Europe/Rome',
    name: 'Central European Time (Italy)',
    offset: 'UTC+1/+2',
    cities: ['Rome', 'Milan', 'Naples', 'Turin']
  },
  {
    id: 'Europe/Madrid',
    name: 'Central European Time (Spain)',
    offset: 'UTC+1/+2',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville']
  },
  {
    id: 'Europe/Amsterdam',
    name: 'Central European Time (Netherlands)',
    offset: 'UTC+1/+2',
    cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht']
  },
  {
    id: 'Europe/Brussels',
    name: 'Central European Time (Belgium)',
    offset: 'UTC+1/+2',
    cities: ['Brussels', 'Antwerp', 'Ghent', 'Bruges']
  },
  {
    id: 'Europe/Vienna',
    name: 'Central European Time (Austria)',
    offset: 'UTC+1/+2',
    cities: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz']
  },
  {
    id: 'Europe/Zurich',
    name: 'Central European Time (Switzerland)',
    offset: 'UTC+1/+2',
    cities: ['Zurich', 'Geneva', 'Basel', 'Bern']
  },
  {
    id: 'Europe/Prague',
    name: 'Central European Time (Czech Republic)',
    offset: 'UTC+1/+2',
    cities: ['Prague', 'Brno', 'Ostrava', 'Plzen']
  },
  {
    id: 'Europe/Warsaw',
    name: 'Central European Time (Poland)',
    offset: 'UTC+1/+2',
    cities: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw']
  },
  {
    id: 'Europe/Budapest',
    name: 'Central European Time (Hungary)',
    offset: 'UTC+1/+2',
    cities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc']
  },
  {
    id: 'Europe/Stockholm',
    name: 'Central European Time (Sweden)',
    offset: 'UTC+1/+2',
    cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala']
  },
  {
    id: 'Europe/Oslo',
    name: 'Central European Time (Norway)',
    offset: 'UTC+1/+2',
    cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger']
  },
  {
    id: 'Europe/Copenhagen',
    name: 'Central European Time (Denmark)',
    offset: 'UTC+1/+2',
    cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg']
  },
  {
    id: 'Europe/Helsinki',
    name: 'Eastern European Time (Finland)',
    offset: 'UTC+2/+3',
    cities: ['Helsinki', 'Espoo', 'Tampere', 'Turku']
  },
  {
    id: 'Europe/Moscow',
    name: 'Moscow Time (MSK)',
    offset: 'UTC+3',
    cities: ['Moscow', 'St. Petersburg', 'Volgograd']
  },
  {
    id: 'Europe/Kiev',
    name: 'Eastern European Time (Ukraine)',
    offset: 'UTC+2/+3',
    cities: ['Kiev', 'Kharkiv', 'Odessa', 'Dnipro']
  },
  {
    id: 'Europe/Minsk',
    name: 'Moscow Time (Belarus)',
    offset: 'UTC+3',
    cities: ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk', 'Grodno', 'Brest']
  },
  {
    id: 'Europe/Bucharest',
    name: 'Eastern European Time (Romania)',
    offset: 'UTC+2/+3',
    cities: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi']
  },
  {
    id: 'Europe/Sofia',
    name: 'Eastern European Time (Bulgaria)',
    offset: 'UTC+2/+3',
    cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas']
  },
  {
    id: 'Europe/Athens',
    name: 'Eastern European Time (Greece)',
    offset: 'UTC+2/+3',
    cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion']
  },
  {
    id: 'Europe/Istanbul',
    name: 'Turkey Time (TRT)',
    offset: 'UTC+3',
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa']
  },
  {
    id: 'Europe/Lisbon',
    name: 'Western European Time (Portugal)',
    offset: 'UTC+0/+1',
    cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra']
  },

  // Asia
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
    id: 'Asia/Hong_Kong',
    name: 'Hong Kong Time (HKT)',
    offset: 'UTC+8',
    cities: ['Hong Kong']
  },
  {
    id: 'Asia/Singapore',
    name: 'Singapore Standard Time (SGT)',
    offset: 'UTC+8',
    cities: ['Singapore']
  },
  {
    id: 'Asia/Seoul',
    name: 'Korea Standard Time (KST)',
    offset: 'UTC+9',
    cities: ['Seoul', 'Busan', 'Incheon', 'Daegu']
  },
  {
    id: 'Asia/Kolkata',
    name: 'India Standard Time (IST)',
    offset: 'UTC+5:30',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
  },
  {
    id: 'Asia/Bangkok',
    name: 'Indochina Time (ICT)',
    offset: 'UTC+7',
    cities: ['Bangkok', 'Ho Chi Minh City', 'Hanoi', 'Phnom Penh']
  },
  {
    id: 'Asia/Jakarta',
    name: 'Western Indonesia Time (WIB)',
    offset: 'UTC+7',
    cities: ['Jakarta', 'Bandung', 'Surabaya', 'Medan']
  },
  {
    id: 'Asia/Manila',
    name: 'Philippines Standard Time (PST)',
    offset: 'UTC+8',
    cities: ['Manila', 'Quezon City', 'Davao', 'Cebu']
  },
  {
    id: 'Asia/Kuala_Lumpur',
    name: 'Malaysia Time (MYT)',
    offset: 'UTC+8',
    cities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru']
  },
  {
    id: 'Asia/Dubai',
    name: 'Gulf Standard Time (GST)',
    offset: 'UTC+4',
    cities: ['Dubai', 'Abu Dhabi', 'Doha', 'Kuwait City']
  },
  {
    id: 'Asia/Riyadh',
    name: 'Arabia Standard Time (AST)',
    offset: 'UTC+3',
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina']
  },
  {
    id: 'Asia/Tehran',
    name: 'Iran Standard Time (IRST)',
    offset: 'UTC+3:30/+4:30',
    cities: ['Tehran', 'Mashhad', 'Isfahan', 'Tabriz']
  },
  {
    id: 'Asia/Karachi',
    name: 'Pakistan Standard Time (PKT)',
    offset: 'UTC+5',
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad']
  },

  // Africa
  {
    id: 'Africa/Cairo',
    name: 'Eastern European Time (EET)',
    offset: 'UTC+2/+3',
    cities: ['Cairo', 'Alexandria', 'Giza']
  },
  {
    id: 'Africa/Lagos',
    name: 'West Africa Time (WAT)',
    offset: 'UTC+1',
    cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan']
  },
  {
    id: 'Africa/Johannesburg',
    name: 'South Africa Standard Time (SAST)',
    offset: 'UTC+2',
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria']
  },
  {
    id: 'Africa/Nairobi',
    name: 'East Africa Time (EAT)',
    offset: 'UTC+3',
    cities: ['Nairobi', 'Addis Ababa', 'Dar es Salaam', 'Kampala']
  },
  {
    id: 'Africa/Casablanca',
    name: 'Western European Time (Morocco)',
    offset: 'UTC+0/+1',
    cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fez']
  },

  // Oceania
  {
    id: 'Australia/Sydney',
    name: 'Australian Eastern Time (AET)',
    offset: 'UTC+10/+11',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra']
  },
  {
    id: 'Australia/Perth',
    name: 'Australian Western Time (AWT)',
    offset: 'UTC+8',
    cities: ['Perth', 'Fremantle', 'Bunbury']
  },
  {
    id: 'Pacific/Auckland',
    name: 'New Zealand Time (NZST)',
    offset: 'UTC+12/+13',
    cities: ['Auckland', 'Wellington', 'Christchurch']
  },
  {
    id: 'Pacific/Fiji',
    name: 'Fiji Time (FJT)',
    offset: 'UTC+12/+13',
    cities: ['Suva', 'Nadi', 'Lautoka']
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
