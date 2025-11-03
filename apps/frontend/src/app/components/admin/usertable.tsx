import { User } from "@/types/user";
import { useState } from "react";
import { updateUser, deleteUser } from "@/lib/api";

type Props = {
  users: User[];
  onUserUpdate: (updatedUser: User) => void;
  onUserDelete: (userId: string) => void;
};

export const UserTable = ({ users, onUserUpdate, onUserDelete }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    email: string;
    role: string;
  }>({ email: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      email: user.email,
      role: user.role || "user",
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ email: "", role: "" });
    setError(null);
  };

  const saveEdit = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(userId, editForm);
      onUserUpdate(updatedUser);
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startDelete = (userId: string) => {
    setDeletingId(userId);
    setError(null);
  };

  const cancelDelete = () => {
    setDeletingId(null);
    setError(null);
  };

  const confirmDelete = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      onUserDelete(userId);
      setDeletingId(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => {
            const isEditing = editingId === user.id;
            const isDeleting = deletingId === user.id;

            return (
              <div
                key={user.id}
                className="flex flex-col gap-2 p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-stone-500 font-medium">
                    Email
                  </span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="text-sm border border-stone-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-sm">{user.email}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-stone-500 font-medium">
                    Role
                  </span>
                  {isEditing ? (
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="text-sm border border-stone-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="guest">Guest</option>
                    </select>
                  ) : (
                    <span className="text-sm">{user.role}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-stone-500 font-medium">
                    Auth ID
                  </span>
                  <span className="text-sm text-stone-600 truncate">
                    {user.auth0Id}
                  </span>
                </div>

                {error && (isEditing || isDeleting) && (
                  <p className="text-xs text-primary">{error}</p>
                )}

                {isDeleting && (
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <p className="text-sm text-primary mb-2">
                      Are you sure you want to delete this user?
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveEdit(user.id)}
                        disabled={loading}
                        className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={loading}
                        className="flex-1 px-3 py-1.5 bg-stone-200 text-stone-700 text-sm rounded hover:bg-stone-300 disabled:bg-stone-100 disabled:cursor-not-allowed transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : isDeleting ? (
                    <>
                      <button
                        onClick={() => confirmDelete(user.id)}
                        disabled={loading}
                        className="flex-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        onClick={cancelDelete}
                        disabled={loading}
                        className="flex-1 px-3 py-1.5 bg-stone-200 text-stone-700 text-sm rounded hover:bg-stone-300 disabled:bg-stone-100 disabled:cursor-not-allowed transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(user)}
                        className="flex-1 px-3 py-1.5 bg-stone-100 text-stone-700 text-sm rounded hover:bg-stone-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => startDelete(user.id)}
                        className="flex-1 px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-stone-500">No users found</p>
      )}
    </>
  );
};