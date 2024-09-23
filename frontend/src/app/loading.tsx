export default function ApiLoading() {
  return (
    <div className="flex justify-center" aria-label="Now Loading...">
      <div
        className="animate-spin h-20 w-20 my-5 border-8 border-white/50 rounded-full border-b-transparent"
      ></div>
    </div>
  );
}
