import { Metadata } from "next";
import { ActionsList } from "./components/actions-list";

export const metadata: Metadata = {
  title: "Actions",
}

export default function Actions() {
  return (
    <div className="px-4 py-6 sm:px-0 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Actions
      </h1>
      <ActionsList />
    </div>
  )
}
