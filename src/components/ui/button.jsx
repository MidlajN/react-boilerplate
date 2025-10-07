import cn from "../../utils/cn"

export function Button({ variant = "primary", size = "md", className, ...props }) {
  const base = "inline-flex items-center justify-center font-medium rounded-md"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100"
  }
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg"
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
}
