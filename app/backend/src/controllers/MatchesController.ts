import { NextFunction, Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IMatch';

export default class MatchesController {
  private matchesService: IMatchesService;
  constructor(matchesService: IMatchesService) {
    this.matchesService = matchesService;
  }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatches = await this.matchesService.getMatches();
      return res.status(200).json(allMatches);
    }
    const prog = Boolean(inProgress === 'true');
    const matchesInProgress = await this.matchesService.getInProgress(prog);
    return res.status(200).json(matchesInProgress);
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumber = parseFloat(id);
      const finished = await this.matchesService.finishMatch(idNumber);
      return res.status(200).json(finished);
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const idNumber = parseFloat(id);
    await this.matchesService.updateMatch(idNumber, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Match updated' });
  }

  async newMatch(req: Request, res: Response) {
    const newMatch = await this.matchesService.newMatch(req.body);
    return res.status(201).json(newMatch);
  }
}
