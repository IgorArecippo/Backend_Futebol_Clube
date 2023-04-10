import leaderboardQuery from '../database/models/LeaderboardQuery';
import models from '../database/models';

export default class LeaderboardService {
  getAll = async (): Promise<unknown[]> => {
    const [leaderboard] = await models.query(leaderboardQuery);
    return leaderboard;
  };
}
