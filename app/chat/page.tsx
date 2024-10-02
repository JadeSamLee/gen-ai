"use client";
import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import axios from "axios";

interface ChatMessage {
  message: string;
  sender: string;
}

const Page = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputValue, setInputValue] = useState("");

  //const cardContents = [
    //"Provide debugging option for ⚠ Fast Refresh had to perform a full reload. Read more: ",
    //"Provide debugging option for ⚠ Fast Refresh had to perform a full reload. Read more: ",
    //"Provide debugging option for ⚠ Fast Refresh had to perform a full reload. Read more: ",
    //"Provide debugging option for ⚠ Fast Refresh had to perform a full reload. Read more: ",
  //];

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage: ChatMessage = {
      message: inputValue,
      sender: "Krish",
    };

    const response = await axios.post("/api/chat/", {
      prompt: inputValue,
    });

    if (response.data.message === "success") {
      const responseMessage: ChatMessage = {
        message: response.data.data,
        sender: "Bot",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col justify-end bg-gray-100">
      
        <div className="h-full">
          <div className="h-[90%] p-5">
            <div className="overflow-y-auto h-full flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 ${
                    msg.sender === "Krish" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg inline-block max-w-xs ${
                      msg.sender === "Krish"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-black"
                    } shadow-md`}
                  >
                    <p className="text-sm mb-1 text-left">{msg.message}</p>
                    <p
                      className={`text-xs ${
                        msg.sender === "Krish"
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
