// Consistent max-width + horizontal rhythm for every page.
// Keeps content readable on ultra-wide monitors without fighting Tailwind
// breakpoints page-by-page.
export default function PageContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
