import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
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
    header: "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address_street_1", {
    header: "Address 1",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("latitude", {
    header: "Latitude",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("longitude", {
    header: "Longitude",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("number_of_reviews", {
    header: "Reviews",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price_range", {
    header: "Price Range",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price_level", {
    header: "Price Level",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hotel_class", {
    header: "Hotel Class",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address_street_2", {
    header: "Address 2",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("state", {
    header: "State",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("postal_code", {
    header: "Postal Code",
    cell: (info) => info.getValue(),
  }),
];
