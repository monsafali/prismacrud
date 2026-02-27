"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  name: string | null;
};

export default function EditUserPage() {
  const params = useParams();
  const id = params?.id as string; // ensure string
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch single user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data: User = await res.json();
        setEmail(data.email);
        setName(data.name || "");
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  // ✅ Update user
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      router.push("/users"); // navigate back to list
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading user...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit User</h1>
      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
          Update User
        </button>
      </form>
    </div>
  );
}
