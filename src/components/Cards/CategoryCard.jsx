export const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:scale-105"
    >
      <div className="text-5xl mb-3 text-center">{category.icon}</div>
      <h3 className="text-lg font-semibold text-center text-gray-800">
        {category.name}
      </h3>
    </div>
  )
}

export default CategoryCard
