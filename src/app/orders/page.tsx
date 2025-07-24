"user client"

export default function OrdersPage() {
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Product</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:block py-6 px-1">545454154545445</td>
            <td className="py-6 px-1">19.02.2024</td>
            <td className="py-6 px-1">80.21</td>
            <td className="hidden md:block py-6 px-1">Pizza(2)</td>
            <td className="py-6 px-1">On the way (10 mins)</td>
          </tr>
          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:block py-6 px-1">545454154545445</td>
            <td className="py-6 px-1">19.02.2024</td>
            <td className="py-6 px-1">80.21</td>
            <td className="hidden md:block py-6 px-1">Pizza(2)</td>
            <td className="py-6 px-1">On the way (10 mins)</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
