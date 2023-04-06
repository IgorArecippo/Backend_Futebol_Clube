import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { IMatches } from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';
import { allMatches } from './testsMocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('testa a rota /matches', () => {
  it('testa a o retorno do getAll', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as IMatches[]);
    const result  = await chai.request(app).get('/matches');
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal(allMatches);
  })
})