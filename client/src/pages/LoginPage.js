import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    console.log("Login form submitted with:", { username, password });

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      console.log("Login response received:", response);

      if (response.ok) {
        const userInfo = await response.json();
        console.log("User info received:", userInfo);
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        console.warn("Login failed: wrong credentials");
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  if (redirect) {
    console.log("Redirecting to home page...");
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input 
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        autoComplete="off"
        />
      <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        autoComplete="off"
        />
      <button>Login</button>
    </form>
  );
}
