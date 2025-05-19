import HebrewJoi from "@/helpers/joi/initialHebrewjoi";
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const CouponSharedSchema = {
    shareName: HebrewJoi
            .string()
            .min(2)
            .max(256)
            .required(),
    expiryDate: HebrewJoi
            .date()
            .default(Date.now)
};

export default CouponSharedSchema;
