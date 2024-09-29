"use client";
import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";

interface ChatMessage {
  id: number;
  message: string;
  sender: string;
}

const Page = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, message: "Hello", sender: "John Doe" },
    { id: 2, message: "Hi", sender: "Jane Doe" },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      message: inputValue,
      sender: "John Doe",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-[90%] p-5">
        <div className="overflow-y-auto h-full flex flex-col space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 ${
                msg.sender === "John Doe" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`p-3 rounded-lg inline-block max-w-xs ${
                  msg.sender === "John Doe"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-black"
                } shadow-md`}
              >
                <p className="text-sm mb-1 text-left">{msg.message}</p>
                <p
                  className={`text-xs ${
                    msg.sender === "John Doe"
                      ? "text-gray-400"
                      : "text-gray-600"
                  } `}
                >
                  - {msg.sender}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10%] p-4 bg-white shadow-md w-full">
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-gray-500 text-white p-3 rounded-lg ml-2 hover:bg-gray-600 transition"
            onClick={handleSendMessage}
          >
            <BsSendFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
