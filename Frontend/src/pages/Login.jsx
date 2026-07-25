import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);
  const theme = useThemeStore((state) => state.theme);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!identifier.trim()) {
      setFormError('Please enter your username or email.');
      return;
    }
    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    const success = await login(identifier, password);
    if (success) navigate('/admin');
  };

  const containerClasses = theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200';
  const inputClasses = theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-100 text-zinc-100' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-900 text-zinc-900';
  const buttonClasses = theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white';

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-sm p-10 border rounded-2xl shadow-xl shadow-zinc-200/10 ${containerClasses}`}
      >
        <h2 className="text-2xl font-bold mb-2 text-center tracking-tight">System Auth</h2>
        <p className={`text-center text-sm mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Authenticate to access the pipeline.</p>

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <input
            type="text"
            placeholder="Username or Email"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={`w-full p-4 border rounded-lg focus:ring-2 outline-none transition-all ${inputClasses}`}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-4 border rounded-lg focus:ring-2 outline-none transition-all ${inputClasses}`}
          />
          {(formError || error) && <p className="text-sm text-red-500">{formError || error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-semibold transition-colors mt-4 disabled:opacity-50 ${buttonClasses}`}
          >
            {isLoading ? 'Authenticating...' : 'Authenticate'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}