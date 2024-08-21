import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import RequestLists from "../../_components/requests-list";
import { db } from "@/lib/db";
import NoRequestAvailable from "../../_components/noRequestAvailable";
import Search from "@/components/search";
import RequestListsSkeleton from "../../_components/requestTableSkeleton";

export default async function RequestTable({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const requestAvailable = await db.requestForm.count();

  return (
    <div>
      {requestAvailable === 0 ? (
        <NoRequestAvailable />
      ) : (
        <main className="pt-5 px-5">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">All Request</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 mb-6">
              <Search placeholder="Search requests..." />
              <Button>
                <Link href="/admin/create-request">
                  Create Request <span className="text-lg">+</span>
                </Link>
              </Button>
            </div>
          </div>

          <Suspense
            key={query + currentPage}
            fallback={<RequestListsSkeleton />}
          >
            <RequestLists query={query} currentPage={currentPage} />
          </Suspense>
        </main>
      )}
    </div>
  );
}
