import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { catalogQueryOptions } from "../../(catalog)/catalog.index";
import { DataTable } from "../../../components/data-table/data-table.jsx";
import { columns } from "../../../components/data-table/columns.jsx";

export const Route = createFileRoute("/(admin)/_admin/admin/dashboard")({
  component: AdminDashboard
});


function AdminDashboard() {
  const { data, isError, isLoading } = useQuery(catalogQueryOptions());

  return (
    <div className="w-full">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}

