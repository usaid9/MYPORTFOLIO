export default function Shapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-20 left-20" />
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-20" />
    </div>
  );
}
