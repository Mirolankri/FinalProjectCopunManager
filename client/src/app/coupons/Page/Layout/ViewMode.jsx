'use client'
import { IconButton } from "@/components/animate-ui/buttons/icon";
import { AlignJustify, LayoutGrid } from "lucide-react";
import React from "react";

const ViewMode = ({ view, onHandleViewChange }) => {
  return (
    <div className="flex items-center gap-2 z-[900]">
      <div>מצב תצוגה:</div>
      <div>
        <IconButton
          icon={LayoutGrid}
          size="md"
          active={view === "grid"}
          onClick={() => onHandleViewChange("grid")}
          showhover={view === "grid"}
        />
      </div>
      <div>
        <IconButton
          icon={AlignJustify}
          size="md"
          active={view === "list"}
          onClick={() => onHandleViewChange("list")}
          showhover={view === "list"}
        />
      </div>
    </div>
  );
};

export default ViewMode;
