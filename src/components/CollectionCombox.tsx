import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { title } from "radash"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux"
import { setCollection } from "@/reducer/collectionSlice"


export default ()=> {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const dispatch = useDispatch()
  
  const collections = useSelector((state: any) => state.collection.collections)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? title(collections.find((collection) => collection._id === value)?.name)
            : "Select Collection..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Collection..." />
          <CommandEmpty>No collection found.</CommandEmpty>
          <CommandGroup>
            {collections.map((collection) => (
              <CommandItem
                key={collection._id}
                value={collection._id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  dispatch(setCollection(currentValue));
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === collection._id ? "opacity-100" : "opacity-0"
                  )}
                />
                {title(collection.name)}
              </CommandItem>
            ))}
           
          </CommandGroup>
      
        </Command>
      </PopoverContent>
    </Popover>
  )
}
