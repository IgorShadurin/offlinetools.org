import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UnitConverterExplanation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Unit Conversion</CardTitle>
          <CardDescription>
            Understanding the fundamentals of unit conversion across different measurement systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">How Unit Conversion Works</h3>
            <p className="text-sm text-muted-foreground">
              Unit conversion involves multiplying or dividing by conversion factors to change from one unit to another
              within the same measurement category. Each category uses a base unit (meter for length, gram for weight,
              etc.) to ensure accurate conversions between all units.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Supported Categories</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <strong>Length:</strong> mm, cm, m, km, in, ft, yd, mi
              </li>
              <li>
                <strong>Weight:</strong> mg, g, kg, oz, lb, st, t
              </li>
              <li>
                <strong>Temperature:</strong> °C, °F, K, °R (special conversion formulas)
              </li>
              <li>
                <strong>Volume:</strong> ml, l, m³, fl oz, cup, pt, qt, gal
              </li>
              <li>
                <strong>Area:</strong> mm², cm², m², km², in², ft², yd², acre, ha
              </li>
              <li>
                <strong>Energy:</strong> J, kJ, cal, kcal, BTU, kWh
              </li>
              <li>
                <strong>Power:</strong> W, kW, MW, hp, BTU/h
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Temperature Conversions</h3>
            <p className="text-sm text-muted-foreground">
              Temperature conversions are special because they involve both scaling and offset. The converter handles
              Celsius, Fahrenheit, Kelvin, and Rankine with proper mathematical formulas for accurate results.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Precision and Accuracy</h3>
            <p className="text-sm text-muted-foreground">
              All conversions use high-precision mathematical calculations to ensure accurate results. The converter
              handles decimal places appropriately and avoids floating-point precision errors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
