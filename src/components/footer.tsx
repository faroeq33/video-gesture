export default function Footer() {
  return (
    <div className="bg-purple">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Een app voor mensen die muziek willen
        bedienen d.m.v gebaren
      </p>
    </div>
  );
}
