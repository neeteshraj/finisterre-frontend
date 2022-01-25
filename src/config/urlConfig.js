// const api ='http://localhost:2000/'
const api = 'http://192.168.0.104:2000/'
const generatePublicUrl = (fileName) => {
    return `http://192.168.0.104:2000/src/uploads/products/${fileName}`;
}
export {
    api,
    generatePublicUrl
};