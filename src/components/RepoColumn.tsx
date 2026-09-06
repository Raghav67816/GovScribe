import { type Repo } from "@/lib/structs";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { DataTableFeatures } from "./data-table-features";

export const repoColumns: ColumnDef<DataTableFeatures, Repo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Repository Title",
  },
  {
    accessorKey: "url",
    header: "URL Link",
    cell: ({ row }) => (
      <a href={row.original.url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
        {row.original.url}
      </a>
    ),
  },
  {
    accessorKey: "status",
    header: "Execution Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "PROCESSING" ? "secondary" : "default"}>
          {status}
        </Badge>
      );
    },
  },
];