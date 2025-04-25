// src/components/ui/Skeleton.jsx
const Skeleton = ({ type = 'card' }) => {
    if (type === 'card') {
      return (
        <div className="card animate-pulse h-[300px]">
          <div className="bg-gray-300 dark:bg-gray-700 h-1/2"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      );
    }
  
    if (type === 'detail') {
      return (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              ))}
            </div>
            <div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  export default Skeleton;
  