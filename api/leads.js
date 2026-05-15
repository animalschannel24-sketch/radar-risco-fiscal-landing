module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      message: 'API de leads funcionando.'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      message: 'Método não permitido.'
    });
  }

    try {
    const { nome, whatsapp, origem, timestamp } = req.body || {};

    if (!nome || !whatsapp) {
      return res.status(400).json({
        ok: false,
        message: 'Campos obrigatórios ausentes.'
      });
    }

    console.log('Novo lead recebido:', {
      nome,
      whatsapp,
      origem: origem || 'landing-radar-risco-fiscal',
      timestamp: timestamp || new Date().toISOString()
    });

    return res.status(200).json({
      ok: true,
      message: 'Lead recebido com sucesso.'
    });
  } catch (error) {    return res.status(500).json({
      ok: false,
      message: 'Erro interno ao processar lead.'
    });
  }
};
