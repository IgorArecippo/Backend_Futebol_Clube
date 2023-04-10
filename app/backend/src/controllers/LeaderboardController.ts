import { Request, Response } from 'express';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardController {
  private leaderboardService: ILeaderboard;
  constructor(leaderboardService: ILeaderboard) {
    this.leaderboardService = leaderboardService;
  }

  async getAll(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.getAll();
    return res.status(200).json(leaderboard);
  }
}
