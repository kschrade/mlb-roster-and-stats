const { RESTDataSource } = require('apollo-datasource-rest');

const pathWithTokenToReplace = '/json/named.[[endpoint]].bam';
const tokenToReplace = '[[endpoint]]';

const seasonForStats = '2019'
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
        
        return this.mapHittingStats(response.sport_hitting_tm.queryResults.row);
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

    mapHittingStats(stat){
        if(!stat){
            return {};
        } else{
            return {
                air_out: this.getIntValue(stat.ao),
                at_bats: stat.ab,
                average: this.getFloatValue(stat.avg),
                batting_average_on_balls_in_play: this.getFloatValue(stat.babip),
                caught_stealing: stat.cs,
                d: stat.d, // what is d?
                end_date: stat.end_data,
                extra_base_hit: stat.xbh,
                games: stat.g,
                ground_into_double_play: stat.gidp,
                ground_into_double_play_opp: stat.gidp_opp,
                ground_out: stat.go,
                ground_out_air_out: this.getFloatValue(stat.go_ao),
                hfly: stat.hfly, // hit fly ball?
                hgnd: stat.gnd, // hit ground ball?
                hit_by_pitch: stat.hpb,
                hits: stat.h,
                hldr: stat.hldr, // hit line drive?
                home_run: stat.hr,
                hpop: stat.hpop, // hit pop up?
                intentional_walk: stat.ibb,
                league: stat.league,
                league_full: stat.league_full,
                league_id: stat.league_id,
                league_short: stat.league_short,
                left_on_base: stat.lob,
                on_base_percentage: this.getFloatValue(stat.obp),
                on_base_plus_slugging: this.getFloatValue(stat.ops),
                pitches_per_plate_appearance: this.getFloatValue(stat.ppa),
                pitches_seen: stat.np,
                player_id: stat.player_id,
                reach_on_error: stat.roe,
                run_batted_in: stat.rbi,
                runs: stat.r,
                sacrifice_bunt: stat.sac,
                sacrifice_fly: stat.sf,
                season: stat.season,
                sluging_percentage: stat.slg,
                sport: stat.sport,
                sport_code: stat.sport_code,
                sport_id: stat.sport_id,
                stolen_base: stat.sb,
                strike_out: stat.so,
                t: stat.t, // no idea
                team_abbrev: stat.team_abbrev,
                team_full: stat.team_full,
                team_id: stat.team_id,
                team_seq: stat.team_seq,
                team_short: stat.team_short,
                total_bases: stat.tb,
                total_plate_appearances: stat.tpa,
                walk: stat.bb,
                wo: stat.wo // wut?
            }
        }        
    }

    getFloatValue(value){
        let val = parseFloat(value);
        return isNaN(val) ? 0 : val;
    }

    getIntValue(value){
        let val = parseInt(value);
        return isNaN(val) ? 0 : val;
    }
}

module.exports = MLBDataSource;