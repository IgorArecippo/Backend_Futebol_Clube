import Teams from '../database/models/TeamsModel';
import { ITeams } from '../interfaces/ITeams';

export default class TeamService {
  getAll = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();
    return teams;
  };
}
