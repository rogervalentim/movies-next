import { Loader } from "lucide-react";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader size={25} className="text-[#3a3cff] animate-spin" />
    </div>
  );
}
