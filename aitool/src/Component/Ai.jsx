

import { useState,useEffect } from "react";
import { ClipboardCopyIcon, LogOut, SparklesIcon } from "lucide-react";
import UserDetails from "./UserDetails";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Logout from "./Logout";

function Ai() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const fetchuserDetails=async()=>{
    auth.onAuthStateChanged(async(user)=>{
        // setUserDetails(user)
        console.log(user)
        const docRef=doc(db,"user",user.uid)
        console.log(db)
        const docSnap= await getDoc(docRef)
        console.log(docRef)
        if(docSnap.exists()){
            setUserDetails(docSnap.data())
            console.log(docSnap.data())
        }else{
            console.log("user is nott logged")
        }
    })
}
useEffect(()=>{
    fetchuserDetails()
},[])
    
  async function generateAnswer() {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCaV9nlhCz0g_vGJy1xhciZlnWwi9YOt-w",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: question.trim() }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

      // Remove all stars (*) from the response text
      generatedText = generatedText.replace(/\*/g, "");

      // Add the question and sanitized answer to the chat history
      setChatHistory((prev) => [
        ...prev,
        { question: question.trim(), answer: generatedText },
      ]);

      setQuestion(""); // Clear the input field
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { question: question.trim(), answer: "Error generating response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <UserDetails/>
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 min-h-screen">
      {/* <Periodic/> */}

      <div className="w-full mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-blue-500 text-white flex items-center">
          <SparklesIcon className="mr-3 text-white" />
          <h1 className="text-2xl font-bold">
          {userDetails ? `${userDetails.firstName} AI` : "Loading..."}
        </h1>
       
        </div>

        {/* Chat Area */}
        <div className="p-4 max-h-[500px] overflow-auto bg-gray-50 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 italic">
              Hey, you can create something special!
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className="space-y-2">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-sm text-right">
                    {chat.question}
                  </div>
                </div>
                {/* AI Answer */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-black px-4 py-2 flex flex-row gap-5 rounded-lg max-w-4xl relative overflow-auto hide-scrollbar">
                    <div>{chat.answer}</div>
                    <div><button
                      style={{ wordWrap: "break-word" }}
                      onClick={() => handleCopy(chat.answer)}
                      className="absolute top-2 right-2 whitespace-pre-wrap break-words text-gray-500 hover:text-blue-600 transition"
                      title={copied ? "Copied!" : "Copy to clipboard"}
                      >
                      {copied ? (
                          <span className="text-green-500">✓</span>
                      ) : (
                        <ClipboardCopyIcon className="h-5 w-5" />
                    )}
                    </button></div>
                    {/* <ReactMarkdown className="overflow-auto hide-scrollbar">{chat.answer}</ReactMarkdown> */}
                  </div>
                </div>
              </div>
            ))
        )}
        </div>

        {/* Input Area */}
        <div className="p-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            rows="3"
            ></textarea>

          <button
            onClick={generateAnswer}
            disabled={loading || !question.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                Thinking...
              </div>
            ) : (
                "Generate Response"
            )}
          </button>
        </div>
      </div>
    </div>
            </>
  );
}

export default Ai;
