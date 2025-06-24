const compromissos = []

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(compromissos)
  }

  if (req.method === 'POST') {
    const { nome, data, horario } = req.body
    if (!nome || !data || !horario) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }
    const novo = { id: Date.now(), nome, data, horario }
    compromissos.push(novo)
    return res.status(201).json(novo)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    const index = compromissos.findIndex(c => c.id == id)
    if (index >= 0) {
      compromissos.splice(index, 1)
      return res.status(200).json({ ok: true })
    } else {
      return res.status(404).json({ error: 'Não encontrado' })
    }
  }

  return res.status(405).end()
}
