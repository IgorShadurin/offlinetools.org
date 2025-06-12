"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  generatePersons,
  formatPersons,
  PersonField,
  PersonOutputFormat,
  isSavePickerSupported,
  saveTextWithPicker,
  generateTextDownloadUrl,
  DEFAULT_PERSON_GENERATOR_OPTIONS,
  DEFAULT_CUSTOM_TEMPLATE
} from "shared";
import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Download, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import PersonGeneratorExplanation from "./PersonGeneratorExplanation";

const ALL_FIELDS = Object.values(PersonField);

export default function PersonGenerator() {
  const [count, setCount] = useState<number>(DEFAULT_PERSON_GENERATOR_OPTIONS.count);
  const [fields, setFields] = useState<PersonField[]>(DEFAULT_PERSON_GENERATOR_OPTIONS.fields);
  const [format, setFormat] = useState<PersonOutputFormat>(PersonOutputFormat.JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fsSupported, setFsSupported] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [customTemplate, setCustomTemplate] = useState<string>(
    DEFAULT_CUSTOM_TEMPLATE
  );
  const STORAGE_KEY = "personGeneratorFields";
  const TEMPLATE_KEY = "personGeneratorTemplate";

  useEffect(() => {
    setFsSupported(isSavePickerSupported());
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      const template = localStorage.getItem(TEMPLATE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as PersonField[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFields(parsed as PersonField[]);
          }
        } catch {
          // ignore
        }
      }
      if (template) {
        setCustomTemplate(template);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
      localStorage.setItem(TEMPLATE_KEY, customTemplate);
    }
  }, [fields, customTemplate]);

  const toggleField = (field: PersonField) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleGenerate = () => {
    try {
      const persons = generatePersons({ count, fields });
      const formatted = formatPersons(persons, format, customTemplate);
      setOutput(formatted);
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

  const handleDownload = async () => {
    const filename = `persons.${format}`;
    if (fsSupported) {
      await saveTextWithPicker(output, filename);
    } else {
      const { url, revoke } = generateTextDownloadUrl(output);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      revoke();
    }
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Person Generator"
          description="Generate realistic person data in various formats and save it as a file."
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
                max={1000}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="mt-1 w-32"
              />
            </div>

            <div>
              <Label className="block mb-2">Fields</Label>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {ALL_FIELDS.map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      id={`field-${field}`}
                      checked={fields.includes(field)}
                      onCheckedChange={() => toggleField(field)}
                    />
                    <Label htmlFor={`field-${field}`} className="capitalize">
                      {field}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="format">Output format</Label>
              <Select value={format} onValueChange={(val) => setFormat(val as PersonOutputFormat)}>
                <SelectTrigger className="w-40 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PersonOutputFormat.JSON}>JSON</SelectItem>
                  <SelectItem value={PersonOutputFormat.XML}>XML</SelectItem>
                  <SelectItem value={PersonOutputFormat.YAML}>YAML</SelectItem>
                  <SelectItem value={PersonOutputFormat.HTML}>HTML</SelectItem>
                  <SelectItem value={PersonOutputFormat.TXT}>Text</SelectItem>
                  <SelectItem value={PersonOutputFormat.CUSTOM}>Custom</SelectItem>
                </SelectContent>
              </Select>
              {format === PersonOutputFormat.CUSTOM && (
                <Dialog open={templateOpen} onOpenChange={setTemplateOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2">Edit Template</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Custom Template</DialogTitle>
                      <DialogDescription>
                        Use placeholders like {"{{firstName}}"} in your template.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      value={customTemplate}
                      onChange={(e) => setCustomTemplate(e.target.value)}
                      className="font-mono mt-2"
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-3">
              <Button onClick={handleGenerate} className="w-full" size="lg">
                Generate
              </Button>
              {output && (
                <Button onClick={handleDownload} variant="outline" className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" /> Save File
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="output">Output</Label>
            <div className="relative">
              <Textarea
                id="output"
                value={output}
                readOnly
                className="min-h-[250px] font-mono pr-10"
              />
              {output && (
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        <PersonGeneratorExplanation />
      </Container>
    </>
  );
}
