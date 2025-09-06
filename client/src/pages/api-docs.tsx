import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ApiDocsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          👀 Coming soon… get ready for fresh updates and tools!
        </h1>
        <Button
          onClick={() => setLocation("/")}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}