import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="h-full w-full bg-gray-100">
      <header className="w-full bg-white shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-x-8 py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-800">Paygilant's Blog</h1>
          <nav className="flex gap-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/new" className="text-blue-500 hover:underline">
              New Post
            </Link>
          </nav>
        </div>
      </header>
      <main className="px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
