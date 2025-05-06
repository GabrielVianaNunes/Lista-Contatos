const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados temporário (em memória)
let contacts = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '11999999999' },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', phone: '21988888888' }
];

// Rotas

// GET all
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// GET by ID
app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(c => c.id === id);
  contact ? res.json(contact) : res.status(404).json({ error: 'Contato não encontrado' });
});

// POST
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ error: 'Dados incompletos' });

  const newContact = {
    id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
    name,
    email,
    phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PUT
app.put('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Contato não encontrado' });

  const { name, email, phone } = req.body;
  contacts[index] = { id, name, email, phone };
  res.json(contacts[index]);
});

// DELETE
app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  res.status(204).end();
});

// Inicialização
app.listen(PORT, () => {
  console.log(`API de contatos rodando em http://localhost:${PORT}`);
});
