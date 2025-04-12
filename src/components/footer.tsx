export default function Footer() {
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <p className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} An app for people who want to control
        music through gestures
      </p>
    </div>
  );
}
