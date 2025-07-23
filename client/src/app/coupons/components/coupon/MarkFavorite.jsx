"use client";

import React, { useState } from "react";
import { useUser } from "@/app/components/providers/UserProvider";
import { Star } from "lucide-react";
import ToolTip from "@/app/components/Elements/ToolTip/Index";
import { IconButton } from "@/components/animate-ui/buttons/icon";

const MarkFavorite = ({ coupon, onFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(coupon.favorite);
  const { user } = useUser();

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    setLocalFavorite((prev) => !prev);
    await onFavorite(coupon._id);
    setIsLoading(false);
  };

  return (
    <ToolTip tip="מועדפים">
      <IconButton
        icon={Star}
        size="md"
        active={localFavorite}
        onClick={handleToggleFavorite}
        color={[255, 0, 0]}
      />
    </ToolTip>
  );
};

export default MarkFavorite;
