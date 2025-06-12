import { useState, useEffect } from "react";
import { generatePersons, PersonField, PersonFormat, DEFAULT_PERSON_GENERATOR_OPTIONS } from "shared/person-generator";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Select, SelectOption } from "./ui/select";
import { Alert } from "./ui/alert";

interface PersonGeneratorProps {
  className?: string;
}

export function PersonGenerator({ className = "" }: PersonGeneratorProps) {
  const [count, setCount] = useState(1);
  const [fields, setFields] = useState<PersonField[]>(DEFAULT_PERSON_GENERATOR_OPTIONS.fields);
  const [format, setFormat] = useState<PersonFormat>(PersonFormat.JSON);
  const [template, setTemplate] = useState<string>(DEFAULT_PERSON_GENERATOR_OPTIONS.customTemplate);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedFields = localStorage.getItem("person-generator-fields");
    if (storedFields) {
      try {
        const parsed = JSON.parse(storedFields) as PersonField[];
        setFields(parsed);
      } catch {
        // ignore
      }
    }
    const storedTemplate = localStorage.getItem("person-generator-template");
    if (storedTemplate) setTemplate(storedTemplate);
  }, []);

  useEffect(() => {
    localStorage.setItem("person-generator-fields", JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem("person-generator-template", template);
  }, [template]);

  const toggleField = (field: PersonField) => {
    setFields(prev => (prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]));
  };

  const handleGenerate = () => {
    try {
      const result = generatePersons({ count, fields, format, customTemplate: template });
      setOutput(result);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Person Generator</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="count" className="text-sm">Count</label>
              <input
                id="count"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="h-9 w-24 rounded-md border px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="format" className="text-sm">Format</label>
              <Select id="format" value={format} onChange={e => setFormat(e.target.value as PersonFormat)}>
                {Object.values(PersonFormat).map(f => (
                  <SelectOption key={f} value={f}>{f}</SelectOption>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(PersonField).map(f => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={fields.includes(f)}
                  onChange={() => toggleField(f)}
                />
                {f}
              </label>
            ))}
          </div>
          {format === PersonFormat.CUSTOM && (
            <textarea
              className="border rounded-md p-2 h-20 w-full text-sm font-mono"
              value={template}
              onChange={e => setTemplate(e.target.value)}
            />
          )}
          <div className="flex gap-2">
            <Button onClick={handleGenerate}>Generate</Button>
            {output && (
              <Button onClick={() => navigator.clipboard.writeText(output)} variant="secondary">
                Copy
              </Button>
            )}
          </div>
          <Textarea value={output} readOnly className="flex-1 font-mono" />
          {error && <Alert variant="destructive">{error}</Alert>}
        </CardContent>
      </Card>
    </div>
  );
}
