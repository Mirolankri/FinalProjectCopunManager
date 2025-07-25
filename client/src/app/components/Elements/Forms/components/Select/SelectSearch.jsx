"use client"

import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SelectSearch({
  options = [],
  placeholder = "בחר אפשרות...",
  searchPlaceholder = "חפש...",
  emptyMessage = "לא נמצאו תוצאות",
  value: externalValue,
  onChange,
  className = "w-[200px]",
  disabled = false,
  name,
  Icon,
  colSpan=1,
  required,
  label,
  allowCustomInput = false,
  customInputMessage = "לחץ Enter להוספת ערך חדש"
}) {
    
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const currentValue = externalValue !== undefined ? externalValue : internalValue
  const handleValueChange = externalValue !== undefined ? onChange : setInternalValue
  
  const isCustomValue = currentValue && !options.find(option => option.value === currentValue)
  
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )    
  
  const hasExactMatch = filteredOptions.some(option => 
    option.label.toLowerCase() === searchValue.toLowerCase()
  )

  return (
    <div className={`col-span-${colSpan} `}>
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {required && <span className="text-red-400">*</span>}
          {label}
          </label>
    <Popover open={open} onOpenChange={setOpen} className={``}>
      <PopoverTrigger asChild className={`mt-2`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(className, "justify-between")}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            {Icon && <div className="shrink-0 size-4">{Icon}</div>}
            <span className="truncate">
              {currentValue
                ? (options.find((option) => option.value === currentValue)?.label || currentValue)
                : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(className, "p-0 z-[9999]")} 
        side="bottom" 
        align="start"
        sideOffset={4}
        avoidCollisions={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandInput 
            autoComplete="off"
            placeholder={searchPlaceholder} 
            className="h-9" 
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && allowCustomInput && searchValue.trim() && !hasExactMatch) {
                e.preventDefault()
                if (handleValueChange) {
                  handleValueChange(searchValue.trim(), name)
                }
                setSearchValue("")
                setOpen(false)
              }
            }}
          />
          <CommandList>
            {filteredOptions.length === 0 && searchValue ? (
              <CommandEmpty>
                {allowCustomInput && searchValue.trim() ? (
                  <div className="p-2 text-center">
                    <div className="text-sm text-gray-500 mb-2">{emptyMessage}</div>
                    <div className="text-xs text-blue-600 cursor-pointer hover:text-blue-800"
                         onClick={() => {
                           if (handleValueChange) {
                             handleValueChange(searchValue.trim(), name)
                           }
                           setSearchValue("")
                           setOpen(false)
                         }}>
                      {customInputMessage}: "{searchValue}"
                    </div>
                  </div>
                ) : (
                  emptyMessage
                )}
              </CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {filteredOptions.map((option) => {
                    return (
                      <CommandItem
                        key={`${option.value}`}
                        value={option.label}
                        onSelect={(selectedValue) => {
                          const newValue = option.value === currentValue ? "" : option.value
                          if (handleValueChange) {
                            handleValueChange(newValue, name)
                          }
                          setSearchValue("")
                          setOpen(false)
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            currentValue === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {allowCustomInput && searchValue.trim() && !hasExactMatch && (
                  <CommandGroup>
                    <CommandItem
                      value={searchValue}
                      onSelect={() => {
                        if (handleValueChange) {
                          handleValueChange(searchValue.trim(), name)
                        }
                        setSearchValue("")
                        setOpen(false)
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      הוסף: "{searchValue}"
                    </CommandItem>
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  )
}
