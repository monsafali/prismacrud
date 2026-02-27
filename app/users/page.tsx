"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  name: string | null;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  // ✅ fetch users
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ create user
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });

    setEmail("");
    setName("");
    fetchUsers();
  };

  // ✅ delete user
  const handleDelete = async (id: number) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>

      {/* ✅ Create Form */}
      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {/* ✅ Users List */}
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <b>{user.email}</b> — {user.name}
            {"  "}
            <button onClick={() => router.push(`/users/edit/${user.id}`)}>
              Edit
            </button>
            {"  "}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
