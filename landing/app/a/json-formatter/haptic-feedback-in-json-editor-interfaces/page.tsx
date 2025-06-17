import type { Metadata } from "next";
import React from "react";
import { Vibrate, Hand, Edit, Check, X, Code, BellRing, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Haptic Feedback in JSON Editor Interfaces | Offline Tools",
  description:
    "Explore the benefits and implementation of using haptic feedback to enhance user experience in web-based JSON editors.",
};

export default function HapticFeedbackJsonEditorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Vibrate size={32} /> Haptic Feedback in JSON Editor Interfaces
      </h1>

      <div className="space-y-6">
        <p>
          In the realm of user interface design, particularly for complex tools like JSON editors, providing rich and
          intuitive feedback is crucial. While visual cues and auditory notifications are common, haptic feedback adds
          another dimension by engaging the user&apos;s sense of touch. This article explores how haptic feedback can be
          integrated into web-based JSON editor interfaces to improve the user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Hand size={24} /> What is Haptic Feedback?
        </h2>
        <p>
          Haptic feedback refers to the use of touch sensations, such as vibrations, to communicate information to the
          user. Modern mobile devices and some web browsers support a Haptic Feedback API that allows developers to
          programmatically trigger vibrations. While primarily associated with mobile, this capability is increasingly
          relevant as web applications become more sophisticated and touch interfaces are common on many devices.
        </p>
        <p>
          For a JSON editor, which often involves precise interactions like adding, deleting, or modifying data points
          within a hierarchical structure, subtle tactile confirmations or alerts can significantly enhance usability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check size={24} /> <X size={24} /> Benefits in JSON Editors
        </h2>
        <p>Integrating haptic feedback into a JSON editor offers several potential benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Enhanced User Experience:</strong> Provides a more immersive and responsive feel, making
            interactions feel more physical and direct.
          </li>
          <li>
            <strong>Action Confirmation:</strong> A brief vibration can confirm that an action (like saving, deleting a
            node, or adding a property) was successfully registered by the interface, reducing the need for explicit
            visual confirmation popups in some cases.
          </li>
          <li>
            <strong>Error Notification:</strong> A distinct vibration pattern can alert the user to an error (e.g.,
            invalid JSON syntax, failed save operation) more immediately than just visual cues, especially if their
            attention is focused elsewhere on the screen.
          </li>
          <li>
            <strong>Improved Accessibility:</strong> For users with visual impairments, haptic feedback can provide an
            alternative or supplementary form of notification for critical events.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Vibrate size={24} /> Implementing Haptic Feedback in Web Browsers
        </h2>
        <p>
          The standard way to trigger haptic feedback in web browsers is through the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Haptic_Feedback_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Vibration API
          </a>{" "}
          (part of the Haptic Feedback API). This API is straightforward, primarily involving the `navigator.vibrate()`
          method.
        </p>

        <h3 className="text-xl font-semibold mt-6">The `navigator.vibrate()` Method:</h3>
        <p>
          The `navigator.vibrate()` method can take a single number (duration in milliseconds) or an array of numbers
          (pattern of vibration and pauses).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Basic Usage:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Vibrate for 200 milliseconds
if ('vibrate' in navigator) {
  navigator.vibrate(200);
} else {
  // Haptic Feedback API not supported
  console.warn("Haptic feedback not supported on this device/browser.");
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <BellRing size={20} /> Vibration Pattern:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            An array represents [vibration, pause, vibration, pause, ...].
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Vibrate for 100ms, pause for 50ms, vibrate for 100ms
if ('vibrate' in navigator) {
  navigator.vibrate([100, 50, 100]);
}`}
            </pre>
          </div>
        </div>

        <p>Calling `navigator.vibrate(0)` or `navigator.vibrate([])` cancels any currently ongoing vibration.</p>

        <h3 className="text-xl font-semibold mt-6">Browser Support and Limitations:</h3>
        <p>
          The Vibration API is widely supported on Android browsers and available in Safari on iOS devices with the
          correct configuration, though support can vary. Desktop browsers generally do not support this API as desktop
          hardware typically lacks vibrators. When implementing, always check for `&apos;vibrate&apos; in navigator` to
          ensure the API is available before attempting to use it. This makes the feature progressively enhanced.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Edit size={24} /> Use Cases in a JSON Editor
        </h2>
        <p>Here are specific scenarios where haptic feedback could be valuable in a web-based JSON editor interface:</p>

        <h3 className="text-xl font-semibold mt-6">1. Confirming Successful Actions:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Adding a Property/Item:</strong> A short, crisp vibration (e.g., `navigator.vibrate(50)`) when a new
            key-value pair is added to an object or a new item is added to an array.
          </li>
          <li>
            <strong>Deleting a Property/Item:</strong> A slightly different or perhaps longer vibration (e.g.,
            `navigator.vibrate(75)`) upon successful deletion.
          </li>
          <li>
            <strong>Saving Changes:</strong> A distinct pattern (e.g., `navigator.vibrate([50, 50, 50])`) when the user
            successfully saves the JSON document.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Check size={20} /> Example: Confirming Save
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function handleSaveSuccess() {
  // ... saving logic ...
  if ('vibrate' in navigator) {
    navigator.vibrate([50, 50, 50]); // Pattern for success
  }
  // ... show visual confirmation ...
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Notifying Errors or Warnings:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Invalid JSON Syntax:</strong> A longer, possibly pulsating vibration (e.g., `navigator.vibrate([100,
            30, 100, 30, 100])`) when the editor detects syntax errors upon saving or validation.
          </li>
          <li>
            <strong>Failed Operation:</strong> A strong, single vibration (e.g., `navigator.vibrate(200)`) if a backend
            operation (like saving) fails.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <X size={20} /> Example: Notifying Error
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function handleValidationError() {
  // ... validation failure logic ...
  if ('vibrate' in navigator) {
    // A warning pattern
    navigator.vibrate([100, 30, 100]);
  }
  // ... show visual error message ...
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Indicating State Changes (Less Common):</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Entering/Exiting Edit Mode:</strong> A subtle buzz when transitioning into or out of an in-place
            editing mode for a value.
          </li>
          <li>
            <strong>Drag and Drop:</strong> A small vibration when a draggable element (like a JSON node) is picked up
            or successfully dropped into a valid location.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BellRing size={24} /> Considerations and Best Practices
        </h2>
        <p>While beneficial, haptic feedback should be used thoughtfully to avoid overwhelming or annoying the user.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Subtlety is Key:</strong> For most interface actions, short, subtle vibrations are sufficient.
            Overuse of long or intense vibrations can be jarring.
          </li>
          <li>
            <strong>User Preferences:</strong> Ideally, provide an option in the editor settings for users to enable or
            disable haptic feedback. Not everyone prefers it.
          </li>
          <li>
            <strong>Contextual Use:</strong> Reserve haptic feedback for important or frequent actions where a tactile
            confirmation is genuinely helpful. Avoid vibrating for every single keystroke or minor interaction.
          </li>
          <li>
            <strong>Combine with Other Feedback:</strong> Haptic feedback should complement, not replace, visual and
            auditory feedback. It&apos;s an enhancement, not the sole means of communication.
          </li>
          <li>
            <strong>Accessibility Review:</strong> Ensure that the use of haptics doesn&apos;t negatively impact users
            who rely on screen readers or other assistive technologies. Providing alternatives is important.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} /> Challenges
        </h2>
        <p>Implementing haptic feedback in a web application also comes with challenges:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Browser and Device Consistency:</strong> The intensity and feel of vibrations can vary significantly
            between devices and browsers, making it hard to guarantee a consistent experience.
          </li>
          <li>
            <strong>Lack of Granular Control:</strong> The Vibration API is quite basic. It doesn&apos;t allow control
            over vibration intensity or more complex haptic patterns that might be available natively on some platforms.
          </li>
          <li>
            <strong>User Settings:</strong> Device-level settings (like system-wide vibration being off) can override
            browser API calls.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Conclusion
        </h2>
        <p>
          Haptic feedback offers a compelling way to enrich the user experience in web-based JSON editors by adding a
          tactile layer to interface interactions. When used judiciously for confirming actions or signaling errors, it
          can make the editor feel more responsive, intuitive, and robust. While browser support and control are not
          universally consistent, the Vibration API provides a simple entry point for developers looking to experiment
          with or implement this powerful form of feedback in their web tools. As the web platform evolves, we may see
          more sophisticated Haptic Feedback APIs emerge, further expanding the possibilities for tactile interface
          design.
        </p>
      </div>
    </>
  );
}
