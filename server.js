const express = require('express');
const path = require('path');
const fs = require('fs');

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
		const order_filePath = path.join(__dirname, '/data/orders.json');
		const order_get = fs.readFileSync(order_filePath, 'utf-8');
		const order = JSON.parse(order_get);
		res.json(order);
	} catch {
		res.status(500).json({ error: 'Failed to load order' });
	}
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
