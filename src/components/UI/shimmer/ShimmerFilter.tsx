const ShimmerFilter: React.FC = () => {
  const filter = new Array(3).fill(0);

  return (
    <>
      {filter.map((ft, index) => {
        return (
          <div
            key={index}
            data-testid="filter-shimmer"
            className="relative inline-block w-full"
          >
            <span className="animate-pulse h-5 w-24 mb-2 hidden md:block pl-3 bg-[#C9DDE2]"></span>
            <div className="animate-pulse h-14 flex w-full text-pk-purple border p-4 text-[16px] bg-[#C9DDE2] outline-pk-purple rounded-lg"></div>
          </div>
        );
      })}
    </>
  );
};

export default ShimmerFilter;
