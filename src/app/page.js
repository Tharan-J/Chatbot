"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const formatMessageContent = (content) => {
    // Replace Markdown-style syntax with HTML
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace **text** with <strong>text</strong>
      .replace(/\* (.*?)/g, '<li>$1</li>'); // Replace * text with <li>text</li>
    
    return (
      <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    );
  };

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap" style={{ marginBottom: '10px' }}>
          {m.role === "user" ? (
            <p style={{ margin: '5px 0' }}><strong>User:</strong> {m.content}</p>
          ) : (
            <div style={{ margin: '5px 0' }}>
              <strong>AI:</strong>
              <div style={{ marginLeft: '10px' }}>
                <ul style={{ padding: '0', margin: '0' }}>
                  {formatMessageContent(m.content)}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
      </form>
    </div>
  );
}
