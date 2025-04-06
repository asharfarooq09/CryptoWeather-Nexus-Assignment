export default function GradientButton({ children }) {
  return (
    <div className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 p-[1px]">
      <div className="relative bg-[#1a1c35] rounded-xl transition-all duration-300 group-hover:bg-transparent">
        <div className="px-4 py-3 text-center text-white font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}
