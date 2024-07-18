const ShimmerCard: React.FC = () => {
  return (
    <div className=" bg-[#C9DDE2] animate-pulse border p-4 rounded-md text-center border-dashed border-gray-400 cursor-pointer">
      <div className="h-32 bg-pk-green-light rounded-2xl mb-8 mt-4"></div>
      <div className="h-6 bg-pk-green-light rounded mb-4 mx-4"></div>
      <div className="h-4 bg-pk-green-light rounded mx-12"></div>
    </div>
  );
};

export default ShimmerCard;
