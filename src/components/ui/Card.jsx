const baseStyle = "rounded-2xl shadow-md border overflow-hidden transition-all duration-200";

const variants = {
  default: "bg-white border-gray-200",
  highlight: "bg-blue-50 border-blue-200 hover:shadow-lg",
  stats: "bg-gray-50 border-gray-200 hover:bg-gray-100",
};

export function Card({ children, variant = "default", className }) {
  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, className }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={`px-6 py-3 border-t border-gray-100 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}
