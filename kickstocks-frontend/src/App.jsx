import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageContainer from "./components/layout/PageContainer";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Main layout shell shared by every route: sticky nav, contained page body,
// quiet footer. Outlet renders the active page (Dashboard / Analysis / Watchlist).
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <Navbar />
      <main className="flex-1">
        <PageContainer className="py-6 sm:py-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
