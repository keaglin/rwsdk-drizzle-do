"use client";

import { cn } from "@/app/lib/utils";
import * as React from "react";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  
  const contextValue = React.useMemo(() => {
    return {
      value: value !== undefined ? value : internalValue,
      onChange: (newValue: string) => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      },
    };
  }, [value, internalValue, onValueChange]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 items-center justify-center border-b",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabTrigger({ value, children, className, ...props }: TabTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabTrigger must be used within a Tabs component");
  }

  const isActive = context.value === value;

  return (
    <button
      className={cn(
        "px-3 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
        isActive
          ? "border-slate-900 text-slate-900"
          : "border-transparent text-slate-500 hover:text-slate-700",
        className
      )}
      onClick={() => context.onChange(value)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabContent({ value, children, className, ...props }: TabContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabContent must be used within a Tabs component");
  }

  if (context.value !== value) {
    return null;
  }

  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabTrigger, TabContent };