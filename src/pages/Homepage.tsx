import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./MainHeader";

const Homepage = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-800 to-black opacity-30 rounded-full blur-[120px] z-0" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-700 to-black opacity-30 rounded-full blur-[120px] z-0" />

        <div className="z-10 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold">
            Get started with the{" "}
            <span className="text-blue-500">Gemini API</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg">
            Google AI Studio is the fastest way to start building with Gemini,
            our next generation family of multimodal generative AI models.
          </p>

          <button
            onClick={signIn}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg rounded-full shadow-lg hover:opacity-90 transition"
          >
            Sign in to Google AI Studio
          </button>
        </div>

        <div className="z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          <div className="bg-[#111] rounded-xl p-6 border border-gray-700 text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              Try the 1 million token context window
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Explore what is possible with the 1 million token context window.
            </p>
            <button className="px-4 py-2 text-sm bg-gray-800 rounded-full hover:bg-gray-700">
              Try it out
            </button>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-gray-700 text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              Get a Gemini API Key
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Grab your API key and start integrating Gemini models into your
              apps.
            </p>
            <button className="px-4 py-2 text-sm bg-gray-800 rounded-full hover:bg-gray-700">
              Get your API key
            </button>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-gray-700 text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              Prompt Gallery
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Visit our prompt gallery for examples of what’s possible with
              Gemini models.
            </p>
            <button className="px-4 py-2 text-sm bg-gray-800 rounded-full hover:bg-gray-700">
              Explore the Gallery
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
