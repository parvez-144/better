import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.reload();
  };
  

  return (
    <div className="h-screen flex flex-col bg-[#001f3d] text-white p-4">
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-4xl font-bold p-4 text-yellow-400">Better</span>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Welcome to Better!
        </h1>
        <p className="text-lg text-center mb-8">
          Your journey to excellence starts here.
        </p>
      </div>

      {user ? (
        <div className="flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Welcome back,{" "}
              <span className="text-yellow-400">{user.fullName}!</span>
            </h2>
          </div>
          <div className="flex flex-row justify-center items-center">
          <button className="bg-transparent  border-2 border-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200"
          onClick={handleLogout}
          >
            Log out
          </button>
          </div>
        </div>
      ) : (
        <div className="text-center mb-6">
          <p className="text-lg">Please log in or sign up to continue.</p>
        </div>
      )}

      {!user && (
        <div className="flex flex-row justify-center items-center space-x-2">
          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-md transition-all duration-200">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-transparent border-2 border-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
