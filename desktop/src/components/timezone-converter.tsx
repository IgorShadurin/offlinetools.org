import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';

import { Clock, Copy, ArrowRightLeft } from 'lucide-react';
import { 
  convertTimezone, 
  searchTimezones, 
  getCurrentTimezone,
  formatTimezoneForDisplay,
  POPULAR_TIMEZONES, 
  type TimezoneInfo,
  type ConversionResult 
} from 'shared/timezone-converter';

interface TimezoneConverterProps {
  className?: string;
}

export function TimezoneConverter({ className }: TimezoneConverterProps) {
  const [fromTimezone, setFromTimezone] = useState<TimezoneInfo>(
    POPULAR_TIMEZONES.find(tz => tz.id === getCurrentTimezone()) || POPULAR_TIMEZONES[0]
  );
  const [toTimezone, setToTimezone] = useState<TimezoneInfo>(POPULAR_TIMEZONES[1]);
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredFromTimezones = searchTimezones(fromSearch);
  const filteredToTimezones = searchTimezones(toSearch);

  useEffect(() => {
    try {
      const conversionResult = convertTimezone({
        fromTimezone: fromTimezone.id,
        toTimezone: toTimezone.id,
        dateTime
      });
      setResult(conversionResult);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setResult(null);
    }
  }, [fromTimezone, toTimezone, dateTime]);

  const handleSwapTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  const handleCopyResult = async () => {
    if (result) {
      const text = `${result.convertedTime} (${result.toTimezone.name})`;
      await navigator.clipboard.writeText(text);
    }
  };

  const formatDateTimeForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateTimeChange = (value: string) => {
    const newDate = new Date(value);
    if (!isNaN(newDate.getTime())) {
      setDateTime(newDate);
    }
  };

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Timezone Converter</h1>
        <p className="text-muted-foreground">Convert time between different timezones around the world</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Convert Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="datetime">Date & Time</Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={formatDateTimeForInput(dateTime)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateTimeChange(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-timezone">From Timezone</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search timezones or cities..."
                  value={fromSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromSearch(e.target.value)}
                />
                <Select
                  value={fromTimezone.id}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const timezone = POPULAR_TIMEZONES.find((tz: TimezoneInfo) => tz.id === e.target.value);
                    if (timezone) setFromTimezone(timezone);
                  }}
                >
                  {filteredFromTimezones.map((timezone: TimezoneInfo) => (
                    <option key={timezone.id} value={timezone.id}>
                      {formatTimezoneForDisplay(timezone)}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapTimezones}
                className="flex items-center gap-2"
              >
                <ArrowRightLeft className="h-4 w-4" />
                Swap
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-timezone">To Timezone</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search timezones or cities..."
                  value={toSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToSearch(e.target.value)}
                />
                <Select
                  value={toTimezone.id}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const timezone = POPULAR_TIMEZONES.find((tz: TimezoneInfo) => tz.id === e.target.value);
                    if (timezone) setToTimezone(timezone);
                  }}
                >
                  {filteredToTimezones.map((timezone: TimezoneInfo) => (
                    <option key={timezone.id} value={timezone.id}>
                      {formatTimezoneForDisplay(timezone)}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : result ? (
              <>
                <div className="space-y-3" data-testid="conversion-result">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="font-mono text-lg">{result.originalTime}</div>
                    <div className="text-sm text-muted-foreground">{result.fromTimezone.name}</div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-muted-foreground text-sm">
                      {result.offsetDifference}
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">To</div>
                    <div className="font-mono text-lg font-semibold">{result.convertedTime}</div>
                    <div className="text-sm text-muted-foreground">{result.toTimezone.name}</div>
                  </div>
                </div>

                <Button
                  onClick={handleCopyResult}
                  className="w-full flex items-center gap-2"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                  Copy Result
                </Button>
              </>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                Select timezones to see conversion result
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Timezones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {POPULAR_TIMEZONES.slice(0, 12).map((timezone: TimezoneInfo) => {
              const currentTime = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone.id,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }).format(new Date());

              return (
                <div
                  key={timezone.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setToTimezone(timezone)}
                  data-testid="popular-timezone"
                >
                  <div className="font-medium text-sm">{timezone.name}</div>
                  <div className="font-mono text-lg">{currentTime}</div>
                  <div className="text-xs text-muted-foreground">
                    {timezone.cities.slice(0, 2).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
