import { getOrders } from "@/lib/api";
import { OrderStatus } from "@/types/order";

// Fetches live data, so render at request time instead of at build time
// (static prerendering has no backend to call and times the build out).
export const dynamic = "force-dynamic";

const statusClass = (status: OrderStatus) => {
  const map: Record<OrderStatus, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    ACTIVE: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-stone-200 text-stone-600",
  };
  return map[status] ?? "bg-stone-100 text-stone-600";
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <main className="flex flex-col px-4 py-2 w-full">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-stone-500">No orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-stone-200 rounded-lg">
            <thead className="bg-stone-50 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const products = order.basket?.products ?? [];
                const total = products.reduce((sum, p) => sum + p.price, 0);
                return (
                  <tr key={order.id} className="border-t border-stone-200">
                    <td className="p-3 font-mono text-xs">
                      {order.id.slice(-6)}
                    </td>
                    <td className="p-3">{order.basket?.user?.email ?? "—"}</td>
                    <td className="p-3">{products.length}</td>
                    <td className="p-3">{total} kr</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString("sv-SE")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
