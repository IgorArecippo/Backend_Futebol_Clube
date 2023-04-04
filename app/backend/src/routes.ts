import { Router, Request, Response, NextFunction } from 'express';
import TeamsController from './controllers/TeamsController';
import TeamService from './services/TeamService';
import LoginController from './controllers/LoginController';
import LoginService from './services/LoginService';
import ValiFields from './middlewares/validateFields';

const teamService = new TeamService();
const teamsController = new TeamsController(teamService);
const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/teams/:id', (req: Request, res: Response) => teamsController.getById(req, res));
router
  .get(
    '/login/role',
    (req: Request, res: Response, next: NextFunction) => loginController.getRole(req, res, next),
  );
router
  .post(
    '/login',
    ValiFields,
    (req: Request, res: Response, next: NextFunction) => loginController.login(req, res, next),
  );
export default router;
