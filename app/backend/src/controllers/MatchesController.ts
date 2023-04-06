import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IMatch';

export default class MatchesController {
  private matchesService: IMatchesService;
  constructor(matchesService: IMatchesService) {
    this.matchesService = matchesService;
  }

  async getMatches(req: Request, res: Response) {
    const allMatches = await this.matchesService.getMatches();
    return res.status(200).json(allMatches);
  }
}
