const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/request-delivery', (req, res) => {
    const { pickup, destination } = req.body;
    console.log("New delivery request:", { pickup, destination });
    res.json({ success: true, message: "Delivery request received!" });
});

app.listen(3000, () => console.log('Server running on port 3000'));
