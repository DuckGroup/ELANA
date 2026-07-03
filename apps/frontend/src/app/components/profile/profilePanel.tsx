"use client";
import { useState } from "react";
import { updateUser, deleteUser } from "@/lib/api";

type Props = {
  userId: string;
  email: string;
  role: string;
};

export const ProfilePanel = ({ userId, email, role }: Props) => {
  const [currentEmail, setCurrentEmail] = useState(email);
  const [draftEmail, setDraftEmail] = useState(email);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateUser(userId, { email: draftEmail });
      setCurrentEmail(updated.email ?? draftEmail);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError(null);
    try {
      await deleteUser(userId);
      window.location.href = "/auth/logout";
    } catch (err) {
      console.error("Failed to delete profile:", err);
      setError("Could not delete profile.");
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 border border-stone-200 rounded-2xl bg-white shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-stone-500 font-medium uppercase">
          Email
        </span>
        {editing ? (
          <div className="flex gap-2">
            <input
              type="email"
              value={draftEmail}
              onChange={(e) => setDraftEmail(e.target.value)}
              className="grow border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-2 bg-primary text-white text-sm rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setDraftEmail(currentEmail);
              }}
              className="px-3 py-2 bg-stone-100 text-stone-700 text-sm rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>{currentEmail}</span>
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-primary hover:underline"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-stone-500 font-medium uppercase">
          Role
        </span>
        <span className="text-sm capitalize">{role}</span>
      </div>

      {error && <p className="text-sm text-primary">{error}</p>}

      <div className="border-t border-stone-200 pt-4">
        {confirmingDelete ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-stone-600">
              Are you sure? This permanently removes your account.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-3 py-2 bg-primary text-white text-sm rounded disabled:opacity-50"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="px-3 py-2 bg-stone-100 text-stone-700 text-sm rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmingDelete(true)}
            className="text-sm text-primary hover:underline"
          >
            Delete account
          </button>
        )}
      </div>
    </div>
  );
};
