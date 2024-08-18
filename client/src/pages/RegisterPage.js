import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    console.log("Registration form submitted with:", { username, password });

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("Register response received:", response);

      if (response.ok) {
        // Registration was successful
        console.log("Registration successful");
        alert('Registration successful');
      } else {
        // Registration failed, get the error message
        const errorData = await response.json();
        console.warn("Registration failed with status:", response.status, "Message:", errorData.message);
        alert(errorData.message || 'Registration failed');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during registration:", error);
      alert('An unexpected error occurred');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
}
