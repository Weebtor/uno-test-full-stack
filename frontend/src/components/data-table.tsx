import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Spinner } from "./ui/spinner";

export interface ResourcePage<T = any> {
  items: T[];
  meta?: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    itemCount: number;
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  //   setPagination?: Dispatch<
  //     SetStateAction<{
  //       pageIndex: number;
  //       pageSize: number;
  //     }>
  //   >;
  //   meta?: ResourcePage<TData>["meta"];
}

const DataTable = <TData, TValue>({
  columns,
  data,
  //   setPagination,
  isLoading,
}: //   meta,
DataTableProps<TData, TValue>) => {
  const enableLocalPagination = true;
  //   const enableLocalPagination = !meta && !setPagination;

  const [localPagination, setLocalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !enableLocalPagination,
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;
      if (enableLocalPagination) {
        const newPageInfo = updater(table.getState().pagination);
        setLocalPagination({
          pageIndex: newPageInfo.pageIndex,
          pageSize: newPageInfo.pageSize,
        });
      }
      //   if (!setPagination) return;
      //   const newPageInfo = updater(table.getState().pagination);
      //   setPagination({
      //     pageIndex: newPageInfo.pageIndex + 1,
      //     pageSize: newPageInfo.pageSize,
      //   });
    },
    state: {
      ...(enableLocalPagination && {
        pagination: localPagination,
      }),
    },
  });

  const isEmpty = !isLoading && data.length === 0;
  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <div className="rounded-md border">
      <div className="space-y-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <Spinner className="h-12 w-12 animate-spin text-primary mx-auto" />
                </TableCell>
              </TableRow>
            ) : isEmpty ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <p className="text-sm text-muted-foreground">
                    No hay datos para mostrar.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Mostrando {table.getRowModel().rows.length} de {data.length}{" "}
            resultados
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="page-size" className="text-sm font-medium mr-2">
                Elementos por página:
              </label>
              <Select
                onValueChange={(value) => {
                  table.setPagination({
                    pageIndex: 0,
                    pageSize: Number(value),
                  });
                }}
                value={String(table.getState().pagination.pageSize)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <div className="text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || isLoading}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
