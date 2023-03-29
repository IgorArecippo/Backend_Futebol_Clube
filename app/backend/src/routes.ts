import { Router, Request, Response } from 'express';
import TeamsController from './controllers/TeamsController';
import TeamService from './services/TeamService';

const teamService = new TeamService();
const teamsController = new TeamsController(teamService);

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));

export default router;
