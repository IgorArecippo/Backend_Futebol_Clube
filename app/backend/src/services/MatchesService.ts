// import { IMatchesService, IMatches } from '../interfaces/IMatch';
import UnauthorizedError from '../middlewares/midBadRequest';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchService {
  getMatches = async () => {
    const allMatches = await Matches.findAll({ include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
    ],
    });
    if (!allMatches) {
      throw new UnauthorizedError('service error');
    }
    return allMatches;
  };

  getInProgress = async (prog: boolean) => {
    const matchesInProgress = await Matches.findAll({ where: { inProgress: prog },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ] });
    return matchesInProgress;
  };
}
