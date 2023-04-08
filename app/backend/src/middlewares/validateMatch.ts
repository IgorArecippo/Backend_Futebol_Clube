import { Request, Response, NextFunction, RequestHandler } from 'express';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const valiMatch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const allTeams = await teamService.getAll();
  const checkTeams = allTeams
    .filter((idCheck: any) => homeTeamId === idCheck.id || awayTeamId === idCheck.id);
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  if (checkTeams.length !== 2) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};

export default valiMatch;
