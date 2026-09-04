const app = require("./api/index");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`=================================`);
});
