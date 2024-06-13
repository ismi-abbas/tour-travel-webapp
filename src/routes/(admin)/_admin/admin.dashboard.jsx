import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { catalogQueryOptions } from "../../(catalog)/catalog.index";
import { useState } from "react";

export const Route = createFileRoute("/(admin)/_admin/admin/dashboard")({
  component: AdminDashboard,
});

const defaultData = [
  {
    id: 1,
    type: "HOTEL",
    name: "Melina Beach Resort",
    description:
      "Melina Beach Resort is a family friendly eco-resort with a focus on personal service. Situated on a secluded beach with comfortable and rustic accommodation, we provide a peaceful atmosphere surrounded by nature. Melina Beach is surrounded by primary rainforest and is blessed by a healthy coral reef just off the beach. We enjoy the simple pleasures offered by nature and the company of those around us, promoting an environment of relaxation for our guests to take in the natural surroundings.",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-o/13/0b/83/f7/melina-beach-resort-pulau.jpg",
    category: "hotel",
    subcategory: ["Hotel"],
    address:
      "Paya Jetty Halfway between Kampong Paya and Kampong Genting . Guests should exit the ferry at Kampong Paya., Pulau Tioman 26800 Malaysia",
    address_street_1: "Paya Jetty",
    rating: 4.5,
    phone: "+60 9-419 7080",
    email: "reservations.melina@gmail.com",
    latitude: "2.776205",
    longitude: "104.11872",
    number_of_reviews: "401",
    price_range: "MYR 608 - MYR 670",
    price_level: 2,
    hotel_class: "2.5",
    address_street_2: null,
    city: null,
    state: "Pahang",
    postal_code: "26800",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subcategory", {
    header: "Subcategory",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address_street_1", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rating", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("latitude", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("longitude", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("number_of_reviews", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price_range", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price_level", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hotel_class", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address_street_2", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("state", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("postal_code", {
    cell: (info) => info.getValue(),
  }),
];

function AdminDashboard() {
  const { data, isError, isLoading } = useQuery(catalogQueryOptions());

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="w-full overflow-scroll border rounded-md p-4 bg-white">
        <table className="w-full table table-auto overflow-scroll ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="h-10">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-center text-sm font-light text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
}
