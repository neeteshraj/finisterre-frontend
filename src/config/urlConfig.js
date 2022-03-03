const api ='http://localhost:2000/'
// const api = 'http://192.168.0.104:2000/'
const generatePublicUrl = (fileName) => {
    return `${api}public/${fileName}`;
}
export {
    api,
    generatePublicUrl
};
