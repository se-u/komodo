/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import Search from "@/app/ui/search";
import {Button} from "@/app/ui/button";
import {CreateVoter} from "@/app/ui/buttons";
import StatusBar from "@/app/components/status-bar";

type Props = {};
type Payment = {
  name: string;
  nik: string;
  status: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "name",
    header: "Nama"
  },
  {
    accessorKey: "nik",
    header: "Nik"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
];

const data: Payment[] = [
  {
    name: "John Doe",
    nik: "1892",
    status: "Tervertifikasi",

  },
  {
    name: "John Bear",
    nik: "18923",
    status: "Belum Tervertifikasi",
  }
];

export default function UsersPage({}: Props) {
  return (
      <div className="flex flex-col gap-5  w-full">
        <StatusBar/>
        <PageTitle title="Master Data Voter"/>
        <div className="ml-auto flex items-center space-x-4">
          <Search placeholder="Masukkan Kata Kunci"/>
          <CreateVoter/>
        </div>
        <DataTable columns={columns} data={data}/>
      </div>
  );
}
