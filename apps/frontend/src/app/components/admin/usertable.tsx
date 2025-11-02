import { User } from "@/types/user";

type Props = {
  users: User[];
};

export const UserTable = ({ users }: Props) => {
  return (
    <>
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-2 p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex flex-col">
                <span className="text-xs text-stone-500 font-medium">
                  Email
                </span>
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-stone-500 font-medium">Role</span>
                <span className="text-sm">{user.role}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-stone-500 font-medium">
                  Auth ID
                </span>
                <span className="text-sm text-stone-600 truncate">
                  {user.auth0Id}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-stone-500">No users found</p>
      )}
    </>
  );
};
