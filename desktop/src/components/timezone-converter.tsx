import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { POPULAR_TIMEZONES, type TimezoneInfo, getCurrentTimezone } from 'shared/timezone-converter';
import { TimezoneCard } from './timezone-card';

/**
 * Interface for a selected timezone with unique identifier
 */
interface SelectedTimezone extends TimezoneInfo {
  uniqueId: string;
}

interface TimezoneConverterProps {
  className?: string;
}

/**
 * Get user's country code from timezone
 */
function getCountryFromTimezone(timezoneId: string): string {
  const countryMappings: Record<string, string> = {
    "America/New_York": "United States",
    "America/Chicago": "United States",
    "America/Denver": "United States",
    "America/Los_Angeles": "United States",
    "America/Phoenix": "United States",
    "America/Anchorage": "United States",
    "America/Honolulu": "United States",
    "America/Toronto": "Canada",
    "America/Vancouver": "Canada",
    "America/Montreal": "Canada",
    "America/Mexico_City": "Mexico",
    "America/Sao_Paulo": "Brazil",
    "America/Buenos_Aires": "Argentina",
    "America/Lima": "Peru",
    "America/Bogota": "Colombia",
    "Europe/London": "United Kingdom",
    "Europe/Paris": "France",
    "Europe/Berlin": "Germany",
    "Europe/Rome": "Italy",
    "Europe/Madrid": "Spain",
    "Europe/Amsterdam": "Netherlands",
    "Europe/Moscow": "Russia",
    "Europe/Stockholm": "Sweden",
    "Europe/Oslo": "Norway",
    "Europe/Copenhagen": "Denmark",
    "Europe/Helsinki": "Finland",
    "Europe/Warsaw": "Poland",
    "Europe/Prague": "Czech Republic",
    "Europe/Vienna": "Austria",
    "Europe/Zurich": "Switzerland",
    "Europe/Brussels": "Belgium",
    "Europe/Dublin": "Ireland",
    "Europe/Lisbon": "Portugal",
    "Europe/Minsk": "Belarus",
    "Europe/Kiev": "Ukraine",
    "Europe/Bucharest": "Romania",
    "Europe/Sofia": "Bulgaria",
    "Europe/Athens": "Greece",
    "Europe/Istanbul": "Turkey",
    "Asia/Tokyo": "Japan",
    "Asia/Shanghai": "China",
    "Asia/Kolkata": "India",
    "Asia/Dubai": "United Arab Emirates",
    "Asia/Singapore": "Singapore",
    "Asia/Hong_Kong": "Hong Kong",
    "Asia/Bangkok": "Thailand",
    "Asia/Manila": "Philippines",
    "Asia/Jakarta": "Indonesia",
    "Asia/Seoul": "South Korea",
    "Asia/Taipei": "Taiwan",
    "Australia/Sydney": "Australia",
    "Australia/Melbourne": "Australia",
    "Australia/Perth": "Australia",
    "Australia/Brisbane": "Australia",
    "Pacific/Auckland": "New Zealand",
    "Africa/Cairo": "Egypt",
    "Africa/Johannesburg": "South Africa",
    "Africa/Lagos": "Nigeria",
    "Africa/Casablanca": "Morocco",
  };

  // Try exact match first
  if (countryMappings[timezoneId]) {
    return countryMappings[timezoneId];
  }

  // Fallback: extract country/region from timezone ID
  const parts = timezoneId.split('/');
  if (parts.length >= 2) {
    const region = parts[0];
    const location = parts[1].replace(/_/g, ' ');
    
    // Map regions to more user-friendly names
    const regionMappings: Record<string, string> = {
      'America': 'Americas',
      'Europe': 'Europe',
      'Asia': 'Asia',
      'Africa': 'Africa',
      'Australia': 'Australia',
      'Pacific': 'Pacific',
      'Atlantic': 'Atlantic',
      'Indian': 'Indian Ocean'
    };

    const regionName = regionMappings[region] || region;
    return `${location} (${regionName})`;
  }

  return "Unknown";
}

/**
 * Format time for display
 */
function formatTime(date: Date, timezone?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    ...(timezone && { timeZone: timezone }),
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Get timezone offset in hours from UTC
 */
function getTimezoneOffset(timezoneId: string): string {
  const now = new Date();
  const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  const targetTime = new Date(utc.toLocaleString("en-US", { timeZone: timezoneId }));
  const utcTime = new Date(utc.toLocaleString("en-US", { timeZone: "UTC" }));
  
  const diffMs = targetTime.getTime() - utcTime.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  if (diffHours === 0) return "±0";
  return diffHours > 0 ? `+${diffHours}` : `${diffHours}`;
}

/**
 * Get available timezones excluding already selected ones
 */
function getAvailableTimezones(selectedTimezones: SelectedTimezone[]): TimezoneInfo[] {
  const selectedIds = selectedTimezones.map((tz) => tz.id);
  return POPULAR_TIMEZONES.filter((tz) => !selectedIds.includes(tz.id));
}

export function TimezoneConverter({ className }: TimezoneConverterProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);
  const [userCountry, setUserCountry] = useState<string>("");
  const [selectedTimezones, setSelectedTimezones] = useState<SelectedTimezone[]>([]);
  const [showAddTimezone, setShowAddTimezone] = useState(false);
  const [newTimezoneId, setNewTimezoneId] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update current time every second (only after mounted)
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  // Initialize user timezone and load saved timezones (only after mounted)
  useEffect(() => {
    if (!mounted) return;

    // Detect user timezone
    const userTz = getCurrentTimezone();
    let userTimezoneInfo = POPULAR_TIMEZONES.find((tz) => tz.id === userTz);

    // If user's timezone is not in popular list, create a fallback
    if (!userTimezoneInfo) {
      // Create a fallback timezone info for any timezone
      userTimezoneInfo = {
        id: userTz,
        name: userTz.replace(/[_/]/g, ' ').replace(/([A-Z])/g, ' $1').trim(),
        offset: 'Local Time',
        cities: []
      };
    }

    setUserTimezone(userTimezoneInfo);
    setUserCountry(getCountryFromTimezone(userTz));

    // Load saved timezones from localStorage
    const saved = localStorage.getItem("selectedTimezones");
    let savedTimezones: SelectedTimezone[] = [];
    
    if (saved) {
      try {
        savedTimezones = JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved timezones:', error);
      }
    }

    // Add London by default if no saved timezones and user is not in London timezone
    if (savedTimezones.length === 0 && userTz !== 'Europe/London') {
      const londonTimezone = POPULAR_TIMEZONES.find(tz => tz.id === 'Europe/London');
      if (londonTimezone) {
        savedTimezones = [{
          ...londonTimezone,
          uniqueId: `${londonTimezone.id}-${Date.now()}`
        }];
      }
    }

    setSelectedTimezones(savedTimezones);
  }, [mounted]);

  // Save selected timezones to localStorage
  useEffect(() => {
    if (!mounted || selectedTimezones.length === 0) return;
    localStorage.setItem("selectedTimezones", JSON.stringify(selectedTimezones));
  }, [selectedTimezones, mounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.timezone-search-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  /**
   * Add a new timezone to the selected list
   */
  const handleAddTimezone = () => {
    if (!newTimezoneId || selectedTimezones.length >= 10) return;

    const timezone = availableTimezones.find((tz) => tz.id === newTimezoneId);
    if (!timezone) return;

    const selectedTimezone: SelectedTimezone = {
      ...timezone,
      uniqueId: `${timezone.id}-${Date.now()}`,
    };

    setSelectedTimezones((prev) => [...prev, selectedTimezone]);
    setNewTimezoneId("");
    setSearchValue("");
    setShowDropdown(false);
    setShowAddTimezone(false);
  };

  /**
   * Remove a timezone from the selected list
   */
  const handleRemoveTimezone = (uniqueId: string) => {
    setSelectedTimezones((prev) => {
      const updated = prev.filter((tz) => tz.uniqueId !== uniqueId);
      if (updated.length === 0) {
        localStorage.removeItem("selectedTimezones");
      } else {
        localStorage.setItem("selectedTimezones", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const availableTimezones = getAvailableTimezones(selectedTimezones);

  /**
   * Filter timezones by search query (city name, timezone name, or country)
   */
  const filteredTimezones = availableTimezones.filter((timezone) => {
    const searchLower = searchValue.toLowerCase();
    const timezoneLower = timezone.name.toLowerCase();
    const countryLower = getCountryFromTimezone(timezone.id).toLowerCase();
    const citiesMatch = timezone.cities.some(city => city.toLowerCase().includes(searchLower));
    
    return timezoneLower.includes(searchLower) || 
           countryLower.includes(searchLower) || 
           citiesMatch ||
           timezone.id.toLowerCase().includes(searchLower);
  });

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Timezone Converter</h1>
        <p className="text-muted-foreground">Convert time between different timezones around the world</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Time Section */}
        <div className="space-y-4">
          <TimezoneCard
            location={!mounted ? 'Detecting your timezone...' : userCountry || 'Your Location'}
            time={!mounted ? '--:--:-- --' : userTimezone ? formatTime(currentTime, userTimezone.id) : '--:--:-- --'}
            description={!mounted ? 'Loading...' : userTimezone ? `${userTimezone.name} (UTC${getTimezoneOffset(userTimezone.id)})` : 'Unable to detect timezone'}
            iconType="location"
            isLoading={!mounted}
          />

          <TimezoneCard
            location="UTC/GMT Time"
            time={mounted ? formatTime(currentTime, 'UTC') : '--:--:-- --'}
            description="Coordinated Universal Time (UTC±0)"
            iconType="globe"
            isLoading={!mounted}
          />
        </div>

        {/* Selected Timezones Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Other Timezones</span>
                <span className="text-sm text-muted-foreground font-normal">{selectedTimezones.length}/10</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTimezones.length === 0 ? (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <div className="text-muted-foreground">No additional timezones selected</div>
                  <div className="text-sm text-muted-foreground mt-1">Click "Add Timezone" below to start</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTimezones.map((timezone) => (
                    <TimezoneCard
                      key={timezone.uniqueId}
                      location={getCountryFromTimezone(timezone.id)}
                      time={mounted ? formatTime(currentTime, timezone.id) : '--:--:-- --'}
                      description={mounted ? `${timezone.name} (UTC${getTimezoneOffset(timezone.id)})` : 'Loading...'}
                      iconType="location"
                      showRemoveButton={true}
                      onRemove={() => handleRemoveTimezone(timezone.uniqueId)}
                      isLoading={!mounted}
                    />
                  ))}
                </div>
              )}

              {/* Add Timezone Section */}
              {selectedTimezones.length < 10 && (
                <div className="space-y-3">
                  {showAddTimezone ? (
                    <div className="space-y-3">
                      <div className="relative timezone-search-container">
                        <Input
                          placeholder="Type a city or timezone name..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            setShowDropdown(true);
                            setNewTimezoneId("");
                          }}
                          onFocus={() => setShowDropdown(true)}
                          className="w-full"
                        />
                        {showDropdown && searchValue && filteredTimezones.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredTimezones.slice(0, 10).map((timezone) => (
                              <button
                                key={timezone.id}
                                type="button"
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-100"
                                onClick={() => {
                                  setNewTimezoneId(timezone.id);
                                  setSearchValue(timezone.name);
                                  setShowDropdown(false);
                                }}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">{timezone.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {getCountryFromTimezone(timezone.id)} • {timezone.offset}
                                    {timezone.cities.length > 0 && ` • ${timezone.cities.join(', ')}`}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        {showDropdown && searchValue && filteredTimezones.length === 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-center text-muted-foreground">
                            No timezones found matching "{searchValue}"
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddTimezone} disabled={!newTimezoneId} className="flex-1">
                          Add
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAddTimezone(false);
                            setNewTimezoneId("");
                            setSearchValue("");
                            setShowDropdown(false);
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setShowAddTimezone(true)}
                      className="w-full flex items-center gap-2"
                      disabled={availableTimezones.length === 0}
                    >
                      <Plus className="h-4 w-4" />
                      Add Timezone
                    </Button>
                  )}
                </div>
              )}

              {selectedTimezones.length >= 10 && (
                <div className="text-sm text-muted-foreground text-center p-2">Maximum of 10 timezones reached</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
