import { signIn } from "next-auth/react";
import { useRef } from "react";

export default function LoginForm() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const res = await signIn("credentials", {
      redirect: "/",
      username: enteredUsername,
      password: enteredPassword,
    });

    if(!res?.error) {
      window.location.href = "/"
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input type="text" id="username" name="username" ref={usernameInputRef} required />

      <label htmlFor="password">Password: </label>
      <input type="password" id="password" name="password" ref={passwordInputRef} required />

      <button type="submit">Submit</button>
    </form>
  );
}
