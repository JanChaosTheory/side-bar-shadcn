import { AccountSidebar } from "@/components/account-sidebar";
import { Card, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Home() {
  return (
    <Card className="flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden rounded-none border-0 bg-zinc-50 py-0 shadow-none ring-0 gap-0 dark:bg-zinc-950">
      <AccountSidebar
        trigger={
          <>
            <User className="size-5" />
            Open Account
          </>
        }
      />
      <Card className="mt-4 border-0 bg-transparent py-0 shadow-none ring-0">
        <CardDescription className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Full-width overlay on narrow viewports; side panel on larger screens.
        </CardDescription>
      </Card>
    </Card>
  );
}
