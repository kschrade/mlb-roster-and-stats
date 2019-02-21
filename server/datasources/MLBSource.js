const { RESTDataSource } = require('apollo-datasource-rest');

const pathWithTokenToReplace = '/json/named.[[endpoint]].bam';
const tokenToReplace = '[[endpoint]]';

const seasonForStats = '2018'
// regular season
const statType = 'R'

class MLBDataSource extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'http://lookup-service-prod.mlb.com';
    }

    async getTeams({ team_ids }){
        let relativeUrl = pathWithTokenToReplace.replace(tokenToReplace, 'team_all_season');

        const response = await this.get(relativeUrl, {
            sport_code: '\'mlb\'',
            season: `'${seasonForStats}'`
        });

        console.log(team_ids)

        if(team_ids){
            return Array.isArray(response.team_all_season.queryResults.row) ?
                response.team_all_season.queryResults.row.filter(team => team_ids.includes(parseInt(team.team_id))): // all the ids are strings for some reason
                [];
        } else {        
            return Array.isArray(response.team_all_season.queryResults.row)
            ? response.team_all_season.queryResults.row 
            :[];
        }
    }

    async getRoster({ team_id }){
        let relativeUrl = pathWithTokenToReplace.replace(tokenToReplace, 'roster_40');

        const response = await this.get(relativeUrl, {
            team_id: `'${team_id}'`
        });

        return Array.isArray(response.roster_40.queryResults.row)
        ? response.roster_40.queryResults.row
        :[];
    }

    async getHittingStats({ player_id }) {        
        let relativeUrl = pathWithTokenToReplace.replace(tokenToReplace, 'sport_hitting_tm');

        const response = await this.get(relativeUrl, {
            game_type: `'${statType}'`,
            season: `'${seasonForStats}'`,
            player_id: `'${player_id}'`,
            league_list_id: `'mlb'`
        });
        
        return response.sport_hitting_tm.queryResults.row;
    }

    async getPitchingStats({ player_id }) {        
        let relativeUrl = pathWithTokenToReplace.replace(tokenToReplace, 'sport_pitching_tm');

        const response = await this.get(relativeUrl, {
            game_type: `'${statType}'`,
            season: `'${seasonForStats}'`,
            player_id: `'${player_id}'`,
            league_list_id: `'mlb'`
        });
        
        return response.sport_pitching_tm.queryResults.row;
    }
}

module.exports = MLBDataSource;