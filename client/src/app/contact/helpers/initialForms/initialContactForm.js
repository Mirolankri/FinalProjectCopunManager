const initialContactForm = {
    fullName: "",
    email: "",
    subject: "",
    message: "",
};
const generateRandomData = () => {
    return {
        fullName: Math.random().toString(36).substring(7),
        email: Math.random().toString(36).substring(7),
        subject: Math.random().toString(36).substring(7),
        message: Math.random().toString(36).substring(7)
    }
}
// const initialContactForm = generateRandomData();

export default initialContactForm;