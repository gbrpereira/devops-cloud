const express = require('express');
const moment = require('moment-timezone');

module.exports = (client) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({ error: 'Número e mensagem são obrigatórios.' });
    }

    const isGroup = (number) => {
      return number.toString().startsWith('55') && number.toString().length === 12;
    };

    const getCurrentTime = () => {
      return moment().tz(process.env.TZ || 'America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    };

    try {
      // Exemplo de envio de mensagem
      await client.sendMessage(number + '@c.us', message);
      return res.json({ success: true, time: getCurrentTime() });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao enviar mensagem', details: err.message });
    }
  });

  return router;
};
