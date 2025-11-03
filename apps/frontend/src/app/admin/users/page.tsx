"use client";
import { useEffect, useState } from "react";
import { UserTable } from "../../components/admin/usertable";
import { getUsers } from "@/lib/api";
import { User } from "@/types/user";

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error: unknown) {
        console.error("Failed to fetch users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleUserDelete = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <main className="flex flex-col px-4 py-2 w-full">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <UserTable
        users={users}
        onUserUpdate={handleUserUpdate}
        onUserDelete={handleUserDelete}
      />
    </main>
  );
}