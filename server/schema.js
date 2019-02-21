const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    # players(numberOfResults: Int): [Player]
    teams(team_ids: [Int]): [Team]
    # playerSearchFuzzy(searchString: String!, numberOfResults: Int): [Player]
}

type Team {
    phone_number: String,
    venue_name: String,
    franchise_code: String,
    all_star_sw: String,
    sport_code: String,
    address_city: String,
    city: String,
    name_display_full: String,
    spring_league_abbrev: String,
    time_zone_alt: String,
    sport_id: Int,
    venue_id: Int,
    mlb_org_id: String,
    time_zone_generic: String,
    mlb_org: String,
    last_year_of_play: String,
    league_full: String,
    home_opener_time: String,
    address_province: String,
    league_id: Int,
    name_abbrev: String,
    bis_team_code: String,
    league: String,
    spring_league: String,
    base_url: String,
    address_zip: String,
    sport_code_display: String,
    mlb_org_short: String,
    time_zone: String,
    address_line1: String,
    mlb_org_brief: String,
    address_line2: String,
    season: Int,
    address_line3: String,
    division_abbrev: String,
    name_display_short: String,
    team_id: Int,
    active_sw: String,
    address_intl: String,
    state: String,
    address_country: String,
    mlb_org_abbrev: String,
    division: String,
    team_code: String,
    name: String,
    website_url: String,
    sport_code_name: String,
    first_year_of_play: Int,
    league_abbrev: String,
    name_display_long: String,
    store_url: String,
    time_zone_text: String,
    name_short: String,
    home_opener: String,
    address_state: String,
    division_full: String,
    time_zone_num: String,
    spring_league_full: String,
    address: String,
    name_display_brief: String,
    file_code: String,
    division_id: String,
    spring_league_id: String,
    venue_short: String,
    roster: [Player]
}

type Player {
    position_txt: String,
    weight: Int,
    name_display_first_last: String,
    college: String,
    height_inches: Int,
    starter_sw: String,
    jersey_number: Int,
    end_date: String,
    name_first: String,
    bats: String,
    team_code: String,
    height_feet: Int,
    pro_debut_date: String,
    status_code: String,
    primary_position: Int,
    birth_date: String,
    team_abbrev: String,
    throws: String,
    team_name: String,
    name_display_last_first: String,
    name_use: String,
    player_id: Int,
    name_last: String,
    team_id: Int,
    start_date: String,
    name_full: String,
    hitting_Stats: HittingStats,
    pitching_Stats: PitchingStats
}

type HittingStats {
    gidp: Int,
    sac: Int,
    np: Int,
    sport_code: String,
    hgnd: Int,
    tb: Int,
    gidp_opp: Int,
    sport_id: Int,
    bb: Int,
    avg: String,
    slg: Int,
    team_full: String,
    ops: Int,
    hbp: Int,
    league_full: String,
    team_abbrev: String,
    so: Int,
    hfly: Int,
    wo: Int,
    league_id: Int,
    sf: Int,
    team_seq: Int,
    league: String,
    hpop: Int,
    cs: Int,
    season: Int,
    sb: Int,
    go_ao: Int,
    ppa: Int,
    player_id: Int,
    ibb: Int,
    team_id: Int,
    roe: Int,
    go: Int,
    hr: Int,
    rbi: Int,
    babip: Int,
    lob: Int,
    end_date: String,
    xbh: Int,
    league_short: String,
    g: Int,
    d: Int,
    sport: String,
    team_short: String,
    tpa: Int,
    h: Int,
    obp: Int,
    hldr: Int,
    t: Int,
    ao: Int,
    r: Int,
    ab: Int
}

type PitchingStats {
    gidp: Int,
    h9: Int,
    np: Int,
    tr: Int,
    gf: Int,
    sport_code: String,
    bqs: Int,
    hgnd: Int,
    sho: Int,
    bq: Int,
    gidp_opp: Int,
    bk: Int,
    kbb: Int,
    sport_id: Int,
    hr9: Int,
    sv: Int,
    slg: Int,
    bb: Int,
    whip: Int,
    avg: Int,
    ops: Int,
    team_full: String,
    db: Int,
    league_full: String,
    team_abbrev: String,
    hfly: Int,
    so: Int,
    tbf: Int,
    bb9: Int,
    league_id: Int,
    wp: Int,
    team_seq: Int,
    hpop: Int,
    league: String,
    hb: Int,
    cs: Int,
    pgs: Int,
    season: Int,
    sb: Int,
    go_ao: Int,
    ppa: Int,
    cg: Int,
    player_id: Int,
    gs: Int,
    ibb: Int,
    team_id: Int,
    pk: Int,
    go: Int,
    hr: Int,
    irs: Int,
    wpct: Int,
    era: String,
    babip: Int,
    end_date: String,
    rs9: Int,
    qs: Int,
    league_short: String,
    g: Int,
    ir: Int,
    hld: Int,
    k9: Int,
    sport: String,
    team_short: String,
    l: Int,
    svo: Int,
    h: Int,
    ip: Int,
    obp: Int,
    w: Int,
    hldr: Int,
    ao: Int,
    s: Int,
    r: Int,
    spct: Int,
    pip: Int,
    ab: Int,
    er: Int
}
`;

module.exports = typeDefs;