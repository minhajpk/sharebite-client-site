import { useQuery, useMutation } from "@tanstack/react-query";
import { FaUserShield, FaUtensils, FaHandHoldingHeart, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/axiosSecure";

const ManagerUser = () => {
  const axiosSecure = useAxiosSecure();

  // Get all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Update user role
 const { mutateAsync: updateRole } = useMutation({
  mutationFn: async ({ id, role }) => {
    const res = await axiosSecure.patch(`/users/${id}/role`, { role });
    return res.data;
  },
  onSuccess: () => {
    refetch(); // refresh user list
  },
});


  // Delete user
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, roleLabel, roleValue) => {
    const confirm = await Swal.fire({
      title: `Make this user ${roleLabel}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: roleValue });
      Swal.fire("Success", `${roleLabel} role assigned`, "success");
    } catch (error) {
      Swal.fire("Error", "Role update failed", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteUser(id);
      Swal.fire("Deleted", "User deleted successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto max-w-full px-2">
  <table className="table table-zebra min-w-[600px] max-w-7xl ">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th className="">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u._id}>
          <td className="max-w-xs truncate">{u.name || "N/A"}</td>
          <td className="max-w-xs truncate">{u.email}</td>
          <td>
            <span
              className={`badge ${
                u.role === "admin"
                  ? "badge-success"
                  : u.role === "restaurant"
                  ? "badge-info"
                  : u.role === "charity"
                  ? "badge-warning"
                  : "badge-ghost"
              }`}
            >
              {u.role || "user"}
            </span>
          </td>
          <td className="space-x-2 whitespace-nowrap">
            <button
              className="btn btn-xs btn-primary"
              onClick={() => handleRoleChange(u._id, "Admin", "admin")}
            >
              <FaUserShield className="mr-1" /> Admin
            </button>
            <button
              className="btn btn-xs btn-info"
              onClick={() => handleRoleChange(u._id, "Restaurant", "restaurant")}
            >
              <FaUtensils className="mr-1" /> Restaurant
            </button>
            <button
              className="btn btn-xs btn-warning"
              onClick={() => handleRoleChange(u._id, "Charity", "charity")}
            >
              <FaHandHoldingHeart className="mr-1" /> Charity
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={() => handleDeleteUser(u._id)}
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
};

export default ManagerUser;
