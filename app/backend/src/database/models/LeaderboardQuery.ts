const leaderboardQuery = `SELECT team.team_name AS name, 
    ((SUM(matches.home_team_goals > matches.away_team_goals) * 3) + 
      SUM(matches.home_team_goals = matches.away_team_goals)) AS totalPoints,
    COUNT(matches.home_team_id) AS totalGames,
    SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
    SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
    SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
    SUM(matches.home_team_goals) AS goalsFavor,
    SUM(matches.away_team_goals) AS goalsOwn,
    (SUM(matches.home_team_goals) - SUM(matches.away_team_goals)) AS goalsBalance,
FORMAT((((SUM(matches.home_team_goals > matches.away_team_goals) * 3) + 
  SUM(matches.home_team_goals = matches.away_team_goals)) / 
  (COUNT(matches.home_team_id) * 3) * 100), 2) AS efficiency
  FROM
    teams AS team
    JOIN matches AS matches ON team.id = matches.home_team_id
  WHERE
    matches.in_progress = false
  GROUP BY
    team.team_name
  ORDER BY
    totalPoints DESC,
    goalsBalance DESC,
  goalsFavor DESC`;

export default leaderboardQuery;
