import DashboardIcon from "../icons/DashboardIcon";
import TrendingUpIcon from "../icons/TrendingUpIcon";
import DollarIcon from "../icons/DollarIcon";
import SettingsIcon from "../icons/SettingsIcon";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "indicadores", label: "Indicadores", icon: <TrendingUpIcon /> },
  { id: "conversao", label: "Conversão", icon: <DollarIcon /> },
  { id: "configuracoes", label: "Configurações", icon: <SettingsIcon /> },
];
const Sidebar = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-navy text-white p-6 shadow-xl z-50 overflow-y-auto transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-8 pb-6 border-b border-white border-opacity-15">
          <h2 className="text-2xl font-bold tracking-tight">MarketDash</h2>
          <p className="text-xs text-white text-opacity-70 uppercase tracking-widest mt-2">
            Análise de Mercado
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left font-medium text-sm ${
                activeSection === item.id
                  ? 'bg-white bg-opacity-20 text-white border-l-4 border-white'
                  : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 border-l-4 border-transparent'
              }`}
            >
              <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer da Sidebar */}
        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-white border-opacity-15">
          <p className="text-xs text-white text-opacity-60 text-center">
            v1.0.0
          </p>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};
export default Sidebar;