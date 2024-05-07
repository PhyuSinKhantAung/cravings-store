"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
type PaginationData = {
  total: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
  limit: number;
};

const Pagination = ({ data }: { data: PaginationData }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNextPageButton = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", nextPage.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  const handlePreviousPageButton = (prevPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", prevPage.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="join">
      <button
        className="join-item btn btn-sm"
        onClick={() => {
          handlePreviousPageButton(data.prevPage);
        }}
        disabled={data.prevPage === 0 ? true : false}
      >
        «
      </button>
      <button className="join-item btn btn-sm">{data.currentPage}</button>
      <button
        className="join-item btn btn-sm"
        onClick={() => {
          handleNextPageButton(data.nextPage);
        }}
        disabled={data.total === data.currentPage * data.limit ? true : false}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
