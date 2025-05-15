import type { Metadata } from "next";
import { Award, Star, Users, Lightbulb, Handshake, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Community Awards and Recognition Programs",
  description: "Explore community awards and recognition programs in the JSON ecosystem, highlighting contributions and achievements.",
};

export default function JsonAwardsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        JSON Community Awards and Recognition Programs
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Award className="mr-3 text-yellow-500" size={28} /> What Are They?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Community awards and recognition programs within the JSON ecosystem, like in many technical fields, are initiatives designed to celebrate individuals and groups who have made significant contributions. These contributions can range from developing essential tools and libraries to educating others, fostering community, or advancing the JSON specification itself. They serve as a way to highlight unsung heroes and motivate continued involvement.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Star className="mr-3 text-blue-500" size={28} /> Why Are They Important?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Recognition is a powerful motivator. In open-source and community-driven environments like JSON's surrounding tools and standards, volunteers dedicate time and expertise without direct financial reward. Awards and recognition programs provide:
        </p>
        <ul className="list-none space-y-3 pl-0 mt-4 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Validation:</strong> Acknowledging the value and impact of contributions.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Motivation:</strong> Encouraging continued participation and higher quality work.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Visibility:</strong> Highlighting contributors within the community and potentially beyond.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Community Building:</strong> Strengthening bonds and fostering a positive, appreciative environment.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Lightbulb className="mr-3 text-purple-500" size={28} /> Types of Contributions Recognized
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Contributions that can be recognized vary widely. While specific programs might have their own criteria, common areas include:
        </p>
        <ul className="list-none space-y-3 pl-0 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-red-500 mr-3 mt-1"><GitBranch size={20} /></span>
            <span><strong>Code & Development:</strong> Creating popular JSON libraries, parsers, validators, schema tools, or contributing significantly to their maintenance.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 mt-1"><Lightbulb size={20} /></span>
            <span><strong>Specification & Standards:</strong> Proposing improvements, clarifying documentation, or participating in the evolution of JSON-related standards (like JSON Schema, JSON Pointer, etc.).</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 mt-1"><Users size={20} /></span>
            <span><strong>Community Support & Education:</strong> Answering questions on forums/Stack Overflow, writing tutorials, giving talks, organizing meetups, or mentoring new developers.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 mt-1"><Handshake size={20} /></span>
            <span><strong>Tooling & Infrastructure:</strong> Building essential online tools (formatters, validators), contributing to package managers for JSON tools, or maintaining community infrastructure.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Users className="mr-3 text-teal-500" size={28} /> Getting Involved & Nominate
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          If such programs exist (or are being established) within specific JSON-related communities (e.g., JSON Schema organization, a popular JSON library's community), developers can usually get involved in a few ways:
        </p>
        <ul className="list-none space-y-3 pl-0 mt-4 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 mt-1"><Award size={20} /></span>
            <span><strong>Contribute:</strong> Actively participate in the community by contributing code, documentation, support, or ideas. Consistent, valuable contributions are the foundation for recognition.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 mt-1"><Award size={20} /></span>
            <span><strong>Nominate Others:</strong> Many programs rely on community nominations. If you see someone making a difference, look for opportunities to nominate them. This strengthens the sense of mutual support.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 mt-1"><Award size={20} /></span>
            <span><strong>Participate in Selection:</strong> Some programs involve community voting or panels for selection. Participating helps ensure the recognized contributions are truly valued by the community.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-3 mt-1"><Award size={20} /></span>
            <span><strong>Propose a Program:</strong> If a community lacks a formal recognition system, passionate members can step up to propose and help establish one.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Handshake className="mr-3 text-orange-500" size={28} /> Benefits of Being Recognized
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Receiving community recognition offers several benefits to a developer:
        </p>
        <ul className="list-none space-y-3 pl-0 mt-4 text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Enhanced Reputation:</strong> Builds credibility and visibility within the specific community and the wider tech world.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Networking Opportunities:</strong> Often connects recognized individuals with other key community members, leaders, or even potential employers interested in their demonstrated expertise.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Personal Satisfaction:</strong> The inherent reward of knowing your efforts are valued and have made a positive impact.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3 mt-1"><Star size={20} /></span>
            <span><strong>Career Advancement:</strong> Recognition, especially from a respected community, can be a valuable addition to a resume or professional profile, showcasing initiative, skill, and collaborative ability.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700 dark:text-gray-300">
          <Award className="mr-3 text-green-500" size={28} /> Conclusion
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          While JSON itself is a stable data format, its surrounding ecosystem of tools, libraries, and standards is dynamic and community-driven. Recognition programs, whether formal annual awards or informal shout-outs, play a vital role in nurturing these communities. They ensure that the efforts of developers who build essential parsers, create valuable educational content, or maintain critical infrastructure are seen, appreciated, and celebrated, ultimately benefiting every developer who uses JSON.
        </p>
      </section>
    </div>
  );
}