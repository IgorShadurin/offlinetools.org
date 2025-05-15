import type { Metadata } from "next";
import {
  Copy,
  Sparkles,
  Search,
  Settings,
  FoldVertical,
  UnfoldVertical,
  HandHelping,
  Eye,
  Lightbulb,
  Wrench,
  Binary,
  Columns3,
  Code,
  MousePointerClick,
  Tag,
  SquareCheck,
  Info,
  Paintbrush, // Added Paintbrush
  ChevronDown, // Added ChevronDown
  ChevronRight, // Added ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Affordance Design in JSON Formatter Controls | Offline Tools",
  description:
    "Learn how to design effective affordances for controls in JSON formatters and editors to improve user experience.",
};

export default function AffordanceDesignJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> Affordance Design in JSON Formatter Controls
      </h1>

      <div className="space-y-6">
        <p>
          In the world of User Interface (UI) design, <strong>affordance</strong> refers to a design property
          where the appearance of an object suggests its function. A button looks like it can be pressed, a handle
          looks like it can be pulled or turned, and a checkbox looks like it can be ticked. Good affordance makes
          an interface intuitive, reducing the need for instructions and making the user experience smoother.
        </p>
        <p>
          Designing effective affordances for the controls within a JSON formatter or editor is crucial.
          Developers and users interacting with JSON data often need to perform specific actions quickly and
          efficiently, such as formatting, copying, searching, or collapsing parts of the structure. Clear
          affordances guide users without conscious effort, preventing errors and frustration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <HandHelping className="w-6 h-6 mr-2 text-blue-500" /> Why Affordance Matters for JSON Tools
        </h2>
        <p>
          JSON formatters are tools used by a wide range of technical users, from junior developers learning APIs
          to senior engineers debugging complex data structures. While the target audience is technical,
          poor UI design can still hinder productivity. Good affordances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Improve Discoverability:</strong> Users can easily spot controls and understand their purpose.</li>
          <li><strong>Reduce Cognitive Load:</strong> Users don&apos;t have to stop and think about what a control does.</li>
          <li><strong>Prevent Errors:</strong> Unintended actions are less likely when controls are clearly labeled and designed.</li>
          <li><strong>Increase Efficiency:</strong> Common actions become quick and intuitive.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="w-6 h-6 mr-2 text-gray-600" /> Common Controls in JSON Formatters and Their Affordances
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" /> Format / Beautify Button
        </h3>
        <p>
          This is often the primary action: taking raw or poorly formatted JSON text and structuring it with
          indentation and proper line breaks.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>A clearly labeled button like &quot;Format JSON&quot; or &quot;Beautify&quot;.</li>
            <li>An icon suggesting transformation or tidying, like <Sparkles className="inline w-4 h-4 mb-1" /> (Sparkles) or perhaps a subtle <Paintbrush className="inline w-4 h-4 mb-1" /> (Paintbrush).</li>
            <li>A distinct primary button style (color, prominence) if it&apos;s the main action.</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Just an abstract icon with no label or tooltip.</li>
            <li>Burying the function in a menu.</li>
            <li>Ambiguous wording like &quot;Process&quot; or &quot;Go&quot;.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Copy className="w-5 h-5 mr-2 text-blue-500" /> Copy Button
        </h3>
        <p>
          Allows users to quickly copy the formatted or raw JSON content to the clipboard.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>The standard <Copy className="inline w-4 h-4 mb-1" /> (Copy) icon, universally recognized.</li>
            <li>A tooltip that appears on hover: &quot;Copy to Clipboard&quot;.</li>
            <li>Visual feedback after clicking, e.g., the icon changing briefly to <SquareCheck className="inline w-4 h-4 mb-1 text-green-600" /> (Check) or the label changing to &quot;Copied!&quot;.</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>A non-standard icon.</li>
            <li>No visual feedback upon clicking.</li>
            <li>Placing it far away from the content it copies.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Eye className="w-5 h-5 mr-2 text-green-500" /> View Toggles (Tree vs. Raw)
        </h3>
        <p>
          Many formatters offer different ways to view the JSON: as a collapsible tree structure or as raw text.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Toggle buttons or radio buttons with clear labels like &quot;Tree View&quot; and &quot;Raw Text&quot;.</li>
            <li>Icons that visually represent the view, e.g., <Columns3 className="inline w-4 h-4 mb-1" /> (Columns, suggesting structure) for Tree View and <Code className="inline w-4 h-4 mb-1" /> (Code) or <Binary className="inline w-4 h-4 mb-1" /> (Binary/Raw) for Raw Text.</li>
            <li>The currently active view should be visually distinct (highlighted, different color).</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Just icons without labels or tooltips.</li>
            <li>A single button that cycles through views without indicating the current state clearly.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <FoldVertical className="w-5 h-5 mr-2 text-purple-500" /> Collapse / Expand Controls (Tree View)
        </h3>
        <p>
          In tree view, users need to expand and collapse objects and arrays.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Small, clickable icons positioned near the object/array key or opening brace.</li>
            <li>Standard icons like <FoldVertical className="inline w-4 h-4 mb-1" /> (indicating collapsible content below) or <UnfoldVertical className="inline w-4 h-4 mb-1" /> (indicating expanded content). Chevron icons (<ChevronDown className="inline w-4 h-4 mb-1" />, <ChevronRight className="inline w-4 h-4 mb-1" />) are also commonly used and understood.</li>
            <li>The icon&apos;s state clearly indicates whether the section is currently expanded or collapsed.</li>
            <li>A global &quot;Collapse All&quot; / &quot;Expand All&quot; button (e.g., using icons like <FoldVertical className="inline w-4 h-4 mb-1" /> and <UnfoldVertical className="inline w-4 h-4 mb-1" /> or text labels).</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Making the entire key/value area clickable without visual indication.</li>
            <li>Using ambiguous icons.</li>
            <li>No way to collapse/expand large structures quickly.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Search className="w-5 h-5 mr-2 text-indigo-500" /> Search / Filter Input
        </h3>
        <p>
          Allowing users to find specific keys or values within the JSON structure.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>A standard input field, often with a <Search className="inline w-4 h-4 mb-1" /> (Search) icon inside or next to it.</li>
            <li>Placeholder text like &quot;Search keys or values&quot;.</li>
            <li>Clear visual indication of matches in the JSON output (highlighting).</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using a non-standard control for input.</li>
            <li>No visual feedback for the search results.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Settings className="w-5 h-5 mr-2 text-slate-500" /> Settings / Options
        </h3>
        <p>
          Controls for customization like indentation size, theme (light/dark), sorting keys, etc.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Good Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>A <Settings className="inline w-4 h-4 mb-1" /> (Settings) or <Wrench className="inline w-4 h-4 mb-1" /> (Wrench) icon.</li>
            <li>A clearly labeled button &quot;Settings&quot; or &quot;Options&quot;.</li>
            <li>Using standard UI patterns for the settings panel (e.g., checkboxes, radio buttons, dropdowns, sliders) with labels explaining each option.</li>
          </ul>
          <h4 className="text-lg font-medium mt-4">Poor Affordance:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hidden settings or using a generic &quot;More&quot; menu without a clear settings icon.</li>
            <li>Unlabeled input fields or confusing option names.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MousePointerClick className="w-6 h-6 mr-2 text-orange-500" /> Designing for Interaction Affordances
        </h2>
        <p>
          Beyond the controls themselves, the JSON output area benefits greatly from interaction affordances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Clickable Keys/Values:</strong> Making keys or values clickable to select them, copy their path (JSONPath), or copy just the value. Highlighting on hover is a good affordance for clickability.</li>
          <li><strong>Collapsible Nodes:</strong> As mentioned, making the toggle area clearly look clickable and indicating state.</li>
          <li><strong>Drag Handles:</strong> (Less common in simple formatters, more in editors) If reordering is possible, visual handles (<Tag className="inline w-4 h-4 mb-1" /> or similar, though not ideal from the list) or cursor changes indicate draggable elements.</li>
          <li><strong>Context Menus:</strong> Right-clicking specific nodes might reveal context-sensitive actions (copy path, delete node, edit value). While the right-click action itself is an affordance, the presence of such features can be hinted at through tooltips or documentation.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-cyan-500" /> Key Takeaways for Developers
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Prioritize clear labeling alongside icons. Not all users recognize all icons instantly.</li>
          <li>Use standard icons where they exist (Copy, Search, Settings).</li>
          <li>Provide tooltips for all icons and less common controls.</li>
          <li>Ensure sufficient contrast and visual hierarchy so controls stand out from the JSON content.</li>
          <li>Offer visual feedback for actions (e.g., button state changes, &quot;Copied!&quot; messages).</li>
          <li>Design interaction points (like collapse toggles or clickable elements) to look clickable (e.g., cursor changes, hover effects).</li>
          <li>Test with different users if possible to see if controls are intuitively understood.</li>
        </ul>

        <p>
          By paying attention to affordance design, developers can transform a functional JSON formatter into a truly user-friendly tool that helps users work with data more efficiently and with less frustration. It&apos;s about making the intended actions obvious through thoughtful visual design.
        </p>
      </div>
    </>
  );
}
