"use client";

import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/app/_components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DEFAULT_MAX_VISIBLE_PAGES = 10;
const RESPONSIVE_MAX_VISIBLE_PAGES = 5;

export function PaginationLists({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(
    DEFAULT_MAX_VISIBLE_PAGES
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setMaxVisiblePages(RESPONSIVE_MAX_VISIBLE_PAGES);
      } else {
        setMaxVisiblePages(DEFAULT_MAX_VISIBLE_PAGES);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getPaginationRange(
    currentPage: number,
    totalPages: number
  ): number[] {
    const range: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }

  return (
    <Pagination>
      <PaginationContent className="flex-wrap pt-10">
        <PaginationItem className="hidden sm:block">
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-40" : ""}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {getPaginationRange(currentPage, totalPages).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={currentPage === pageNumber}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNumber);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > maxVisiblePages && currentPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="hidden sm:block">
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-40" : ""}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
