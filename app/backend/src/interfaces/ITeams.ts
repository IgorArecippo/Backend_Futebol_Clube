interface ITeams {
  id: number,
  teamName: string
}

interface ITeamsService {
  getAll(): Promise<ITeams[]>,
  getById(id: string): Promise<ITeams>,
}

export { ITeams, ITeamsService };
