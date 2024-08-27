import { db } from "@/src/lib/db";
import React from "react";
import {
  columns,
  Request,
} from "@/src/app/admin/(requests)/request-table/columns";
import { DataTable } from "../../_components/data-table";
import NoRequestAvailable from "@/src/components/noRequestAvailable";

async function getRequests(): Promise<Request[]> {
  const res = await db.requestForm.findMany({
    where: {
      action: "APPROVE",
    },
  });
  return res;
}

// Page component
export default async function Page() {
  const requestCount = await db.requestForm.count();
  const requestData = await getRequests();

  return (
    <main className="pt-5 px-5">
      {requestCount === 0 ? (
        <NoRequestAvailable />
      ) : (
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-left">
            All Approve Requests
          </h1>
          <DataTable columns={columns} data={requestData} />
        </div>
      )}
    </main>
  );
}
