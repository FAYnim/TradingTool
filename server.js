const express = require('express');
const path = require('path');
const fs = require('fs');

const indodaxService = require('./services/indodax');

const app = express();
const PORT = 3000;

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/orders', (req, res) => {
	try {
		const order = fs.readFileSync(path.join(__dirname, 'data', 'orders.json'));
		res.json(JSON.parse(order));
	} catch {
		res.status(500).json({ error: 'Failed to load order' });
	}
});

app.get('/api/ticker/:pair', async (req, res) => {
  try {
    const ticker = await indodaxService.getTicker(req.params.pair);
    res.json(ticker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
