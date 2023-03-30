import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/TeamsModel'
import { teamsMock, teamIdMock } from './testsMocks';
// import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('Tests teams model', () => {
  before(() => sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]));
  after(() => sinon.restore);
  it('testa a requisição a todos os times', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.body).to.be.deep.equal(teamsMock);
    expect(result.status).to.equal(200);
  })

  before(() => sinon.stub(Teams, 'findOne').resolves(teamIdMock as Teams));
  after(() => sinon.restore);
  it('testa a requisição a um time por id', async () => {
    const result = await chai.request(app).get('/teams/:id');
    expect(result.body).to.be.deep.equal(teamIdMock);
    expect(result.status).to.be.equal(200);
  })
  
})