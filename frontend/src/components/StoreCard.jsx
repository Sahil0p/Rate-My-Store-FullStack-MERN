export default function StoreCard({ store, onRate }) {
    return (
      <div className="card flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{store.name}</h3>
  
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {store.address}
        </p>
  
        <p className="font-medium">
          Avg Rating: ⭐ {store.avgRating?.toFixed(1) || 0}
        </p>
  
        <button
          onClick={onRate}
          className="btn-primary mt-auto w-full"
        >
          Rate Store
        </button>
      </div>
    );
  }
  