"use client";

import React from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Sign In</button>
    </form>
  );
};
