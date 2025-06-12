"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generatePersons, PersonField, PersonFormat, DEFAULT_PERSON_GENERATOR_OPTIONS } from "shared";
import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import PersonGeneratorExplanation from "./PersonGeneratorExplanation";

const STORAGE_FIELDS = "personGeneratorFields";
const STORAGE_TEMPLATE = "personGeneratorTemplate";

export default function PersonGenerator() {
  const [count, setCount] = useState<number>(1);
  const [fields, setFields] = useState<PersonField[]>(DEFAULT_PERSON_GENERATOR_OPTIONS.fields);
  const [format, setFormat] = useState<PersonFormat>(PersonFormat.JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState<string>(DEFAULT_PERSON_GENERATOR_OPTIONS.customTemplate);
  const [showTemplate, setShowTemplate] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFields = localStorage.getItem(STORAGE_FIELDS);
      if (storedFields) {
        try {
          const parsed = JSON.parse(storedFields) as PersonField[];
          if (Array.isArray(parsed) && parsed.length) {
            setFields(parsed);
          }
        } catch {
          // ignore
        }
      }
      const storedTemplate = localStorage.getItem(STORAGE_TEMPLATE);
      if (storedTemplate) {
        setTemplate(storedTemplate);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_FIELDS, JSON.stringify(fields));
    }
  }, [fields]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_TEMPLATE, template);
    }
  }, [template]);

  const toggleField = (field: PersonField) => {
    setFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleGenerate = () => {
    try {
      const result = generatePersons({ count, fields, format, customTemplate: template });
      setOutput(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `persons.${format === PersonFormat.CUSTOM ? "txt" : format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetTemplate = () => setTemplate(DEFAULT_PERSON_GENERATOR_OPTIONS.customTemplate);

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Person Generator"
          description="Generate realistic person data with customizable fields and formats."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/file-generator" className="text-primary hover:underline">
            File Generator
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="count">Amount of persons</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="mt-2 w-full max-w-[200px]"
              />
            </div>

            <div>
              <Label>Fields</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.values(PersonField).map(f => (
                  <div key={f} className="flex items-center space-x-2">
                    <Checkbox id={`field-${f}`} checked={fields.includes(f)} onCheckedChange={() => toggleField(f)} />
                    <Label htmlFor={`field-${f}`}>{f}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="format">Format</Label>
              <Select value={format} onValueChange={v => setFormat(v as PersonFormat)}>
                <SelectTrigger className="mt-2 w-full max-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PersonFormat).map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {format === PersonFormat.CUSTOM && (
              <Button variant="outline" onClick={() => setShowTemplate(true)}>
                Edit Template
              </Button>
            )}

            <Button onClick={handleGenerate}>Generate</Button>
          </div>

          <div className="space-y-4">
            <Label htmlFor="output">Output</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              className="font-mono min-h-[250px]"
            />
            <div className="flex gap-2">
              <Button onClick={handleCopy} disabled={!output} variant="secondary">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
              <Button onClick={handleDownload} disabled={!output} variant="secondary">
                Download
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </Container>

      <div className="mt-12">
        <PersonGeneratorExplanation />
      </div>

      <Dialog open={showTemplate} onOpenChange={setShowTemplate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Template</DialogTitle>
          </DialogHeader>
          <Textarea
            value={template}
            onChange={e => setTemplate(e.target.value)}
            className="font-mono min-h-[200px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={resetTemplate}>Reset</Button>
            <Button onClick={() => setShowTemplate(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
