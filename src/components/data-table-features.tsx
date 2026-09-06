import { 
  tableFeatures, 
  columnFilteringFeature, 
  rowPaginationFeature, 
  rowSortingFeature, 
  rowSelectionFeature,
  columnVisibilityFeature, // 1. IMPORT THIS
  createFilteredRowModel, 
  createPaginatedRowModel, 
  createSortedRowModel,
  filterFn_includesString,
  sortFn_alphanumeric,
  sortFn_text
} from "@tanstack/react-table"

export const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature, // 2. ADD THIS HERE
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  }
})

export type DataTableFeatures = typeof features
