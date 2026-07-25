export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Built for Digital Heroes Training Task.{' '}
        <a 
          href="https://digitalheroesco.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-900 dark:text-zinc-100 hover:underline font-medium"
        >
          digitalheroesco.com
        </a>
      </p>
    </footer>
  );
}