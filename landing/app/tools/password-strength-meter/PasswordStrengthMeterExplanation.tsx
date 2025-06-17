import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function PasswordStrengthMeterExplanation() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Understanding Password Security</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Learn how password strength is calculated and why strong passwords are essential for your digital security.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>OWASP Guidelines</CardTitle>
            <CardDescription>
              Our password strength meter follows industry-standard OWASP (Open Web Application Security Project)
              guidelines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Minimum 8 characters required</li>
              <li>• No maximum length restrictions</li>
              <li>• Support for all character types</li>
              <li>• Common password detection</li>
              <li>• Focus on entropy over complexity</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lock className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Strength Calculation</CardTitle>
            <CardDescription>
              Password strength is calculated based on multiple factors that contribute to security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Length (25 points for 8+ chars)</li>
              <li>• Character variety (45 points total)</li>
              <li>• Uniqueness (20 points)</li>
              <li>• Length bonus (up to 10 points)</li>
              <li>• Maximum score: 100 points</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Eye className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Privacy First</CardTitle>
            <CardDescription>
              Your passwords are analyzed locally in your browser and never sent to any server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Client-side processing only</li>
              <li>• No data transmission</li>
              <li>• No password storage</li>
              <li>• Complete privacy protection</li>
              <li>• Works offline</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Common Vulnerabilities</CardTitle>
            <CardDescription>Understanding what makes passwords weak helps you avoid common pitfalls.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Dictionary Attacks</h4>
                <p className="text-sm text-muted-foreground">
                  Attackers use lists of common passwords. Our tool checks against known weak passwords.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Brute Force Attacks</h4>
                <p className="text-sm text-muted-foreground">
                  Longer passwords with varied characters exponentially increase cracking time.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Social Engineering</h4>
                <p className="text-sm text-muted-foreground">
                  Avoid personal information that could be guessed or researched about you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>Follow these recommendations to maintain strong password security.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Use Passphrases</h4>
                <p className="text-sm text-muted-foreground">
                  Consider using memorable phrases with spaces and punctuation instead of complex character
                  combinations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Password Managers</h4>
                <p className="text-sm text-muted-foreground">
                  Use a reputable password manager to generate, store, and autofill unique passwords for each account.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Multi-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Enable 2FA/MFA whenever possible as an additional security layer beyond passwords.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Info className="h-8 w-8 text-blue-600 mb-2" />
          <CardTitle>Strength Levels Explained</CardTitle>
          <CardDescription>Understanding what each strength level means for your password security.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="text-center p-3 border rounded-lg">
              <div className="w-4 h-4 bg-red-500 rounded mx-auto mb-2"></div>
              <h4 className="font-medium text-sm">Very Weak</h4>
              <p className="text-xs text-muted-foreground mt-1">0-19 points</p>
              <p className="text-xs text-muted-foreground">Easily cracked</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-4 h-4 bg-orange-500 rounded mx-auto mb-2"></div>
              <h4 className="font-medium text-sm">Weak</h4>
              <p className="text-xs text-muted-foreground mt-1">20-39 points</p>
              <p className="text-xs text-muted-foreground">Vulnerable</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-4 h-4 bg-yellow-500 rounded mx-auto mb-2"></div>
              <h4 className="font-medium text-sm">Fair</h4>
              <p className="text-xs text-muted-foreground mt-1">40-59 points</p>
              <p className="text-xs text-muted-foreground">Moderate security</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-4 h-4 bg-lime-500 rounded mx-auto mb-2"></div>
              <h4 className="font-medium text-sm">Good</h4>
              <p className="text-xs text-muted-foreground mt-1">60-79 points</p>
              <p className="text-xs text-muted-foreground">Good protection</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-4 h-4 bg-green-500 rounded mx-auto mb-2"></div>
              <h4 className="font-medium text-sm">Strong</h4>
              <p className="text-xs text-muted-foreground mt-1">80-100 points</p>
              <p className="text-xs text-muted-foreground">Excellent security</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
