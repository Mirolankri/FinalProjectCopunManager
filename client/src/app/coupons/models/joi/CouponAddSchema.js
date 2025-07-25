import HebrewJoi from "@/helpers/joi/initialHebrewjoi";
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const CouponAddSchema = {
    name: HebrewJoi
            .string()
            .allow(""),
    code: HebrewJoi
            .string()
            .min(1)
            .max(256)
            .required(),
    store: HebrewJoi
            .string()
            .min(2)
            .max(256)
            .required(),
    category: HebrewJoi
            .string()
            .allow(""),
    description: HebrewJoi
            .string()
            .allow(""),
    amount: HebrewJoi
            .number()
            .required(),
    discount: HebrewJoi
            .number()
            .allow("")
            .default(0),
    used: HebrewJoi
            .boolean()
            .default(false),
    website: HebrewJoi
            .string()
            .ruleset.regex(urlRegex)
            .rule({ message: 'יש להזין כתובת חוקית' })
            .allow(""),
    expiryDate: HebrewJoi
            .date()
            .default(Date.now)
};

export default CouponAddSchema;
