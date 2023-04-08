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
}
