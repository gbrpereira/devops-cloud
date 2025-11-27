const request = require('supertest');
const express = require('express');
const messageRoutes = require('../app/routes/message');

describe('API /api/message', () => {
  let app;
  let clientMock;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    clientMock = { sendMessage: jest.fn().mockResolvedValue(true) };
    app.use('/api/message', messageRoutes(clientMock));
  });

  it('deve retornar erro se número ou mensagem faltarem', async () => {
    const res = await request(app).post('/api/message').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('deve retornar sucesso ao enviar mensagem', async () => {
    const res = await request(app)
      .post('/api/message')
      .send({ number: '551199999999', message: 'Olá!' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
