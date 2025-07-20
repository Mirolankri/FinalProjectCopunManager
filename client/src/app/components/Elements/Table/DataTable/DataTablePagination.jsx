import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"


export function DataTablePagination({table}) {
// check if column "select" exists
  const columns = table.getAllColumns();
  const hasSelectColumn = columns.some(column => column.id === "select");
  
  return (
    <div className="flex items-center justify-between p-2">
      
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">שורות בעמוד</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          עמוד {table.getState().pagination.pageIndex + 1} מתוך{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
        <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">לך לעמוד האחרון</span>
            <ChevronsRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">לך לעמוד הבא</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">לך לעמוד הקודם</span>
            <ChevronLeft />
          </Button>
          
          
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">לך לעמוד הראשון</span>
            <ChevronsLeft />
          </Button>
        </div>
      </div>
      <div className="flex items-center text-muted-foreground  text-sm">
        {hasSelectColumn && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {table.getFilteredSelectedRowModel().rows.length} מתוך{" "}
              {table.getFilteredRowModel().rows.length} שורות נבחרות
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
