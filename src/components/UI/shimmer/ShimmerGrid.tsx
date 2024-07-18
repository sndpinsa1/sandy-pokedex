import ShimmerCard from "./ShimmerCard";

const ShimmerGrid: React.FC = () => {
  const cards = new Array(12).fill(0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-8">
      {cards.map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
};

export default ShimmerGrid;
