import type { Metadata } from "next";
import { Code, Layers, Feather, Gauge } from "lucide-react"; // Import necessary icons

export const metadata: Metadata = {
  title: "Lua JSON Libraries for Game Development | Offline Tools",
  description:
    "Explore popular Lua libraries for handling JSON data in game development contexts, covering pure Lua and C-based options.",
};

export default function LuaJsonLibrariesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3" size={32} />
        Lua JSON Libraries for Game Development
      </h1>

      <div className="space-y-6">
        <p>
          In the world of game development, handling structured data is a common necessity. Whether it's for
          configuration files, saving game state, communicating between client and server, or defining level layouts, a
          flexible and portable data format is crucial.{" "}
          <a
            href="https://www.json.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            JSON (JavaScript Object Notation)
          </a>
          has become a de facto standard due to its human-readable format and ease of parsing across different platforms
          and languages.
        </p>
        <p>
          For game developers using Lua, a lightweight and embeddable scripting language popular in game engines like
          Roblox, Defold, Love2D, and as a scripting layer in C++/C# engines, working with JSON requires external
          libraries. Unlike some other languages, Lua does not have built-in support for encoding and decoding JSON
          strings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers className="mr-2" size={24} />
          Why Use JSON in Games?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Configuration:</strong> Storing game settings, editor configurations, or initial parameters in an
            easily editable and shareable format.
          </li>
          <li>
            <strong>Data Storage:</strong> Saving player progress, inventory, world state, or defining item properties.
          </li>
          <li>
            <strong>Networking:</strong> Exchanging data between game clients and servers, or between different game
            components.
          </li>
          <li>
            <strong>Content Definition:</strong> Describing levels, NPCs, dialogue trees, or quest data in a structured
            way.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Feather className="mr-2" size={24} />
          Popular Lua JSON Libraries
        </h2>
        <p>
          Several libraries are available for handling JSON in Lua, each with its own strengths. They generally provide
          two core functions: encoding Lua tables/values into JSON strings and decoding JSON strings back into Lua
          tables/values.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. `json.lua` (by rxi)</h3>
        <p>
          This is a simple, pure Lua implementation. It's often favored for its ease of integration – you usually just
          need to include the single <code>json.lua</code> file in your project. It's great for basic use cases where
          maximum performance isn't the absolute priority.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example using <code>json.lua</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`-- Assuming json.lua is available in your Lua path
local json = require("json")

-- Encoding a Lua table to JSON string
local game_data = {
    playerName = "Hero",
    level = 10,
    items = {"Sword", "Shield", "Potion"},
    isAlive = true,
    position = {x = 100, y = 50},
    lastLogin = nil -- Lua nil becomes JSON null
}

local json_string = json.encode(game_data)
print("Encoded JSON:")
print(json_string)
-- Output might look like: {"items":["Sword","Shield","Potion"],"level":10,"playerName":"Hero","isAlive":true,"position":{"y":50,"x":100},"lastLogin":null}

-- Decoding a JSON string back to a Lua table
local received_json = [[
{
    "task": "load_level",
    "levelId": 5,
    "config": {"difficulty": "hard", "enemies": 20}
}
]]

local decoded_data = json.decode(received_json)
print("\\nDecoded Data:")
print("Task:", decoded_data.task)
print("Level ID:", decoded_data.levelId)
print("Difficulty:", decoded_data.config.difficulty)
`}
            </pre>
          </div>
        </div>
        <p>
          Note the mapping between Lua types and JSON types: Lua Table (associative) → JSON Object, Lua Table (sequence)
          → JSON Array, Lua String → JSON String, Lua Number → JSON Number, Lua Boolean → JSON Boolean, Lua{" "}
          <code>nil</code> → JSON <code>null</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. `cjson` (Lua-cjson)</h3>
        <p>
          <a
            href="http://www.kyne.com.au/~mark/software/lua-cjson.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Lua-cjson
          </a>{" "}
          is a widely used library implemented in C. This makes it significantly faster than pure Lua implementations,
          especially for large JSON data. If performance is critical for networking or processing large configuration
          files, `cjson` is often the preferred choice. However, being a C library means it requires compilation and
          linking, which can make integration slightly more complex depending on your game engine or build system.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example using <code>cjson</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`-- Assuming cjson is installed and available
local cjson = require("cjson")

-- Encoding example (similar API to json.lua)
local player_stats = {
    hp = 100,
    mana = 50,
    stats = {
        strength = 15,
        defense = 12
    }
}

local json_string = cjson.encode(player_stats)
print("Encoded JSON (cjson):")
print(json_string)

-- Decoding example
local config_json = [[
{
    "volume": 0.8,
    "fullscreen": false,
    "resolution": [1920, 1080]
}
]]

local decoded_config = cjson.decode(config_json)
print("\\nDecoded Config (cjson):")
print("Volume:", decoded_config.volume)
print("Fullscreen:", decoded_config.fullscreen)
print("Resolution:", table.concat(decoded_config.resolution, "x"))
`}
            </pre>
          </div>
        </div>
        <p>
          The API is very similar to <code>json.lua</code>, often making it a drop-in replacement if you need a
          performance boost (provided it's compiled for your target platform).
        </p>

        <h3 className="text-xl font-semibold mt-6">3. `dkjson` (by David K. Pritchard)</h3>
        <p>
          Another robust pure Lua JSON library.{" "}
          <a
            href="http://dkolf.de/dkjson/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            dkjson
          </a>{" "}
          is known for its strict adherence to the JSON specification and includes good error reporting. While not as
          fast as `cjson`, it can be more feature-rich or handle edge cases differently than `json.lua`. It's a good
          alternative pure Lua option if `json.lua` doesn't meet your needs or if you value strict specification
          compliance.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example using <code>dkjson</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`-- Assuming dkjson is available
local dkjson = require("dkjson")

-- Encoding example
local level_data = {
    name = "Forest Level 1",
    enemies = {{type = "goblin", pos = {10, 20}}, {type = "orc", pos = {50, 60}}},
    treasures = 5,
    isComplete = false
}

-- dkjson's encode function returns the string and an index (often ignored)
local json_string, _ = dkjson.encode(level_data)
print("Encoded JSON (dkjson):")
print(json_string)

-- Decoding example
local quest_json = [[
{
    "questId": 101,
    "title": "Retrieve the Artifact",
    "objectives": [
        "Find the ancient temple",
        "Defeat the guardian",
        "Collect the artifact"
    ],
    "reward": {"item": "Ancient Sword", "exp": 500}
}
]]

-- dkjson's decode function returns the decoded data and an index (often ignored)
local decoded_quest, _ = dkjson.decode(quest_json)
print("\\nDecoded Quest (dkjson):")
print("Quest Title:", decoded_quest.title)
print("First Objective:", decoded_quest.objectives[1])
print("Reward Item:", decoded_quest.reward.item)
`}
            </pre>
          </div>
        </div>
        <p>
          Like the others, <code>dkjson</code> provides <code>encode</code> and <code>decode</code> functions. The
          handling of options or specific data types might differ slightly, so always check the documentation for the
          chosen library.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Gauge className="mr-2" size={24} />
          Choosing the Right Library
        </h2>
        <p>The best library for your game project depends on your specific needs:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>For simplicity and easy integration:</strong> <code>json.lua</code> or <code>dkjson</code> are
            excellent choices, especially for smaller projects or when avoiding external compilation steps is a
            priority.
          </li>
          <li>
            <strong>For maximum performance:</strong> <code>cjson</code> is the clear winner. This is crucial for games
            that exchange large amounts of data over a network or parse massive configuration files frequently. Be
            mindful of the compilation/dependency step.
          </li>
          <li>
            <strong>For strict JSON compliance and robust error handling:</strong> <code>dkjson</code> is often
            highlighted for these qualities.
          </li>
          <li>
            <strong>Engine Specifics:</strong> Some game engines or platforms might bundle a preferred or optimized JSON
            library (e.g., Defold uses a C++ extension that's API-compatible with `cjson`, Roblox has its own
            `HttpService:JSONEncode`/`JSONDecode`). Always check what's recommended or available in your target
            environment first.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Working with JSON in Lua game development is straightforward once you've integrated a suitable library. By
          understanding the differences between pure Lua and C-based implementations like <code>json.lua</code>,
          <code>dkjson</code>, and <code>cjson</code>, you can select the tool that best fits your project's
          requirements for performance, ease of use, and integration complexity. Whether you're saving game data,
          loading configurations, or sending network messages, a reliable JSON library is an indispensable part of your
          Lua game development toolkit.
        </p>
      </div>
    </>
  );
}
