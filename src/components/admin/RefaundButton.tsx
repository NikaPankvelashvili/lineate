"use client";
import { createRefund } from "@/src/app/actions";
import { useI18n } from "@/src/locales/client";
import React from "react";

export default function RefaundButton({
  id,
  refunded,
}: {
  id: string;
  refunded: boolean;
}) {
  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };
  const t = useI18n();
  return (
    <>
      {refunded ? (
        <span>REFUNDED</span>
      ) : (
        <button
          onClick={() => refundHandler(id)}
          type="button"
          className="p-1 px-[25px] border border-solid border-[#dc2626] dark:border-[#f87171] text-[18px] text-white dark:text-white font-medium align-middle duration-300 uppercase flex items-center justify-center gap-2 bg-[#dc2626] dark:bg-[#f87171] hover:bg-[#ef4444] dark:hover:bg-red-300 w-[150px]"
        >
          {t("refund")}
        </button>
      )}
    </>
  );
}
