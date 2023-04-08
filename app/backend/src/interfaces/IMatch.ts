import Matches from '../database/models/MatchesModel';

export interface IMatches extends Matches {
  teamHome?: object;
  teamAway?: object;
}

export interface INew {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesService {
  getMatches(): Promise<IMatches[]>
  getInProgress(prog: boolean): Promise<IMatches[]>
  finishMatch(id: number): Promise<object>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  newMatch(match: INew): Promise<IMatches>
}
