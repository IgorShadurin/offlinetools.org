import { useState } from 'react'
import './App.css'
import { formatJson, JsonIndentationType } from '../../shared'

// Tool type definition
type Tool = {
  id: string;
  name: string;
  icon: string;
}

// List of tools
const tools: Tool[] = [
  { id: 'json-formatter', name: 'JSON Format/Validate', icon: '{}' },
  { id: 'base64-string', name: 'Base64 String Encode/Decode', icon: '64' },
  { id: 'base64-image', name: 'Base64 Image Encode/Decode', icon: '📷' },
  { id: 'jwt-debugger', name: 'JWT Debugger', icon: '🔑' },
  { id: 'regex-tester', name: 'RegExp Tester', icon: '*' },
]

function App() {
  const [selectedTool, setSelectedTool] = useState<string>('json-formatter')
  const [inputValue, setInputValue] = useState<string>('')
  const [outputValue, setOutputValue] = useState<string>('')
  const [indentation, setIndentation] = useState<JsonIndentationType>(JsonIndentationType.TwoSpaces)

  // Format JSON when the format button is clicked
  const handleFormatJson = () => {
    try {
      const formatted = formatJson(inputValue, { indentation })
      setOutputValue(formatted)
    } catch (error) {
      setOutputValue(`Error: ${(error as Error).message}`)
    }
  }

  // Clear input and output
  const handleClear = () => {
    setInputValue('')
    setOutputValue('')
  }

  return (
    <div className="app-container">
      {/* Left sidebar with tools */}
      <div className="sidebar">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className={`tool-item ${selectedTool === tool.id ? 'selected' : ''}`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span className="tool-name">{tool.name}</span>
          </div>
        ))}
      </div>

      {/* Right content area */}
      <div className="content-area">
        {selectedTool === 'json-formatter' ? (
          <div className="json-formatter">
            <div className="tool-header">
              <h2>JSON Format/Validate</h2>
            </div>
            
            <div className="tool-controls">
              <div className="control-group">
                <label htmlFor="indentation">Indentation:</label>
                <select 
                  id="indentation"
                  value={indentation}
                  onChange={(e) => setIndentation(e.target.value as JsonIndentationType)}
                >
                  {Object.values(JsonIndentationType).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="button-group">
                <button onClick={handleFormatJson}>Format JSON</button>
                <button onClick={handleClear}>Clear</button>
              </div>
            </div>
            
            <div className="editor-container">
              <div className="editor-column">
                <h3>Input:</h3>
                <textarea 
                  className="editor-textarea"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter Your JSON Text"
                />
              </div>
              
              <div className="editor-column">
                <h3>Output:</h3>
                <textarea 
                  className="editor-textarea"
                  value={outputValue}
                  readOnly
                  placeholder="Formatted JSON will appear here"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-tool">
            <h2>{tools.find(t => t.id === selectedTool)?.name}</h2>
            <textarea 
              className="editor-textarea"
              placeholder="This tool is not implemented yet"
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App