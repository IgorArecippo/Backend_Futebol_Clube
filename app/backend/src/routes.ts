import { Router, Request, Response, NextFunction } from 'express';
import TeamsController from './controllers/TeamsController';
import TeamService from './services/TeamService';
import LoginController from './controllers/LoginController';
import LoginService from './services/LoginService';
import ValiFields from './middlewares/validateFields';
import validateToken from './middlewares/validateToken';
import MatchesController from './controllers/MatchesController';
import MatchService from './services/MatchesService';
import valiMatch from './middlewares/validateMatch';
import LeaderboardService from './services/LeaderboardService';
import LeaderboardController from './controllers/LeaderboardController';

const teamService = new TeamService();
const teamsController = new TeamsController(teamService);
const loginService = new LoginService();
const loginController = new LoginController(loginService);
const matchesService = new MatchService();
const matchesController = new MatchesController(matchesService);
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

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
  valiMatch,
  (req: Request, res: Response) => matchesController.newMatch(req, res),
);
router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.getAll(req, res),
);
export default router;
