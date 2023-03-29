import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel'
import { teamsMock } from './testsMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('')