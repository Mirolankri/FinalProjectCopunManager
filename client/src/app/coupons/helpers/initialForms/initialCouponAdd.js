const initialCouponAdd1 = {
    name: "",
    code: "",
    store: "",
    category: "",
    description: "",
    amount: 0,
    discount: 0,
    used: false,
    website: "",
    expiryDate: Date.now()
};

// expiryDate set to expiryDate + 7 days
const generateRandomData = () => {
    return {
        name: Math.random().toString(36).substring(7),
        code: Math.random().toString(36).substring(7),
        store: Math.random().toString(36).substring(7),
        // category: Math.random().toString(36).substring(7),
        category: "",
        description: Math.random().toString(36).substring(7),
        amount: Math.random() * 100,
        discount: 0,
        used: false,
        website: "",
        expiryDate: Date.now() + 7 * 24 * 60 * 60 * 1000
    }
}
const initialCouponAdd = generateRandomData();

export default initialCouponAdd;