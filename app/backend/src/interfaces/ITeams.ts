interface ITeams {
  id: number,
  teamName: string
}

interface ITeamsService {
  getAll(): Promise<ITeams[]>,
  // getById(id: number): Promise<ITeams>,
}

export { ITeams, ITeamsService };
