import Navbar from "../component/Navbar";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import packageJson from "../../package.json";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsAdmin, setIsLoggedIn } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${packageJson.domain.ipbackend}/member/login`, {
        Username: username,
        Password: password,
      });

      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      const isAdmin = response.data.isAdmin;

      if (isAdmin === "Admin") {
        setIsAdmin("Admin");
        setIsLoggedIn(true);

        window.location = "/admin/template";
      } else if (isAdmin === "User") {
        setIsAdmin("User");
        setIsLoggedIn(true);

        window.location = "/user/homepage";
      } else {
        setError("Access Denied: You do not have permission to access.");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center ">
        <form onSubmit={handleLogin}>
          <div className="  rounded-3xl p-14 flex flex-col gap-10 mt-20">
            <h1 className=" text-[#22269E] text-4xl font-medium">
              Welcome back!
            </h1>
            <div>
              <h2>Username</h2>
              <label htmlFor="username">
                <input
                  className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div>
              <h2>Password</h2>
              <label htmlFor="password">
                <input
                  className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button
              type="submit"
              className="text-center text-white bg-[#22269E] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px] hover:bg-[#060673]"
            >
              Log in
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
