import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  const navClasses = theme === 'dark'
    ? 'bg-zinc-950/70 border-zinc-800 text-zinc-50'
    : 'bg-white/70 border-zinc-200 text-zinc-900';

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300 ${navClasses}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          LeadDesk<span className="text-zinc-500">Mini</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/admin" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-zinc-50' : 'text-zinc-600 hover:text-zinc-900'}`}>
            Dashboard
          </Link>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}