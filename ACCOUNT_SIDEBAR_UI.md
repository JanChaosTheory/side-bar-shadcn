# Account sidebar UI

The Account and My Profile experience uses **shadcn/ui** with the **base-nova** style on **@base-ui/react** (Base UI), consistent with `components.json`.

## `@/components/ui` used in Account + Profile

- **Sheet** — account drawer, profile overlay
- **Button** — actions, grid tiles, headers, links (`variant="link"` where needed)
- **buttonVariants** — `SheetTrigger` styling (no nested `<button>`)
- **Switch** — preferences toggles (`id` + **Label** `htmlFor` for ghost / early access)
- **Select** — language, timezone, odds (`id` + **Label** `htmlFor`)
- **Card** / **CardHeader** / **CardContent** / **CardTitle** / **CardDescription** — surfaces, section titles, body copy, profile stats, verification steps, highlights, wallet/account section wrappers
- **Alert** / **AlertTitle** / **AlertDescription** / **AlertAction** — main-screen “not verified yet” strip + **Verify Now**
- **Label** — preference row labels (and profile stat captions)
- **Badge** — 2FA status
- **Separator** — section dividers
- **Tabs** / **TabsList** / **TabsTrigger** / **TabsContent** — profile tabs
- **ScrollArea** — scrollable sheet bodies (account + profile)
- **Avatar** / **AvatarFallback** — user initials
- **Sonner** — **Toaster** in root layout; `toast()` for inactive-button feedback (~2.5s)

## Exceptions (raw HTML / non–`@/components/ui`)

These remain where there is no registry match or they are minimal glue:

- **`header`** — sticky bars with **Button** + **CardTitle** (no shadcn `PageHeader` in project)
- **`div`** — flex/grid shells, scroll column wrappers, absolute screen transitions, icon wrappers in timeline/inbox
- **`span`** — `sr-only` for icon-only **Button**s; decorative emoji/`aria-hidden` bits inside **CardTitle**/**CardDescription**
- **`ul` / `li`** — benefit bullet list inside **CardDescription**; profile **highlights** list (items wrap **Card** rows)
- **`strong`** — emphasis inside identity **CardDescription**
- **`React.Fragment`** — verification step `map` keys
- **Lucide** (`lucide-react`), **`cn`**, **`sonner` `toast()`**, **`MyProfilePanel`** import

Verification **timeline** connectors and step “node” circles stay custom **`div`**s (no shadcn **Stepper** here).
