export default function Footer() {
  return (
    <div className="bg-purple">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} An app for people who want to control
        music through gestures
      </p>
    </div>
  );
}
