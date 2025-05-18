const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Dados temporários (em memória)
let contacts = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '11999999999', groups: ['Família'], isFavorite: false },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', phone: '21988888888', groups: ['Trabalho'], isFavorite: true }
];

let groups = [
  { id: 1, name: 'Família' },
  { id: 2, name: 'Trabalho' },
  { id: 3, name: 'Amigos' }
];

// --- ROTAS DE CONTATOS ---

// GET todos os contatos
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// GET contato por ID
app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find(c => c.id === id);
  contact ? res.json(contact) : res.status(404).json({ error: 'Contato não encontrado' });
});

// POST novo contato
app.post('/contacts', (req, res) => {
  const { name, email, phone, groups: contactGroups = [], isFavorite = false } = req.body;
  if (!name || !email || !phone) return res.status(400).json({ error: 'Dados incompletos' });

  const newContact = {
    id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
    name,
    email,
    phone,
    groups: contactGroups,
    isFavorite
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PUT atualizar contato
app.put('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Contato não encontrado' });

  const { name, email, phone, groups: contactGroups = [], isFavorite = false } = req.body;
  contacts[index] = { id, name, email, phone, groups: contactGroups, isFavorite };
  res.json(contacts[index]);
});

// DELETE contato
app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  res.status(204).end();
});

// --- ROTAS DE GRUPOS ---

// GET todos os grupos
app.get('/groups', (req, res) => {
  res.json(groups);
});

// POST novo grupo
app.post('/groups', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Nome do grupo é obrigatório' });

  const exists = groups.some(g => g.name.toLowerCase() === name.toLowerCase());
  if (exists) return res.status(409).json({ error: 'Grupo já existe' });

  const newGroup = {
    id: groups.length > 0 ? groups[groups.length - 1].id + 1 : 1,
    name
  };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// PUT atualizar grupo
app.put('/groups/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const index = groups.findIndex(g => g.id === id);
  if (index === -1) return res.status(404).json({ error: 'Grupo não encontrado' });

  groups[index].name = name;
  res.json(groups[index]);
});

// DELETE grupo
app.delete('/groups/:id', (req, res) => {
  const id = Number(req.params.id);
  const group = groups.find(g => g.id === id);
  if (!group) return res.status(404).json({ error: 'Grupo não encontrado' });

  // Remove o grupo dos contatos também
  contacts = contacts.map(contact => ({
    ...contact,
    groups: contact.groups?.filter(g => g !== group.name) || []
  }));

  groups = groups.filter(g => g.id !== id);
  res.status(204).end();
});

// Inicialização
app.listen(PORT, () => {
  console.log(`API de contatos rodando em http://localhost:${PORT}`);
});
