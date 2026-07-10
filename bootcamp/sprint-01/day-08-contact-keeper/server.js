const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});


//Define routes
app.use('/api/users', require('./routes/usersRouts'));
app.use('/api/contacts', require('./routes/contactsRouts'));
app.use('/api/auth', require('./routes/authRouts'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});