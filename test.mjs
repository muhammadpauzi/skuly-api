const asd = async () => {
    return new Promise((resolve, reject) => {
        reject({ code: { statusCode: 200 }, test: 'test' });
    });
};

try {
    const a = await asd();
} catch (error) {
    console.log(error.test);
    console.log(error.code);
    console.log(error);
}
