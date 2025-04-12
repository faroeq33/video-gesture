import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex items-center justify-center w-full p-4 text-sm text-center text-gray-500">
      <ul className="thing">
        <li className="text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} An app for people who want to
          control music through gestures
        </li>

        <li className="text-gray-600">
          <a
            href="https://github.com/faroeq33/video-gesture"
            className="underline"
          >
            <Github className="inline" />
            https://github.com/faroeq33/video-gesture
          </a>
        </li>
      </ul>
    </div>
  );
}
