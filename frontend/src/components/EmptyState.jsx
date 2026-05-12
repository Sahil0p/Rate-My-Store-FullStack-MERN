export default function EmptyState({ title, subtitle }) {
    return (
      <div className="card flex flex-col items-center justify-center text-center py-10">
        <span className="text-5xl mb-4">📭</span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    );
  }
  