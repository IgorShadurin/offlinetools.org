import { useState, useEffect } from "react";
import { Check, Copy, FileDown, Pencil, Users } from "lucide-react";
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
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { Alert, AlertDescription } from "./ui/alert";
import Modal from "./update/Modal";

interface PersonGeneratorProps {
  className?: string;
}

const ALL_FIELDS = Object.values(PersonField);

export function PersonGenerator({ className = "" }: PersonGeneratorProps) {
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
  }, []);

  const toggleField = (f: PersonField) => {
    setFields((prev) =>
      prev.includes(f) ? prev.filter((v) => v !== f) : [...prev, f]
    );
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
        // @ts-ignore
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
    setShowTemplate(false);
  };

  const resetTemplate = () => {
    setTemplate(DEFAULT_PERSON_TEMPLATE);
  };

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Person Generator</h1>
      </div>
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="space-y-4">
                <div>
                  <label htmlFor="count" className="block text-sm font-medium mb-1">
                    Number of people
                  </label>
                  <input
                    id="count"
                    type="number"
                    min={1}
                    max={100}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-full h-8 px-2 border rounded text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Fields</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {ALL_FIELDS.map((f) => (
                      <label key={f} className="flex items-center space-x-2 text-sm capitalize">
                        <input
                          type="checkbox"
                          checked={fields.includes(f)}
                          onChange={() => toggleField(f)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Format</label>
                  <div className="mt-2 space-y-1">
                    {Object.values(PersonOutputFormat).map((v) => (
                      <label key={v} className="flex items-center space-x-2 text-sm">
                        <input
                          type="radio"
                          name="format"
                          value={v}
                          checked={format === v}
                          onChange={() => setFormat(v)}
                          className="h-4 w-4"
                        />
                        <span className="uppercase">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {format === PersonOutputFormat.CUSTOM && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowTemplate(true)}
                    className="mt-2 flex items-center gap-1 h-8"
                  >
                    <Pencil className="h-3 w-3" /> Edit Template
                  </Button>
                )}

                <Button onClick={handleGenerate} className="w-full mt-4">
                  Generate
                </Button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Output</label>
                  {output && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1 h-7 px-2 text-xs"
                      onClick={handleCopy}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  )}
                </div>
                {error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <Textarea
                    className="min-h-[300px] font-mono"
                    value={output}
                    readOnly
                    placeholder="Generated data will appear here"
                  />
                )}
                {output && (
                  <Button onClick={handleSave} className="w-full mt-4 flex items-center gap-1" variant="outline">
                    <FileDown className="h-4 w-4" /> Save as File
                  </Button>
                )}
              </div>
            </div>
          </div>

      <Modal
        open={showTemplate}
        title="Edit Template"
        onCancel={() => setShowTemplate(false)}
        onOk={saveTemplate}
        okText="Save"
        cancelText="Cancel"
      >
        <p className="text-sm mb-2">
          Available variables: {ALL_FIELDS.map((f) => `{{${f}}}`).join(", ")}
        </p>
        <Textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="font-mono min-h-[150px]"
        />
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={resetTemplate}>
            Reset
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default PersonGenerator;
