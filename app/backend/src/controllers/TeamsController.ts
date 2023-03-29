import { Request, Response } from 'express';
import { ITeamsService } from '../interfaces/ITeams';

export default class TeamsController {
  private teamService: ITeamsService;

  constructor(teamService: ITeamsService) {
    this.teamService = teamService;
  }

  async getAll(_req: Request, res: Response) {
    const result = await this.teamService.getAll();
    return res.status(200).json(result);
  }
}
