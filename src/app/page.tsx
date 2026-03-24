import { AccountSidebar } from "@/components/account-sidebar";
import { User } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <AccountSidebar
        trigger={
          <>
            <User className="size-5" />
            Open Account
          </>
        }
      />
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        Click “Open Account” to open the sidebar.
      </p>
    </div>
  );
}
