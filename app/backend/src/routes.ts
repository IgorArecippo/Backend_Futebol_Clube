import { Router, Request, Response, NextFunction } from 'express';
import TeamsController from './controllers/TeamsController';
import TeamService from './services/TeamService';
import LoginController from './controllers/LoginController';
import LoginService from './services/LoginService';
import ValiFields from './middlewares/validateFields';
import validateToken from './middlewares/validateToken';
import MatchesController from './controllers/MatchesController';
import MatchService from './services/MatchesService';

const teamService = new TeamService();
const teamsController = new TeamsController(teamService);
const loginService = new LoginService();
const loginController = new LoginController(loginService);
const matchesService = new MatchService();
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/teams/:id', (req: Request, res: Response) => teamsController.getById(req, res));
router.get(
  '/login/role',
  validateToken,
  (req: Request, res: Response, next: NextFunction) => loginController.getRole(req, res, next),
);
router.post(
  '/login',
  ValiFields,
  (req: Request, res: Response, next: NextFunction) => loginController.login(req, res, next),
);
router.get('/matches', (req: Request, res: Response) => matchesController.getMatches(req, res));
router.patch(
  '/matches/:id/finish',
  validateToken,
  (req: Request, res: Response, next: NextFunction) => matchesController
    .finishMatch(req, res, next),
);
router.patch(
  '/matches/:id',
  validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.post(
  '/matches',
  validateToken,
  (req: Request, res: Response) => matchesController.newMatch(req, res),
);
export default router;
