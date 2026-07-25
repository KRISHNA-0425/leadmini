import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLeadStore } from '../store/useLeadStore';
import { useThemeStore } from '../store/useThemeStore';
import { isValidEmail } from '../lib/validators';

export default function LeadForm() {
  const addLead = useLeadStore((state) => state.addLead);
  const isSubmitting = useLeadStore((state) => state.isSubmitting);
  const error = useLeadStore((state) => state.error);
  const theme = useThemeStore((state) => state.theme);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter a name.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const result = await addLead(formData);
    if (result.success) setSubmitted(true);
  };

  const containerClasses = theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900';
  const inputClasses = theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-100 text-zinc-100 placeholder-zinc-500' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-900 text-zinc-900 placeholder-zinc-400';
  const labelClasses = theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700';
  const buttonClasses = theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white';

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className={`w-full max-w-lg p-10 rounded-3xl border shadow-xl shadow-zinc-200/20 ${containerClasses}`}
      >
        <h2 className="text-2xl font-semibold mb-8 tracking-tight">Initialize Lead.</h2>
        
        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 text-green-400 border-green-900/50' : 'bg-green-50 text-green-700 border-green-200'}`}>
            Data successfully injected into the pipeline.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${labelClasses}`}>Identifier</label>
                <input type="text" required placeholder="John Doe" value={formData.name} className={`p-3 border rounded-lg focus:ring-2 outline-none transition-all ${inputClasses}`} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${labelClasses}`}>Contact Vector</label>
                <input type="email" required placeholder="john@example.com" value={formData.email} className={`p-3 border rounded-lg focus:ring-2 outline-none transition-all ${inputClasses}`} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${labelClasses}`}>Capital Allocation</label>
              <select value={formData.budget} className={`p-3 border rounded-lg focus:ring-2 outline-none transition-all ${inputClasses}`} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                <option value="">Select allocation tier...</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k+">$10,000+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${labelClasses}`}>Payload</label>
              <textarea rows="4" placeholder="Describe the system requirements..." value={formData.message} className={`p-3 border rounded-lg focus:ring-2 outline-none transition-all resize-none ${inputClasses}`} onChange={(e) => setFormData({...formData, message: e.target.value})} />
            </div>

            {(formError || error) && (
              <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{formError || error}</p>
            )}

            <motion.button 
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className={`w-full py-4 mt-2 rounded-lg font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClasses}`} type="submit"
            >
              {isSubmitting ? 'Transmitting...' : 'Transmit Data'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}