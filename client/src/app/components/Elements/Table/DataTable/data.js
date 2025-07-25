import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleDashed,
    CircleDotDashed,
    CircleOff,
    HelpCircle,
    Timer,
  } from "lucide-react"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: Timer,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: CircleOff,
    },
  ]
  export const activeStatuses = [
    {
      value: "true",
      label: "פעיל",
      icon: CircleDotDashed,
    },
    {
      value: "false",
      label: "לא פעיל",
      icon: CircleDashed,
    }
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
  ]
  export const roles = [
    {
      value: "isAdmin",
      label: "Admin",
    },
    {
      value: "isUser",
      label: "User",
    },
    {
      value: "isSuperAdmin",
      label: "Super Admin",
    },
  ]