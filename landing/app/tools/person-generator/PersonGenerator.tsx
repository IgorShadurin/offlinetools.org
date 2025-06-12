"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  generatePeople,
  formatPeople,
  PersonField,
  PersonOutputFormat,
  DEFAULT_PERSON_FIELDS,
  DEFAULT_PERSON_TEMPLATE,
  isFileSystemAccessSupported,
  generateFileDownloadUrl,
} from "shared";
import { AlertCircle, Check, Copy, FileDown, Pencil, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PersonGeneratorExplanation from "./PersonGeneratorExplanation";
import * as Dialog from "@radix-ui/react-dialog";

const ALL_FIELDS = Object.values(PersonField);

export default function PersonGenerator() {
  const [count, setCount] = useState(1);
  const [fields, setFields] = useState<PersonField[]>(DEFAULT_PERSON_FIELDS);
  const [format, setFormat] = useState<PersonOutputFormat>(PersonOutputFormat.JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fsApi, setFsApi] = useState(false);
  const [template, setTemplate] = useState(DEFAULT_PERSON_TEMPLATE);
  const [showTemplate, setShowTemplate] = useState(false);

  useEffect(() => {
    setFsApi(isFileSystemAccessSupported());
    if (typeof window !== "undefined") {
      const storedFields = localStorage.getItem("personFields");
      if (storedFields) setFields(JSON.parse(storedFields));
      const storedTemplate = localStorage.getItem("personTemplate");
      if (storedTemplate) setTemplate(storedTemplate);
    }
  }, []);

  const toggleField = (f: PersonField) => {
    setFields((prev) => {
      const next = prev.includes(f) ? prev.filter((v) => v !== f) : [...prev, f];
      if (typeof window !== "undefined") {
        localStorage.setItem("personFields", JSON.stringify(next));
      }
      return next;
    });
  };

  const handleGenerate = () => {
    try {
      const people = generatePeople(count, { fields });
      const text = formatPeople(people, format, template);
      setOutput(text);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    if (fsApi) {
      try {
        // @ts-expect-error - not typed in all browsers
        const handle = await window.showSaveFilePicker({
          suggestedName: `people.${format}`,
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (e) {
        setError((e as Error).message);
      }
    } else {
      const { url, revoke } = generateFileDownloadUrl(blob, format);
      const a = document.createElement("a");
      a.href = url;
      a.download = `people.${format}`;
      a.click();
      revoke();
    }
  };

  const saveTemplate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("personTemplate", template);
    }
    setShowTemplate(false);
  };

  const resetTemplate = () => {
    setTemplate(DEFAULT_PERSON_TEMPLATE);
    if (typeof window !== "undefined") {
      localStorage.removeItem("personTemplate");
    }
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Person Generator"
          description="Generate fake person data in various formats with customizable fields."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/file-generator" className="text-primary hover:underline">
            File Generator
          </Link>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="count">Number of people</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Fields</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {ALL_FIELDS.map((f) => (
                    <label key={f} className="flex items-center space-x-2">
                      <Checkbox
                        id={f}
                        checked={fields.includes(f)}
                        onCheckedChange={() => toggleField(f)}
                      />
                      <span className="capitalize">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Format</Label>
                <RadioGroup value={format} onValueChange={(v) => setFormat(v as PersonOutputFormat)} className="mt-2 space-y-1">
                  {Object.values(PersonOutputFormat).map((v) => (
                    <div key={v} className="flex items-center space-x-2">
                      <RadioGroupItem value={v} id={v} />
                      <Label htmlFor={v}>{v.toUpperCase()}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {format === PersonOutputFormat.CUSTOM && (
                <Button type="button" variant="outline" onClick={() => setShowTemplate(true)} className="mt-2 flex items-center gap-1">
                  <Pencil className="h-4 w-4" /> Edit Template
                </Button>
              )}

              <Button onClick={handleGenerate} className="w-full mt-4">
                Generate
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Output</Label>
                {output && (
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Textarea className="min-h-[300px] font-mono" value={output} readOnly placeholder="Generated data will appear here" />
              )}
              {output && (
                <Button onClick={handleSave} className="w-full mt-4 flex items-center gap-1" variant="outline">
                  <FileDown className="h-4 w-4" /> Save as File
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-8 md:py-12">
        <PersonGeneratorExplanation />
      </Container>

      <Dialog.Root open={showTemplate} onOpenChange={setShowTemplate}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-md w-[90vw] max-w-lg space-y-4">
            <Dialog.Title className="text-lg font-medium">Edit Template</Dialog.Title>
            <p className="text-sm text-muted-foreground">
              Available variables: {ALL_FIELDS.map((f) => `{{${f}}}`).join(", ")}
            </p>
            <Textarea value={template} onChange={(e) => setTemplate(e.target.value)} className="font-mono min-h-[150px]" />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={resetTemplate}>Reset</Button>
              <Button onClick={saveTemplate}>Save</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
