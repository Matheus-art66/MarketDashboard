import { useState } from "react";

// Layout
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

// Páginas
import Dashboard from "./pages/Dashboard";
// import Indicators from "./pages/Indicators";
// import Currency from "./pages/Currency";
// import Settings from "./pages/Settings";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sectionTitles = {
    dashboard: "Dashboard",
    indicadores: "Indicadores Econômicos",
    conversao: "Conversão de Moedas",
    configuracoes: "Configurações",
  };

  const renderPage = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;

      // case "indicadores":
      //   return <Indicators />;

      // case "conversao":
      //   return <Currency />;

      // case "configuracoes":
      //   return <Settings />;

      default:
        return <Dashboard />; 
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col md:ml-72">
        <Header
          title={sectionTitles[activeSection]}
          onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
        />

        {renderPage()}
      </div>
    </div>
  );
}