module.exports = {
    Query: {
        // players: async (_, { numberOfResults = 1000 }, { dataSources }) =>  dataSources.nbaAPI.getPlayers({
        //         pageCount: numberOfResults
        // }),
        // playerSearchFuzzy: async (_, { numberOfResults = 1000, searchString }, { dataSources }) => dataSources.nbaAPI.playerSearch({
        //         pageCount: numberOfResults,
        //         searchString: searchString
        // }),
        teams: async (_, { team_ids }, { dataSources }) => {
            console.log(team_ids)
         return    dataSources.mlbAPI.getTeams({ team_ids })
        }
    },
    Team : {
        roster: async (team, _, { dataSources }) => dataSources.mlbAPI.getRoster({ team_id: team.team_id })
    },
    Player: {
        hitting_Stats: (player, _, { dataSources }) => dataSources.mlbAPI.getHittingStats({ player_id: player.player_id }),
        pitching_Stats: (player, _, { dataSources }) => dataSources.mlbAPI.getPitchingStats({ player_id: player.player_id })
    }
}