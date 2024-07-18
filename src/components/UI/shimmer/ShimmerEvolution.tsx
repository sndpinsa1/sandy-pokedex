const ShimmerEvolution: React.FC = () => {
  const evolutions = new Array(3).fill(0);
  return (
    <div className="flex items-center justify-between gap-4 md:gap-8">
      {evolutions.map((evolution, index) => (
        <>
          <div
            key={index}
            className="animate-pulse flex-grow-1 border p-2 md:p-4 py-4 rounded-md text-center border-dashed border-poke-card cursor-pointer"
          >
            <div className="md:h-32 md:w-32 h-20 w-14 bg-gray-300 rounded-2xl my-2 md:my-4"></div>
            <div className="h-6 hidden md:block bg-gray-300 rounded mb-2 md:mx-4"></div>
            <div className="h-4 hidden md:block bg-gray-300 rounded mx-12"></div>
          </div>
          {index < evolutions.length - 1 && (
            <span className="text-2xl">
              <i className="fa fa-arrow-right" />
            </span>
          )}
        </>
      ))}
    </div>
  );
};

export default ShimmerEvolution;
