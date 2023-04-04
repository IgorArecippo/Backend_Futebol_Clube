import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/UsersModel';
import { userMock } from './testsMocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('testa a rota /login', () => {
  before(() => sinon.stub(Users, 'findOne').resolves(userMock as Users));
  after(() => sinon.restore);

  it('testa a rota com os dados corretos', async () => {
    const result = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(result.status).to.equal(200);
  })
  it('testa se a rota quebra sem a senha', async () => {
    const result = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '' });
    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ message: "All fields must be filled" })
  })
  it('testa se a rota quebra sem o email', async () => {
    const result = await chai.request(app).post('/login').send({ email: '', password: 'secret_admin' });
    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ message: "All fields must be filled" })
  })
  it('testa se a rota quebra com uma senha inválida', async () => {
    const result = await chai.request(app).post('/login').send({ email: '@o.com', password: 'secret_admin' });
    expect(result.status).to.equal(401);
    expect(result.body).to.deep.equal({ message: "Invalid email or password" })
  })
  it('testa se a rota quebra com um email inválido', async () => {
    const result = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'lula' });
    expect(result.status).to.equal(401);
    expect(result.body).to.deep.equal({ message: "Invalid email or password" })
  })
})