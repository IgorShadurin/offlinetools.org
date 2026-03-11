import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Undo and Redo in JSON Editors: Shortcuts, Limits, and Fixes | Offline Tools",
  description:
    "Learn how undo and redo should work in a JSON editor, which shortcuts to use, why redo disappears, and what to expect after format, paste, and large edits.",
};

export default function UndoRedoInJsonEditorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Undo/Redo Functionality in JSON Editors</h1>

      <div className="space-y-6">
        <p>
          A JSON editor with reliable undo and redo is easier to trust. When you are formatting a large payload,
          deleting nested keys, or testing configuration changes, you need to know that one bad edit will not force you
          to start over. Good undo/redo support is not just a convenience feature. It is part of what makes a JSON
          editor safe to use for real work.
        </p>

        <p>
          For most people landing on this topic, the practical questions are simple: which shortcuts should work, what
          actions can be reversed, why redo sometimes disappears, and why formatting or importing JSON can wipe out the
          history stack in some web editors. Those are the areas that matter most in day-to-day use.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Quick Answer</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Undo:</span> <code>Ctrl+Z</code> on Windows/Linux and <code>Cmd+Z</code> on
              macOS.
            </li>
            <li>
              <span className="font-medium">Redo:</span> <code>Cmd+Shift+Z</code> on macOS, and usually{" "}
              <code>Ctrl+Shift+Z</code> in browser-based editors. Some Windows apps also support <code>Ctrl+Y</code>.
            </li>
            <li>
              <span className="font-medium">Redo stops working after a new edit:</span> that is normal. Most editors
              clear the redo branch as soon as you type, paste, or modify the document after an undo.
            </li>
            <li>
              <span className="font-medium">Format and minify should be reversible:</span> ideally as one undo step, not
              hundreds. If they are not, the editor is handling history poorly.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a Good JSON Editor Should Undo</h2>
        <p>
          Users usually do not care how the history stack is implemented. They care whether the editor reverses the
          changes they actually make. In practice, a solid JSON editor should let you undo all of the following without
          surprises:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Expected Undoable Actions</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Typing and deleting:</span> normal text edits, backspace, paste, cut, and
              replacing selections.
            </li>
            <li>
              <span className="font-medium">Structural edits:</span> adding or removing keys, moving array items,
              changing values, and fixing commas or brackets.
            </li>
            <li>
              <span className="font-medium">Whole-document actions:</span> format, minify, sort keys, normalize
              spacing, or repair minor syntax issues should usually appear as a single history step.
            </li>
            <li>
              <span className="font-medium">Import and replace actions:</span> opening a file or pasting new JSON should
              either create one clear history checkpoint or warn that the previous history will be lost.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How Modern Web Editors Usually Handle Undo/Redo</h2>
        <p>
          Browser-based JSON editors do not all behave the same way. Some rely mostly on the browser&apos;s native text
          editing history. Others use a code editor engine such as CodeMirror and keep a separate application-level
          history. Tree-style JSON editors often need to record structural actions like adding a property or deleting an
          object node.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">What Current Browser and Editor Behavior Means</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Modern browsers expose undo and redo related input events such as <code>historyUndo</code> and{" "}
              <code>historyRedo</code>, but the web app still has to integrate those events cleanly into its own editor
              model.
            </li>
            <li>
              Code editor engines usually group nearby edits together instead of storing every keystroke as a separate
              undo step. That is why one undo often reverses a short burst of typing rather than one character.
            </li>
            <li>
              Whole-document operations are the hardest case. If an editor rewrites the full JSON string in one program
              step, native browser history may reset unless the tool deliberately preserves or recreates the undo stack.
            </li>
          </ul>
          <p className="mt-3 text-sm">
            In current CodeMirror builds, adjacent edits are grouped by default within a short time window, which is
            useful for typing but can surprise users who expect character-by-character undo.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Shortcut Guide for JSON Editors</h2>
        <p>
          Shortcut support is where many people notice inconsistency first. If you are using a browser-based JSON
          formatter or editor and redo seems broken, the shortcut may simply be different from the desktop app you are
          used to.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Shortcut Patterns</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Windows/Linux:</span> <code>Ctrl+Z</code> usually undoes the last change.
              For redo, try <code>Ctrl+Shift+Z</code> first in web editors, then <code>Ctrl+Y</code> if the tool is
              behaving more like a traditional desktop app.
            </li>
            <li>
              <span className="font-medium">macOS:</span> <code>Cmd+Z</code> for undo and <code>Cmd+Shift+Z</code> for
              redo is the expected pattern.
            </li>
            <li>
              <span className="font-medium">Toolbar buttons:</span> good editors mirror the keyboard behavior with undo
              and redo buttons that disable when no history is available.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Redo Disappears So Often</h2>
        <p>
          Redo is not meant to be permanent history. It only works while you are moving forward through the branch you
          just undid. The moment you create a new branch, the old redo path usually vanishes.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Reasons</h3>
          <ul className="list-disc pl-6 space-y-3 mt-2">
            <li>
              <span className="font-medium">You made a new edit after undo:</span> this is the most common cause. A new
              keystroke, paste, or formatting action usually clears the redo stack.
            </li>
            <li>
              <span className="font-medium">The app replaced the entire document:</span> importing a file, reloading
              data, prettifying, minifying, or applying a repair step may rebuild the full JSON buffer and drop native
              history.
            </li>
            <li>
              <span className="font-medium">Focus moved away from the editor:</span> the shortcut may be reaching the
              browser, a modal, or another input field instead of the JSON editor itself.
            </li>
            <li>
              <span className="font-medium">The editor caps history for performance:</span> very large JSON documents can
              force tools to limit snapshot depth or compress history aggressively.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Example: What Clean Undo/Redo Should Feel Like</h2>
        <p>Imagine that you paste a compact JSON payload into a web editor and start refining it.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Starting JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "service":"billing","retry":3,"timeout":30,"features":{"audit":true}
}`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-4">Actions Taken</h3>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>Click Format so the JSON becomes readable.</li>
            <li>Change <code>"timeout"</code> from <code>30</code> to <code>300</code>.</li>
            <li>Accidentally remove the <code>"retry"</code> key.</li>
          </ol>

          <h3 className="text-lg font-medium mt-4">Expected Undo Sequence</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              The first undo should restore the deleted <code>"retry"</code> entry.
            </li>
            <li>
              The second undo should restore <code>"timeout": 30</code>.
            </li>
            <li>
              The third undo should usually revert the formatting pass as one single action, returning to the compact
              version you started with.
            </li>
            <li>
              Redo should then move forward through those same steps in order, until you make a fresh edit.
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-4">Formatted State After Step 2</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`{
  "service": "billing",
  "retry": 3,
  "timeout": 300,
  "features": {
    "audit": true
  }
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Undo/Redo in a JSON Editor</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Undo does nothing:</span> click inside the editor first. Browser shortcuts
              only affect the currently focused control.
            </li>
            <li>
              <span className="font-medium">Undo removes too much at once:</span> the editor is probably grouping nearby
              edits into one history event. That is normal in many code editors.
            </li>
            <li>
              <span className="font-medium">History vanished after paste, format, or import:</span> the tool likely
              replaced the entire document programmatically instead of preserving the existing history.
            </li>
            <li>
              <span className="font-medium">Behavior feels inconsistent in the browser:</span> some browser-driven
              changes, such as autocomplete, spell correction, password managers, or IME flows, do not always behave
              like ordinary keystrokes in web editor history.
            </li>
            <li>
              <span className="font-medium">Large files feel fragile:</span> use checkpoints before bulk transforms.
              Some editors shorten history depth on large JSON to control memory usage.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What to Look for Before You Trust a JSON Editor</h2>
        <p>
          If undo and redo matter for your workflow, test three things immediately: can the editor undo a formatting
          pass as one step, can it restore a deleted nested object cleanly, and does redo still work predictably until
          you make a new change. Those quick checks tell you more about the quality of the editing experience than a
          long feature list.
        </p>

        <p>
          In short, the best JSON editors make history feel boring and predictable. That is exactly what you want.
          Every change should be reversible, every shortcut should match user expectations, and whole-document actions
          should not quietly destroy your ability to recover.
        </p>
      </div>
    </>
  );
}
