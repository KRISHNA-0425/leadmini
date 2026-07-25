import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';

const features = [
  { title: "Seamless Capture", desc: "Client-side and server-side validated data entry.", delay: 0.1 },
  { title: "State Management", desc: "Instant pipeline updates powered by Zustand.", delay: 0.2 },
  { title: "Secure Access", desc: "Protected administrative routes and stateless authentication.", delay: 0.3 }
];

export default function Landing() {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);

  const cardClasses = theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200';
  const iconClasses = theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100';
  const buttonClasses = theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white';

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col gap-24">
      <section className="text-center flex flex-col items-center max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter"
        >
          Architect your pipeline.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-6 text-lg max-w-xl leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          A high-performance lead capture system designed for modern tech stacks. Built entirely with React and Framer Motion.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/form')}
          className={`mt-10 px-8 py-4 rounded-lg font-semibold tracking-wide transition-colors ${buttonClasses}`}
        >
          Get Started
        </motion.button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: feat.delay, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`p-8 rounded-2xl border shadow-sm transition-colors ${cardClasses}`}
          >
            <div className={`h-10 w-10 mb-6 rounded-full flex items-center justify-center ${iconClasses}`}>
              <div className={`h-4 w-4 rounded-sm ${theme === 'dark' ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>{feat.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}