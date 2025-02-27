import WebcamFeed from "../components/WebcamFeed";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
        Sign Language <span className="text-yellow-300">Recognizer</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200">
        Use your camera to translate sign language gestures into text.
      </p>
      <WebcamFeed />
    </div>
  );
}
