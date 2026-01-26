"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const { page, limit, total, totalPages } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing 0 to 0 of 0 results
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Page 0 of 0</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
