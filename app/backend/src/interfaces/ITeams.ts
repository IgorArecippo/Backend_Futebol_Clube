interface ITeams {
  id: number,
  teamName: string
}

interface ITeamsService {
  getTeams(): Promise<ITeams[]>,
  getTeamsId(id: number): Promise<ITeams>,
}

export { ITeams, ITeamsService };
