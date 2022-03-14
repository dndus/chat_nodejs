const path = require('path')
const express = require('express');

const app = express();

// Here you set your static folder
app.use(express.static(path.join(__dirname, 'public')))
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));