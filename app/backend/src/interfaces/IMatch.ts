import Matches from '../database/models/MatchesModel';

export interface IMatches extends Matches {
  teamHome?: object;
  teamAway?: object;
}

export interface IMatchesService {
  getMatches(): Promise<IMatches[]>
}