import Link from "next/link";
import Image from "next/image";

const dishes = [
  { id: 1, name: "Banh Mi", image: "/images/BanhMi.jpg" },
  { id: 2, name: "Banh Xeo", image: "/images/BanhXeo.jpg" },
  { id: 3, name: "Pho", image: "/images/Pho.jpg" },
  { id: 4, name: "Korean Food", image: "/images/KoreaFood.jpg" },
  { id: 5, name: "Table Setting", image: "/images/table.jpg" },
  { id: 6, name: "Pho Special", image: "/images/Pho.jpg" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Food Dashboard</h1>
          <Link href="/login" className="inline-block">
            <button className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Login
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {dish.name}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        Delicious {dish.name.toLowerCase()} prepared with fresh
                        ingredients.
                      </p>
                    </div>
                    <div className="mt-3 text-sm">
                      <button 
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                        aria-label={`View details for ${dish.name}`}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}