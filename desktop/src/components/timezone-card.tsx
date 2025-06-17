import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Globe, X } from 'lucide-react';

/**
 * Props for the TimezoneCard component
 */
interface TimezoneCardProps {
  /** Location/country name to display */
  location: string;
  /** Formatted time string */
  time: string;
  /** Timezone description with UTC offset */
  description: string;
  /** Icon type to display */
  iconType?: 'location' | 'globe';
  /** Whether to show remove button */
  showRemoveButton?: boolean;
  /** Remove button click handler */
  onRemove?: () => void;
  /** Whether the card is in loading state */
  isLoading?: boolean;
}

/**
 * Reusable timezone card component for displaying timezone information
 */
export function TimezoneCard({
  location,
  time,
  description,
  iconType = 'location',
  showRemoveButton = false,
  onRemove,
  isLoading = false
}: TimezoneCardProps) {
  const Icon = iconType === 'globe' ? Globe : MapPin;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <span className="font-medium text-slate-700 truncate">
                {isLoading ? 'Loading...' : location}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mb-1">
              {isLoading ? '--:--:-- --' : time}
            </div>
            <div className="text-sm text-slate-500">
              {isLoading ? 'Loading...' : description}
            </div>
          </div>
          {showRemoveButton && onRemove && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-slate-400 hover:text-red-500 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 