import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/ITeams';

export default class TeamService {
  getAll = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getById = async (id: string): Promise<ITeams> => {
    const numberId = parseFloat(id);
    const teamId = await Teams.findOne({ where: { id: numberId } });
    if (!teamId) {
      throw new Error();
    }
    return teamId;
  };
}
