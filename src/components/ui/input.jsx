export function Input({ label, type = "text", ...props }) {
    return (
      <div className="flex flex-col space-y-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
          type={type}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
          {...props}
        />
      </div>
    );
}
  