import { useState } from 'react'
import { analyzePassword, getStrengthColor, getStrengthLabel, PasswordStrength } from 'shared'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Shield, Check, X, AlertTriangle, Eye, EyeOff } from 'lucide-react'

interface PasswordStrengthMeterProps {
  className?: string
}

export function PasswordStrengthMeter({ className }: PasswordStrengthMeterProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const analysis = analyzePassword(password)

  const getStrengthIcon = (strength: PasswordStrength) => {
    switch (strength) {
      case PasswordStrength.VERY_WEAK:
      case PasswordStrength.WEAK:
        return <X className="h-4 w-4" />
      case PasswordStrength.FAIR:
        return <AlertTriangle className="h-4 w-4" />
      case PasswordStrength.GOOD:
      case PasswordStrength.STRONG:
        return <Check className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Password Strength Meter</h1>
        <p className="text-muted-foreground">
          Analyze your password strength and get security recommendations
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password-input" className="text-sm font-medium">
            Enter Password
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Type your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-12 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Strength Indicator */}
        {password && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getStrengthIcon(analysis.strength)}
                  Password Strength
                </CardTitle>
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: getStrengthColor(analysis.strength),
                    color: getStrengthColor(analysis.strength)
                  }}
                >
                  {getStrengthLabel(analysis.strength)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Strength Score</span>
                  <span>{analysis.score}/100</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${analysis.score}%`,
                      backgroundColor: getStrengthColor(analysis.strength)
                    }}
                  />
                </div>
              </div>

              {/* Criteria Checklist */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Security Criteria</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`flex items-center gap-2 ${analysis.criteria.length ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.length ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.criteria.hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.hasLowercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    Lowercase letters
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.criteria.hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.hasUppercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    Uppercase letters
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.criteria.hasNumbers ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.hasNumbers ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    Numbers
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.criteria.hasSymbols ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.hasSymbols ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    Special characters
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.criteria.notCommon ? 'text-green-600' : 'text-red-500'}`}>
                    {analysis.criteria.notCommon ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    Not common password
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recommendations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {analysis.feedback.map((feedback, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-xs mt-1">•</span>
                      {feedback}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Password Security Tips
            </CardTitle>
            <CardDescription>
              Follow these best practices to create secure passwords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Use a unique password for each account
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Consider using a passphrase with multiple words
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Enable two-factor authentication when available
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Use a password manager to generate and store passwords
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Avoid personal information like names or birthdays
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Change passwords immediately if you suspect a breach
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
