

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    component: JSX.Element
    title: string
  }[],selectedRoute: string,setRoute: (route: string) => void
}

export function SidebarNav({ className, items, selectedRoute,setRoute }: SidebarNavProps) {

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
    >
      {items.map((item) => (
        <a
          key={item.title}
          href={item.title}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            selectedRoute == item.title
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
          onClick={(e) => {
            e.preventDefault()
            setRoute(item.title)
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}