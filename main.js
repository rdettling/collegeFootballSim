let resumeFactor = 1.5;
let power = 15;
let passFreq = 0.5;
let comp = 0.6;
let sack = 0.06;
let fumble = 0.02;
let afMaster = 0.85;
let int = 0.1;

function round(value, precision) 
{
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}
  
function shuffleArray(arr) 
{
    for (let i = arr.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function setSchedules(conference)
{
    shuffleArray(conference.teams);
    shuffleArray(data.teams);

    for (team of conference.teams)
    {
        while (team.schedule.nonConfGames < team.schedule.nonConfLimit)
        {
            let done = 0;   
            for (let i = 0; i < team.schedule.nonConfLimit; i++)
            {
                for (opponent of data.teams)
                {
                    if (team.schedule.nonConfGames == team.schedule.nonConfLimit)
                    {
                        done = 1;
                        break;
                    }          
                    if (opponent.conference != team.conference && opponent.schedule.nonConfGames == i)
                    {
                        let good = 1;
                        for (week of team.schedule.opponents.regularSeason)
                        {
                            if (week.opponent == opponent.name)
                            {
                                good = 0;
                                break;
                            } 
                        }
                        if (good)
                        {
                            for (week of team.schedule.opponents.regularSeason)
                            {
                                if (week.opponent == null)
                                {
                                    week.opponent = opponent.name;
                                    week.rating = opponent.rating;
                                    week.conf = opponent.conference;
                                    team.schedule.nonConfGames++;
                                    break;
                                }
                            }
                            for (week of opponent.schedule.opponents.regularSeason)
                            {
                                if (week.opponent == null)
                                {
                                    week.opponent = team.name;
                                    week.rating = team.rating;
                                    week.conf = team.conference;
                                    opponent.schedule.nonConfGames++;
                                    break;
                                }
                            }
                        } 
                    }
                }  
                if (done)
                {
                    break;
                }
            }
            if (!done)
            {
                for (week of team.schedule.opponents.regularSeason)
                {
                    if (week.opponent == null)
                    {
                        week.opponent = "FCS";
                        week.rating = 50;
                        week.conf = "FCS";
                        team.schedule.nonConfGames++;
                        break;
                    }
                }
                console.log(team);
            }
        }

        while (team.schedule.confGames < team.schedule.confLimit)
        {
            let done = 0;   
            for (let i = 0; i < team.schedule.confLimit; i++)
            {
                for (opponent of conference.teams)
                {
                    if (team.schedule.confGames == team.schedule.confLimit)
                    {
                        done = 1;
                        break;
                    }
                    if (opponent.name != team.name && opponent.schedule.confGames == i)
                    {
                        let good = 1;
                        for (week of team.schedule.opponents.regularSeason)
                        {
                            if (week.opponent == opponent.name)
                            {
                                good = 0;
                                break;
                            } 
                        }
                        if (good)
                        {
                            for (week of team.schedule.opponents.regularSeason)
                            {
                                if (week.opponent == null)
                                {
                                    week.opponent = opponent.name;
                                    week.rating = opponent.rating;
                                    week.conf = opponent.conference;
                                    team.schedule.confGames++;
                                    break;
                                }
                            }
                            for (week of opponent.schedule.opponents.regularSeason)
                            {
                                if (week.opponent == null)
                                {
                                    week.opponent = team.name;
                                    week.rating = team.rating;
                                    week.conf = team.conference;
                                    opponent.schedule.confGames++;
                                    break;
                                }
                            }
                        } 
                    }  
                }
                if (done)
                {
                    break;
                }      
            }
        }
    }
}

function init()
{
    sessionStorage.setItem('weeksSimmed', 0);
    sessionStorage.setItem('year', "2021");

    data.teams = [];
    let teamCount = 0;

    for (conference of data.conferences)
    {
        for (team of conference.teams)
        {
            team.conference = conference.confName;
            team.expectedWins = 0;
            team.rating = Number(team.prestige) + getRandomInt(-5, 5);
            team.offense = {
                "pass" : team.rating,
                "run" :  team.rating,
                "st" : team.rating
            };
            team.defense = {
                "pass" : team.rating,
                "run" :  team.rating
            };
            team.schedule = {
                "opponents" :  {
                    "regularSeason" :
                    [
                        {
                            "week" : 1,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 2,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 3,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 4,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 5,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 6,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 7,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 8,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 9,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 10,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 11,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 12,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        }
                    ],
                    "postseason" :
                    [
                        {
                            "week" : 13,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 14,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        },
                        {
                            "week" : 15,
                            "opponent" : null,
                            "rating" : null,
                            "result" : "tbd",
                            "conf" : null
                        }
                    ]
                },
                "confGames" : 0,
                "confLimit" : 8,
                "confWins" : 0,
                "confLosses" : 0,
                "nonConfGames" : 0,
                "nonConfLimit" : 4,
                "nonConfWins" : 0,
                "nonConfLosses" : 0,
                "totalWins" : 0,
                "totalLosses" : 0,
                "gamesPlayed" : 0,
                "resume" : 0
            };
            data.teams[teamCount] = team;
            teamCount++;
        }
    }
        
    for (conference of data.conferences)
    {
        setSchedules(conference);
    }

    for (team of data.teams)
    {
        for (opponent of team.schedule.opponents.regularSeason)
        {
            team.expectedWins += getWinProb(team.rating, Number(opponent.rating)) / 100;
        }
    }

    insertionSortRating(data.teams);
}

function display()
{
   console.log(JSON.parse(sessionStorage.getItem('data')))
}

function removeAllChildNodes(parent) 
{
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}

function insertionSortRating(arr) 
{ 
    let i, j, key; 
    for (i = 1; i < arr.length; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j].rating < key.rating)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 

    for (teamNum in data.teams)
    {
        data.teams[teamNum].rank = Number(teamNum) + 1;
        data.teams[teamNum].preseason = data.teams[teamNum].rank;
    }
}

function displayRankings()
{
    removeAllChildNodes(document.getElementById("rankings"));

    let node = document.createElement("li");
    node.className = "weeklabel";

    if (weeksSimmed > 0)
    {
        node.textContent = `Week ${weeksSimmed} rankings`;
    }
    else
    {
        node.textContent = "Preseason rankings"
    }
    document.getElementById("rankings").appendChild(node);

    for (team of data.teams)
    {
        let node = document.createElement("li");
        node.className = "teamrank";
        node.textContent = `(${team.preseason}) ${team.rank}.`;

        let path = []
        path.push("teams")
        path.push(team.name)

        let logo = document.createElement("img");
        logo.style.height = "26px";
        logo.style.position = "relative";
        logo.style.top = "4px";
        logo.style.marginLeft = "10px";
        path.push("logo.png");
        logo.setAttribute("src", path.join("/"))
        node.appendChild(logo)
 
        path.splice(-1, 1)

        let link = document.createElement("a");
        link.className = "teamlink";
        link.textContent = `${team.name} ${team.schedule.totalWins}-${team.schedule.totalLosses} (${team.schedule.confWins}-${team.schedule.confLosses}) (${round(team.schedule.resume, 0)})`;
        link.style.margin = "10px";
        path.push("team.html");
        link.setAttribute("href", path.join("/")); 
        node.appendChild(link)
       
        document.getElementById("rankings").appendChild(node);
    } 
}

function insertionSortResume(arr) 
{ 
    let i, j, key; 
    for (i = 1; i < arr.length; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j].schedule.resume < key.schedule.resume)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
} 

function insertionSortConference(arr) 
{ 
    let i, j, key; 
    for (i = 1; i < arr.length; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j].schedule.confWins < key.schedule.confWins)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
} 

function insertionSortWins(arr) 
{ 
    let i, j, key; 
    for (i = 1; i < arr.length; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j].schedule.totalWins < key.schedule.totalWins)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
} 

function getWinProb(teamARating, teamBRating)
{
    sum = Math.pow(teamARating, power) + Math.pow(teamBRating, power);
    teamAChance = Math.pow(teamARating, power) / sum * 100;
    return teamAChance;
}

function playGame(teamARating, teamBRating)
{
    prob = getRandomInt(0, 100);

    if (prob < getWinProb(teamARating, teamBRating))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function simGame(teamA, teamB)
{
    let FP;
    let game = {
        "teamA" : teamA.name,
        "teamB" : teamB.name,
        "scoreA" : 0,
        "scoreB" : 0, 
        "drives" : [],
        "overtime" : "no"
    }

    for (let i = 0; i < 20; i++)
    {
        if (i == 0 || i == 9)
        {
            FP = 20;
        }

        if (i % 2 == 0)
        {
            drive = simDrive(FP, teamA, teamB);
            game.drives.push(drive);
            FP = drive.nextDriveFP;
        }
        else
        {
            drive = simDrive(FP, teamB, teamA);
            game.drives.push(drive);
            FP = drive.nextDriveFP;
        }
    }

    for (drive of game.drives)
    {
        if (drive.offense == teamA.name)
        {
            game.scoreA += drive.points;

            if (drive.result == "safety")
            {
                game.scoreB += 2;
            }
        }
        else
        {
            game.scoreB += drive.points;

            if (drive.result == "safety")
            {
                game.scoreA += 2;
            }
        }
    }

    if (game.scoreA == game.scoreB)
    {
        game.overtime = "yes";
        game = overtime(game, teamA, teamB);
    }

    return game;
}

function simDrive(FP, teamA, teamB)
{
    let driveInfo = {
        "offense" : teamA.name,
        "defense" : teamB.name,
        "startingFP" : FP,
        "result" : null,
        "points" : null,
        "plays" : [],
        "nextDriveFP" : null
    }
    let yardsLeft;
    let yardsGained;
    let afP = Math.pow(teamA.offense.pass / teamB.defense.pass, afMaster); //passing advantage factor
    let afR = Math.pow(teamA.offense.run / teamB.defense.run, afMaster); //rushing advantage factor
    
    while (true)
    {
        if (driveInfo.result) //end loop if a drive result has been found
        {
            break;
        }

        for (let down = 1; down <= 4; down++)
        {
            let play = {
                "FP" : FP,
                "down" : down,
                "yardsLeft" : null,
                "playType" : null,
                "yardsGained" : null,
                "result" : null
            }

            if (down == 1)
            {
                if (FP >= 90) //check if first and goal
                {
                    yardsLeft = 100 - FP;
                }
                else
                {
                    yardsLeft = 10
                }
            }
            else if (down == 4) //4th down logic
            {
                let decision = fouthDown(FP, yardsLeft);
                
                if (decision == "field goal")
                {
                    play.playType = "field goal";
                    play.yardsGained = 0;
                    play.result = "field goal";
                    driveInfo.plays.push(play);
                    driveInfo.result = "field goal";
                    driveInfo.points = 3;
                    driveInfo.nextDriveFP = 20;
                    break;
                }
                else if (decision == "punt")
                {
                    play.playType = "punt";
                    play.yardsGained = 0;
                    play.result = "punt";
                    driveInfo.plays.push(play);
                    driveInfo.result = "punt";
                    driveInfo.points = 0;
                    driveInfo.nextDriveFP = 100 - (FP + 40);
                    break;
                }
            }

            play.yardsLeft = yardsLeft;

            if (passFreq > Math.random()) //determine if pass or run occurs
            {
                play.playType = "pass";
                result = simPass(comp * afP); //adjust completion percentage for af

                if (result.outcome == "interception")
                {
                    play.yardsGained = result.yards;
                    play.result = result.outcome;
                    driveInfo.plays.push(play);
                    driveInfo.result = "interception";
                    driveInfo.points = 0;
                    driveInfo.nextDriveFP = 100 - FP;
                    break;
                }
                else
                {
                    if (result.yards > 0)
                    {
                        yardsGained = Math.round(result.yards * afP); //adjust yards gained for af
                    }
                    else
                    {
                        yardsGained = Math.round(result.yards * (1/afP)); //if sack, adjust yards inversely
                    }
                    
                    if (yardsGained + FP > 100) //adjust if touchdown
                    {
                        yardsGained = 100 - FP;
                    }
                }

                play.yardsGained = yardsGained;
                play.result = result.outcome;
                driveInfo.plays.push(play);
            }
            else
            {
                play.playType = "run";
                result = simRun();

                if (result.outcome == "fumble")
                {
                    play.yardsGained = result.yards;
                    play.result = result.outcome;
                    driveInfo.plays.push(play);
                    driveInfo.result = "fumble";
                    driveInfo.points = 0;
                    driveInfo.nextDriveFP = 100 - FP;
                    break;
                }
                else
                {
                    if (result.yards > 0)
                    {
                        yardsGained = Math.round(result.yards * afR); //adjust yards gained for af
                    }
                    else
                    {
                        yardsGained = Math.round(result.yards * (1/afR)); //if loss, adjust yards inversely
                    }

                    if (yardsGained + FP > 100) //adjust if touchdown
                    {
                        yardsGained = 100 - FP;
                    }

                    play.yardsGained = yardsGained;
                    play.result = result.outcome;
                    driveInfo.plays.push(play);
                }
            }

            yardsLeft -= yardsGained;
            FP += yardsGained;

            if (FP >= 100)
            {
                driveInfo.result = "touchdown";
                driveInfo.points = 7;
                driveInfo.nextDriveFP = 20;
                break;
            }
            else if (down == 4 && yardsLeft > 0)
            {
                driveInfo.result = "turnover on downs";
                driveInfo.points = 0;
                driveInfo.nextDriveFP = 100 - FP;
                break;
            }
            else if (FP < 1)
            {
                driveInfo.result = "safety";
                driveInfo.points = 0;
                driveInfo.nextDriveFP = 20;
                break;
            }
            
            if (yardsLeft <= 0) //new set of downs if first down has been made
            {
                break;
            }
        }
    } 

    return driveInfo;
}

function simPass(comp)
{
    let result = {
        "outcome" : null,
        "yards" : null
    }

    if (sack > Math.random()) //sack
    {
        result.outcome = "sack";
        result.yards = Math.round(-10 * Math.random());
    }
    else if (comp > Math.random()) //completed pass
    {
        sum = 0;
        for (let i = 0; i < 5; i++)
        {
            sum += getRandomInt(-4, 9);
        }
        result.outcome = "completed pass";
        result.yards = sum;
    }
    else if (int > Math.random()) //int
    {
        result.outcome = "interception";
        result.yards = 0;
    }
    else //incomplete pass
    {
        result.outcome = "incomplete";
        result.yards = 0;
    }

    return result;
}

function simRun()
{
    let result = {
        "outcome" : null,
        "yards" : null
    }

    if (fumble > Math.random())
    {
        result.outcome = "fumble"
        result.yards = 0;
    }
    else
    {
        sum = 0
        for (let i = 0; i < 5; i++)
        {
            sum += getRandomInt(-3, 5);
        }
        
        result.outcome = "run";
        result.yards = sum;
    }

    return result;
}

function fouthDown(FP, yardsLeft)
{
    if (FP < 40)
    {
        return "punt";
    }
    else if (FP < 60)
    {
        if (yardsLeft < 5)
        {
            return "go";
        }
        else
        {
            return "punt"
        }
    }
    else if (FP < 70)
    {
        if (yardsLeft < 3)
        {
            return "go";
        }
        else
        {
            return "field goal";
        }
    }
    else
    {
        if (yardsLeft < 5)
        {
            return "go";
        }
        else
        {
            return "field goal"
        }
    }
}

function overtime(game, teamA, teamB)
{
    while (game.scoreA == game.scoreB)
    {
        drive = simDrive(50, teamA, teamB);
        game.drives.push(drive);
        game.scoreA += drive.points;

        drive = simDrive(50, teamB, teamA);
        game.drives.push(drive);
        game.scoreB += drive.points;
    }

    return game
}

function simWeek()
{
    if (weeksSimmed < 12)
    {
        for (team of data.teams)
        {
            if (team.schedule.gamesPlayed < weeksSimmed+1)
            { 
                for (week of team.schedule.opponents.regularSeason)
                {
                    if (team.schedule.gamesPlayed == weeksSimmed+1)
                    {
                        break;
                    }

                    if (week.result == "tbd")
                    {
                        if (week.opponent == "FCS")
                        {
                            if (playGame(team.rating, week.rating))
                            {
                                week.result = "W";
                                team.schedule.resume += Math.pow(week.rating, resumeFactor);
                            }
                            else
                            {
                                week.result = "L";
                            }
                            team.schedule.gamesPlayed++;
                        }
                        else
                        {
                            for (opponent of data.teams)
                            {
                                if (opponent.name == week.opponent)
                                {
                                    if (opponent.schedule.gamesPlayed < weeksSimmed+1)
                                    {
                                        let won = 0;
                                        let game = simGame(team, opponent);

                                        if (game.scoreA > game.scoreB)
                                        {
                                            week.result = "W";                                      
                                            won = 1;
                                            team.schedule.resume += Math.pow(opponent.rating, resumeFactor);
                                        }
                                        else
                                        {
                                            week.result = "L";
                                        }
                                        week.score = `${game.scoreA} - ${game.scoreB}`;
                                        team.schedule.gamesPlayed++;
                                        opponent.schedule.gamesPlayed++;

                                        for (opponentWeek of opponent.schedule.opponents.regularSeason)
                                        {
                                            if (opponentWeek.opponent == team.name)
                                            {
                                                if (won)
                                                {
                                                    opponentWeek.result = "L";
                                                }
                                                else
                                                {
                                                    opponentWeek.result = "W";
                                                    opponent.schedule.resume += Math.pow(team.rating, resumeFactor);
                                                }
                                                opponentWeek.score = `${game.scoreB} - ${game.scoreA}`;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    
        for (team of data.teams)
        {
            team.schedule.confWins = 0;
            team.schedule.confLosses = 0;
            team.schedule.nonConfWins = 0;
            team.schedule.nonConfLosses = 0;

            for (week of team.schedule.opponents.regularSeason)
            {
                if (week.result == "W")
                {
                    if (team.conference == week.conf)
                    {
                        team.schedule.confWins++;
                    }
                    else
                    {
                        team.schedule.nonConfWins++;
                    }
                }
                else if (week.result == "L")
                {
                    if (team.conference == week.conf)
                    {
                        team.schedule.confLosses++;
                    }
                    else
                    {
                        team.schedule.nonConfLosses++;
                    }
                }
            } 
            team.schedule.totalWins = team.schedule.confWins + team.schedule.nonConfWins;
            team.schedule.totalLosses = team.schedule.confLosses + team.schedule.nonConfLosses;
        }

        if (weeksSimmed == 11)
        {
            for (conference of data.conferences)
            {
                setConfChampionship(conference);
            }
            updateDataTeams();
        }
    }

    if (weeksSimmed == 12)
    {
        for (conference of data.conferences)
        {
            let team1 = conference.teams[0];
            let team2 = conference.teams[1];

            let game = (simGame(team1, team2));

            team1.schedule.opponents.postseason[0].score = `${game.scoreA} - ${game.scoreB}`;
            team2.schedule.opponents.postseason[0].score = `${game.scoreB} - ${game.scoreA}`;

            if (game.scoreA > game.scoreB)
            {
                team1.schedule.opponents.postseason[0].result = 'W';
                team2.schedule.opponents.postseason[0].result = 'L';

                team1.schedule.resume += Math.pow(team2.rating, resumeFactor);

                team1.schedule.totalWins++;
                team2.schedule.totalLosses++;
            }
            else
            {
                team1.schedule.opponents.postseason[0].result = 'L';
                team2.schedule.opponents.postseason[0].result = 'W';

                team2.schedule.resume += Math.pow(team1.rating, resumeFactor);

                team1.schedule.totalLosses++;
                team2.schedule.totalWins++;

                conference.teams[0] = team2;
                conference.teams[1] = team1;
            }    

            conference.champion = conference.teams[0].name;
            conference.runnerUp = conference.teams[1].name;
        }
        updateDataTeams();
        setPlayoff();
    }

    if (weeksSimmed == 13)
    {
        let team1 = data.teams[0];
        let team2 = data.teams[1];
        let team3 = data.teams[2];
        let team4 = data.teams[3];

        let oneVfourWinner;
        let twoVthreeWinner;

        let game14 = simGame(team1, team4);
        let game23 = simGame(team2, team3);

        team1.schedule.opponents.postseason[1].score = `${game14.scoreA} - ${game14.scoreB}`;
        team2.schedule.opponents.postseason[1].score = `${game23.scoreA} - ${game23.scoreB}`;
        team3.schedule.opponents.postseason[1].score = `${game23.scoreB} - ${game23.scoreA}`;
        team4.schedule.opponents.postseason[1].score = `${game14.scoreB} - ${game14.scoreA}`;

        if (game14.scoreA > game14.scoreB)
        {
            team1.schedule.opponents.postseason[1].result = 'W';
            team4.schedule.opponents.postseason[1].result = 'L';

            team1.schedule.resume += Math.pow(team4.rating, resumeFactor);

            team1.schedule.totalWins++;
            team4.schedule.totalLosses++;

            oneVfourWinner = team1;
        }
        else
        {
            team1.schedule.opponents.postseason[1].result = 'L';
            team4.schedule.opponents.postseason[1].result = 'W';

            team4.schedule.resume += Math.pow(team1.rating, resumeFactor);

            team1.schedule.totalLosses++;
            team4.schedule.totalWins++;

            oneVfourWinner = team4;

            data.teams[0] = team4
            data.teams[3] = team1;
        }    

        if (game23.scoreA > game23.scoreB)
        {
            team2.schedule.opponents.postseason[1].result = 'W';
            team3.schedule.opponents.postseason[1].result = 'L';

            team2.schedule.resume += Math.pow(team3.rating, resumeFactor);

            team2.schedule.totalWins++;
            team3.schedule.totalLosses++;

            twoVthreeWinner = team2;
        }
        else
        {
            team2.schedule.opponents.postseason[1].result = 'L';
            team3.schedule.opponents.postseason[1].result = 'W';

            team3.schedule.resume += Math.pow(team2.rating, resumeFactor);

            team2.schedule.totalLosses++;
            team3.schedule.totalWins++;

            twoVthreeWinner = team3;

            data.teams[1] = team3
            data.teams[2] = team2;
        }    

        if (data.teams[3].resume > data.teams[2].resume)
        {
            let temp = data.teams[3];
            data.teams[3] = data.teams[2];
            data.teams[2] = temp;
        }

        oneVfourWinner.schedule.opponents.postseason[2].opponent = twoVthreeWinner.name;
        oneVfourWinner.schedule.opponents.postseason[2].rating = twoVthreeWinner.rating;
        oneVfourWinner.schedule.opponents.postseason[2].conf = "Natty";

        twoVthreeWinner.schedule.opponents.postseason[2].opponent = oneVfourWinner.name;
        twoVthreeWinner.schedule.opponents.postseason[2].rating = oneVfourWinner.rating;
        twoVthreeWinner.schedule.opponents.postseason[2].conf = "Natty";        
    }

    if (weeksSimmed == 14)
    {
        let team1 = data.teams[0];
        let team2 = data.teams[1];

        let game = simGame(team1, team2);

        team1.schedule.opponents.postseason[2].score = `${game.scoreA} - ${game.scoreB}`;
        team2.schedule.opponents.postseason[2].score = `${game.scoreB} - ${game.scoreA}`;
        
        if (game.scoreA > game.scoreB)
        {
            team1.schedule.opponents.postseason[2].result = 'W';
            team2.schedule.opponents.postseason[2].result = 'L';

            team1.schedule.resume += Math.pow(team2.rating, resumeFactor);

            team1.schedule.totalWins++;
            team2.schedule.totalLosses++;
        }
        else
        {
            team1.schedule.opponents.postseason[2].result = 'L';
            team2.schedule.opponents.postseason[2].result = 'W';

            team2.schedule.resume += Math.pow(team1.rating, resumeFactor);

            team1.schedule.totalLosses++;
            team2.schedule.totalWins++;

            data.teams[0] = team2;
            data.teams[1] = team1;
        }    
    }        

    weeksSimmed++;
    sessionStorage.setItem("weeksSimmed", weeksSimmed);

    if (weeksSimmed < 14)
    {
        insertionSortResume(data.teams);
    }
    for (teamNum in data.teams)
    {
        data.teams[teamNum].rank = Number(teamNum) + 1;
    }
    updateDataConferences();
    sessionStorage.setItem('data', JSON.stringify(data));
    
    if (location.pathname.includes("teams"))
    {
        teamPage();
    }

    if (location.pathname.includes("rankings"))
    {
        displayRankings();
    }
}

function updateDataConferences()
{
    for (conference of data.conferences)
    {
        for (team of data.teams)
        {
            if (team.conference == conference.confName)
            {
                for (i in conference.teams)
                {
                    if (conference.teams[i].name == team.name)
                    {
                        conference.teams[i] = team;
                    }
                }
            }
        }
    }
}

function updateDataTeams()
{
    for (conference of data.conferences)
    {
        for (teamNum in data.teams)
        {
            let team = data.teams[teamNum];
            if (team.conference == conference.confName)
            {
                for (i in conference.teams)
                {
                    if (conference.teams[i].name == team.name)
                    {
                        data.teams[teamNum] = conference.teams[i];
                    }
                }
            }
        }
    }
}

function reset()
{
    sessionStorage.clear();
    location.reload();
}

function confStandings(confNum)
{
    let conference = data.conferences[confNum];

    if (weeksSimmed < 13)
    {    
        insertionSortResume(conference.teams);
        insertionSortWins(conference.teams);
        insertionSortConference(conference.teams);
    }

    removeAllChildNodes(document.getElementById("confstandings"));

    node = document.createElement("li");
    node.className = "weeklabel";
    node.textContent = `${conference.confName} standings after week ${weeksSimmed}`; 
    document.getElementById("confstandings").appendChild(node);

    for (teamNum in conference.teams)
    {
        let team = conference.teams[teamNum];

        let node = document.createElement("li");
        node.className = "teamrank";
        node.textContent = `${Number(teamNum)+1}.`;

        let path = [];
        path.push("teams");
        path.push(team.name);

        let logo = document.createElement("img");
        logo.style.height = "26px";
        logo.style.position = "relative";
        logo.style.top = "4px";
        logo.style.marginLeft = "10px";
        path.push("logo.png");
        logo.setAttribute("src", path.join("/"))
        node.appendChild(logo)
 
        path.splice(-1, 1)

        let link = document.createElement("a");
        link.className = "teamlink";
        link.textContent = `${team.name} ${team.schedule.totalWins}-${team.schedule.totalLosses} (${team.schedule.confWins}-${team.schedule.confLosses}) (${round(team.schedule.resume, 0)})`;
        link.style.margin = "10px";
        path.push("team.html")
        link.setAttribute("href", path.join("/")); 
        node.appendChild(link)

        document.getElementById("confstandings").appendChild(node);
    }  

    if (weeksSimmed > 12)
    {
        document.getElementById("confChampion").textContent = `champion: ${conference.champion}`;
        document.getElementById("runnerUp").textContent = `runner up: ${conference.runnerUp}`;
    }
}

function teamPage()
{
    let team = null;
    for (teamNum in data.teams)
    {
        team = data.teams[teamNum];
        if (team.name == sessionStorage.getItem("team"))
        {
            break;
        }
    }

    removeAllChildNodes(document.getElementById("teamheader"));
    removeAllChildNodes(document.getElementById("schedule"));

    let node = document.createElement("h1");
    node.textContent = `#${team.rank} ${team.name} ${team.mascot}`;
    node.style.margin = "10px";
    document.getElementById("teamheader").appendChild(node);

    node = document.createElement("h6");
    node.textContent = `${team.schedule.totalWins}-${team.schedule.totalLosses} (${team.schedule.confWins}-${team.schedule.confLosses})`;
    node.style.margin = "10px";
    document.getElementById("teamheader").appendChild(node);

    node = document.createElement("h6");
    node.textContent = `ovr: ${team.rating}`;
    node.style.margin = "10px";
    document.getElementById("teamheader").appendChild(node);
    
    node = document.createElement("h6");
    node.textContent = `expected wins: ${round(team.expectedWins, 2)}`;
    node.style.margin = "10px";
    document.getElementById("teamheader").appendChild(node);

    displayRegularSeason(team);
    displayPostseason(team);
}

function setConfChampionship(conference)
{
    insertionSortResume(conference.teams)
    insertionSortWins(conference.teams)
    insertionSortConference(conference.teams)

    let team1 = conference.teams[0];
    let team2 = conference.teams[1];

    team1.schedule.opponents.postseason[0].opponent = team2.name;
    team1.schedule.opponents.postseason[0].rating = team2.rating;
    team1.schedule.opponents.postseason[0].conf = `${conference.confName} championship`;

    team2.schedule.opponents.postseason[0].opponent = team1.name;
    team2.schedule.opponents.postseason[0].rating = team1.rating;
    team2.schedule.opponents.postseason[0].conf = `${conference.confName} championship`;
}

function displayRegularSeason(team)
{
    for (week of team.schedule.opponents.regularSeason)
    {
        if (week.opponent == "FCS")
        {
            let node = document.createElement("li");
            node.className = "week";
            node.textContent = `FCS (${round(getWinProb(team.rating, week.rating), 1)}%)`
            node.style.paddingTop = "22px";

            if (week.result == 'W')
            {
                node.style.background = "green";
            }
            else if (week.result == 'L')
            {
                node.style.background = "red";
            }
            
            document.getElementById("schedule").appendChild(node);
        }
        else
        {
            for (opponent of data.teams)
            {
                if (opponent.name == week.opponent)
                {
                    let node = document.createElement("li");
                    node.className = "week";
                    if (opponent.rank <= 25)
                    {
                        node.textContent = `#${opponent.rank}`;
                    }
                    
                    let path = [];
                    path.push("..");
                    path.push(opponent.name);

                    let logo = document.createElement("img");
                    logo.style.height = "26px";
                    logo.style.position = "relative";
                    logo.style.top = "4px";
                    logo.style.marginLeft = "10px";
                    path.push("logo.png");
                    logo.setAttribute("src", path.join("/"));
                    node.appendChild(logo);

                    path.splice(-1, 1);

                    let link = document.createElement("a");
                    link.className = "teamlink";

                    if (week.result != "tbd")
                    {
                        link.textContent = `${opponent.name} ${opponent.schedule.totalWins}-${opponent.schedule.totalLosses} (${opponent.schedule.confWins}-${opponent.schedule.confLosses}) (${opponent.rating}) (${round(getWinProb(team.rating, opponent.rating), 1)}%) (${week.conf}) ${week.result} (${week.score})`;
                    }
                    else
                    {
                        link.textContent = `${opponent.name} ${opponent.schedule.totalWins}-${opponent.schedule.totalLosses} (${opponent.schedule.confWins}-${opponent.schedule.confLosses}) (${opponent.rating}) (${round(getWinProb(team.rating, opponent.rating), 1)}%) (${week.conf})`;
                    }

                    link.style.margin = "10px";
                    path.push("team.html");
                    link.setAttribute("href", path.join("/")); 
                    node.appendChild(link);

                    if (week.result == 'W')
                    {
                        node.style.background = "green";
                    }
                    else if (week.result == 'L')
                    {
                        node.style.background = "red";
                    }

                    document.getElementById("schedule").appendChild(node);
                }
            }
        }
    }
}

function displayPostseason(team)
{
    for (week of team.schedule.opponents.postseason)
    {
        if (week.opponent != null)
        {
            for (opponent of data.teams)
            {
                if (opponent.name == week.opponent)
                {
                    let node = document.createElement("li");
                    node.className = "week";
                    if (opponent.rank <= 25)
                    {
                        node.textContent = `#${opponent.rank}`;
                    }
                    
                    let path = [];
                    path.push("..");
                    path.push(opponent.name);
    
                    let logo = document.createElement("img");
                    logo.style.height = "26px";
                    logo.style.position = "relative";
                    logo.style.top = "4px";
                    logo.style.marginLeft = "10px";
                    path.push("logo.png");
                    logo.setAttribute("src", path.join("/"));
                    node.appendChild(logo);
    
                    path.splice(-1, 1);
    
                    let link = document.createElement("a");
                    link.className = "teamlink";

                    if (week.result != "tbd")
                    {
                        link.textContent = `${opponent.name} ${opponent.schedule.totalWins}-${opponent.schedule.totalLosses} (${opponent.schedule.confWins}-${opponent.schedule.confLosses}) (${opponent.rating}) (${round(getWinProb(team.rating, opponent.rating), 1)}%) (${week.conf}) ${week.result} (${week.score})`;
                    }
                    else
                    {
                        link.textContent = `${opponent.name} ${opponent.schedule.totalWins}-${opponent.schedule.totalLosses} (${opponent.schedule.confWins}-${opponent.schedule.confLosses}) (${opponent.rating}) (${round(getWinProb(team.rating, opponent.rating), 1)}%) (${week.conf})`;
                    }                    
                    
                    link.style.margin = "10px";
                    path.push("team.html");
                    link.setAttribute("href", path.join("/")); 
                    node.appendChild(link);
    
                    if (week.result == 'W')
                    {
                        node.style.background = "green";
                    }
                    else if (week.result == 'L')
                    {
                        node.style.background = "red";
                    }
    
                    document.getElementById("schedule").appendChild(node);
                }
            }
        }
    }
}

function setPlayoff()
{
    insertionSortResume(data.teams);

    let team1 = data.teams[0];
    let team2 = data.teams[1];
    let team3 = data.teams[2];
    let team4 = data.teams[3];

    team1.schedule.opponents.postseason[1].opponent = team4.name;
    team1.schedule.opponents.postseason[1].rating = team4.rating;
    team1.schedule.opponents.postseason[1].conf = "Playoff semifinal";

    team4.schedule.opponents.postseason[1].opponent = team1.name;
    team4.schedule.opponents.postseason[1].rating = team1.rating;
    team4.schedule.opponents.postseason[1].conf = "Playoff semifinal";

    team2.schedule.opponents.postseason[1].opponent = team3.name;
    team2.schedule.opponents.postseason[1].rating = team3.rating;
    team2.schedule.opponents.postseason[1].conf = "Playoff semifinal";

    team3.schedule.opponents.postseason[1].opponent = team2.name;
    team3.schedule.opponents.postseason[1].rating = team2.rating;
    team3.schedule.opponents.postseason[1].conf = "Playoff semifinal";
}



if (!sessionStorage.getItem("data")) 
{
    data = {
        "conferences" : 
        [
            {
                "confName" : "SEC",
                "confFullName" : "Southeastern Conference",
                "teams" :
                [
                    {
                        "name" : "Alabama",
                        "mascot" : "Crimson Tide",
                        "abbreviation" : "BAMA",
                        "prestige" : "95",
                        "colorPrimary" : "#9E1B32",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Georgia",
                        "mascot" : "Bulldogs",
                        "abbreviation" : "UGA",
                        "prestige" : "92",
                        "colorPrimary" : "#BA0C2F",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "LSU",
                        "mascot" : "Tigers",
                        "abbreviation" : "LSU",
                        "prestige" : "90",
                        "colorPrimary" : "#461D7C",
                        "colorSecondary" : "#FDD023"
                    },
                    {
                        "name" : "Texas A&M",
                        "mascot" : "Aggies",
                        "abbreviation" : "TAMU",
                        "prestige" : "87",
                        "colorPrimary" : "#500000",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Florida",
                        "mascot" : "Gators",
                        "abbreviation" : "UF",
                        "prestige" : "85",
                        "colorPrimary" : "#0021A5",
                        "colorSecondary" : "#FA4616"
                    },
                    {
                        "name" : "Kentucky",
                        "mascot" : "Wildcats",
                        "abbreviation" : "UK",
                        "prestige" : "80",
                        "colorPrimary" : "#0033A0",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Tennessee",
                        "mascot" : "Volunteers",
                        "abbreviation" : "TEN",
                        "prestige" : "80",
                        "colorPrimary" : "#FF8200",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Auburn",
                        "mascot" : "Tigers",
                        "abbreviation" : "AUB",
                        "prestige" : "85",
                        "colorPrimary" : "#0C2340",
                        "colorSecondary" : "#E87722"
                    },
                    {
                        "name" : "Arkansas",
                        "mascot" : "Razorbacks",
                        "abbreviation" : "ARK",
                        "prestige" : "85",
                        "colorPrimary" : "#9D2235",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Mississippi State",
                        "mascot" : "Bulldogs",
                        "abbreviation" : "MSST",
                        "prestige" : "80",
                        "colorPrimary" : "#660000",
                        "colorSecondary" : "#CCCCCC"
                    },
                    {
                        "name" : "Vanderbilt",
                        "mascot" : "Commodores",
                        "abbreviation" : "VAN",
                        "prestige" : "70",
                        "colorPrimary" : "#866D4B",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "South Carolina",
                        "mascot" : "Gamecocks",
                        "abbreviation" : "SCAR",
                        "prestige" : "75",
                        "colorPrimary" : "#73000A",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Ole Miss",
                        "mascot" : "Rebels",
                        "abbreviation" : "MISS",
                        "prestige" : "80",
                        "colorPrimary" : "#CE1126",
                        "colorSecondary" : "#006BA6"
                    },
                    {
                        "name" : "Missouri",
                        "mascot" : "Tigers",
                        "abbreviation" : "MIZZ",
                        "prestige" : "75",
                        "colorPrimary" : "#000000",
                        "colorSecondary" : "#F1B82D"
                    }
                ]
            },  
            {
                "confName" : "B1G",
                "confFullName" : "Big Ten Conference",
                "teams" :
                [
                    {
                        "name" : "Purdue",
                        "mascot" : "Boilermakers",
                        "abbreviation" : "PUR",
                        "prestige" : "80",
                        "colorPrimary" : "#CEB888",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Iowa",
                        "mascot" : "Hawkeyes",
                        "abbreviation" : "IOWA",
                        "prestige" : "85",
                        "colorPrimary" : "#FFCD00",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Illinois",
                        "mascot" : "Illini",
                        "abbreviation" : "ILL",
                        "prestige" : "75",
                        "colorPrimary" : "#13294B",
                        "colorSecondary" : "#E84A27"
                    },
                    {
                        "name" : "Michigan",
                        "mascot" : "Wolverines",
                        "abbreviation" : "MICH",
                        "prestige" : "88",
                        "colorPrimary" : "#00274C",
                        "colorSecondary" : "#FFCB05"
                    },
                    {
                        "name" : "Ohio State",
                        "mascot" : "Buckeyes",
                        "abbreviation" : "OSU",
                        "prestige" : "95",
                        "colorPrimary" : "#BB0000",
                        "colorSecondary" : "#666666"
                    },
                    {
                        "name" : "Michigan State",
                        "mascot" : "Spartans",
                        "abbreviation" : "MSU",
                        "prestige" : "85",
                        "colorPrimary" : "#18453B",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Wisconsin",
                        "mascot" : "Badgers",
                        "abbreviation" : "WISC",
                        "prestige" : "85",
                        "colorPrimary" : "#C5050C",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Indiana",
                        "mascot" : "Hoosiers",
                        "abbreviation" : "IU",
                        "prestige" : "75",
                        "colorPrimary" : "#990000",
                        "colorSecondary" : "#EEEDEB"
                    },
                    {
                        "name" : "Maryland",
                        "mascot" : "Terrapins",
                        "abbreviation" : "UMD",
                        "prestige" : "75",
                        "colorPrimary" : "#E03A3E",
                        "colorSecondary" : "#FFD520"
                    },
                    {
                        "name" : "Northwestern",
                        "mascot" : "Wildcats",
                        "abbreviation" : "NU",
                        "prestige" : "80",
                        "colorPrimary" : "#4E2A84",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Rutgers",
                        "mascot" : "Scarlet Knights",
                        "abbreviation" : "RUT",
                        "prestige" : "75",
                        "colorPrimary" : "#CC0033",
                        "colorSecondary" : "#5F6A72"
                    },
                    {
                        "name" : "Penn State",
                        "mascot" : "Nittany Lions",
                        "abbreviation" : "PSU",
                        "prestige" : "88",
                        "colorPrimary" : "#041E42",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Minnesota",
                        "mascot" : "Golden Gophers",
                        "abbreviation" : "MINN",
                        "prestige" : "82",
                        "colorPrimary" : "#7A0019",
                        "colorSecondary" : "#FFCC33"
                    },
                    {
                        "name" : "Nebraska",
                        "mascot" : "Cornhuskers",
                        "abbreviation" : "NEB",
                        "prestige" : "80",
                        "colorPrimary" : "#E41C38",
                        "colorSecondary" : "#FDF2D9"
                    }
                ]
            },  
            {
                "confName" : "ACC",
                "confFullName" : "Atlantic Coast Conference",
                "teams" :
                [
                    {
                        "name" : "Clemson",
                        "mascot" : "Tigers",
                        "abbreviation" : "CLEM",
                        "prestige" : "92",
                        "colorPrimary" : "#F56600",
                        "colorSecondary" : "#522D80"
                    },
                    {
                        "name" : "Florida State",
                        "mascot" : "Seminoles",
                        "abbreviation" : "FSU",
                        "prestige" : "85",
                        "colorPrimary" : "#782F40",
                        "colorSecondary" : "#CEB888"
                    },
                    {
                        "name" : "Notre Dame",
                        "mascot" : "Fighting Irish",
                        "abbreviation" : "ND",
                        "prestige" : "90",
                        "colorPrimary" : "#0C2340",
                        "colorSecondary" : "#AE9142"
                    },
                    {
                        "name" : "Miami",
                        "mascot" : "Hurricanes",
                        "abbreviation" : "MIA",
                        "prestige" : "85",
                        "colorPrimary" : "#F47321",
                        "colorSecondary" : "#005030"
                    },
                    {
                        "name" : "Virginia Tech",
                        "mascot" : "Hokies",
                        "abbreviation" : "VT",
                        "prestige" : "82",
                        "colorPrimary" : "#630031",
                        "colorSecondary" : "#CF4420"
                    },
                    {
                        "name" : "Georgia Tech",
                        "mascot" : "Yellow Jackets",
                        "abbreviation" : "GT",
                        "prestige" : "80",
                        "colorPrimary" : "#B3A369",
                        "colorSecondary" : "#003057"
                    },
                    {
                        "name" : "North Carolina",
                        "mascot" : "Tar Heels",
                        "abbreviation" : "UNC",
                        "prestige" : "82",
                        "colorPrimary" : "#7BAFD4",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Pittsburgh",
                        "mascot" : "Panthers",
                        "abbreviation" : "PITT",
                        "prestige" : "82",
                        "colorPrimary" : "#003594",
                        "colorSecondary" : "#FFB81C"
                    },
                    {
                        "name" : "Virginia",
                        "mascot" : "Cavaliers",
                        "abbreviation" : "UVA",
                        "prestige" : "80",
                        "colorPrimary" : "#232D4B",
                        "colorSecondary" : "#F84C1E"
                    },
                    {
                        "name" : "NC State",
                        "mascot" : "Wolfpack",
                        "abbreviation" : "NCST",
                        "prestige" : "80",
                        "colorPrimary" : "#CC0000",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Wake Forest",
                        "mascot" : "Demon Deacons",
                        "abbreviation" : "WAKE",
                        "prestige" : "80",
                        "colorPrimary" : "#9E7E38",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Syracuse",
                        "mascot" : "Orange",
                        "abbreviation" : "CUSE",
                        "prestige" : "75",
                        "colorPrimary" : "#F76900",
                        "colorSecondary" : "#000E54"
                    },
                    {
                        "name" : "Louisville",
                        "mascot" : "Cardinals",
                        "abbreviation" : "LOU",
                        "prestige" : "80",
                        "colorPrimary" : "#AD0000",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Duke",
                        "mascot" : "Blue Devils",
                        "abbreviation" : "DUKE",
                        "prestige" : "70",
                        "colorPrimary" : "#003087",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Boston College",
                        "mascot" : "Eagles",
                        "abbreviation" : "BC",
                        "prestige" : "80",
                        "colorPrimary" : "#98002E",
                        "colorSecondary" : "#BC9B6A"
                    }
                ]
            },  
            {
                "confName" : "XII",
                "confFullName" : "Big 12 Conference",
                "teams" :
                [
                    {
                        "name" : "Kansas",
                        "mascot" : "Jayhawks",
                        "abbreviation" : "KU",
                        "prestige" : "65",
                        "colorPrimary" : "#0051BA",
                        "colorSecondary" : "#E8000D"
                    },
                    {
                        "name" : "Baylor",
                        "mascot" : "Bears",
                        "abbreviation" : "BAY",
                        "prestige" : "85",
                        "colorPrimary" : "#154734",
                        "colorSecondary" : "#FFB81C"
                    },
                    {
                        "name" : "Texas Tech",
                        "mascot" : "Red Raiders",
                        "abbreviation" : "TTU",
                        "prestige" : "80",
                        "colorPrimary" : "#CC0000",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Texas",
                        "mascot" : "Longhorns",
                        "abbreviation" : "TEX",
                        "prestige" : "85",
                        "colorPrimary" : "#BF5700",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Oklahoma",
                        "mascot" : "Sooners",
                        "abbreviation" : "OU",
                        "prestige" : "90",
                        "colorPrimary" : "#841617",
                        "colorSecondary" : "#FDF9D8"
                    },
                    {
                        "name" : "Texas Christian",
                        "mascot" : "Horned Frogs",
                        "abbreviation" : "TCU",
                        "prestige" : "80",
                        "colorPrimary" : "#4D1979",
                        "colorSecondary" : "#A3A9AC"
                    },
                    {
                        "name" : "Oklahoma State",
                        "mascot" : "Cowboys",
                        "abbreviation" : "OKST",
                        "prestige" : "85",
                        "colorPrimary" : "#FF7300",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Iowa State",
                        "mascot" : "Cyclones",
                        "abbreviation" : "ISU",
                        "prestige" : "82",
                        "colorPrimary" : "#C8102E",
                        "colorSecondary" : "#F1BE48"
                    },
                    {
                        "name" : "Kansas State",
                        "mascot" : "Wildcats",
                        "abbreviation" : "KSU",
                        "prestige" : "80",
                        "colorPrimary" : "#512888",
                        "colorSecondary" : "#D1D1D1"
                    },
                    {
                        "name" : "West Virginia",
                        "mascot" : "Mountaineers",
                        "abbreviation" : "WVU",
                        "prestige" : "80",
                        "colorPrimary" : "#002855",
                        "colorSecondary" : "#EAAA00"
                    }
                ]
            },
            {
                "confName" : "Pac-12",
                "confFullName" : "Pac-12 Conference",
                "teams" :
                [
                    {
                        "name" : "Arizona",
                        "mascot" : "Wildcats",
                        "abbreviation" : "ZONA",
                        "prestige" : "70",
                        "colorPrimary" : "#CC0033",
                        "colorSecondary" : "#003366"
                    },
                    {
                        "name" : "UCLA",
                        "mascot" : "Bruins",
                        "abbreviation" : "UCLA",
                        "prestige" : "80",
                        "colorPrimary" : "#2D68C4",
                        "colorSecondary" : "#F2A900"
                    },
                    {
                        "name" : "Washington State",
                        "mascot" : "Cougars",
                        "abbreviation" : "WSU",
                        "prestige" : "75",
                        "colorPrimary" : "#981E32",
                        "colorSecondary" : "#5E6A71"
                    },
                    {
                        "name" : "USC",
                        "mascot" : "Trojans",
                        "abbreviation" : "USC",
                        "prestige" : "85",
                        "colorPrimary" : "#990000",
                        "colorSecondary" : "#FFC72C"
                    },
                    {
                        "name" : "Oregon",
                        "mascot" : "Ducks",
                        "abbreviation" : "ORE",
                        "prestige" : "85",
                        "colorPrimary" : "#154733",
                        "colorSecondary" : "#FEE123"
                    },
                    {
                        "name" : "Colorado",
                        "mascot" : "Buffaloes",
                        "abbreviation" : "CU",
                        "prestige" : "75",
                        "colorPrimary" : "#CFB87C",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Arizona State",
                        "mascot" : "Sun Devils",
                        "abbreviation" : "ASU",
                        "prestige" : "80",
                        "colorPrimary" : "#8C1D40",
                        "colorSecondary" : "#FFC627"
                    },
                    {
                        "name" : "Stanford",
                        "mascot" : "Cardinal",
                        "abbreviation" : "STAN",
                        "prestige" : "80",
                        "colorPrimary" : "#8C1515",
                        "colorSecondary" : "#FFFFFF"
                    },
                    {
                        "name" : "Utah",
                        "mascot" : "Utes",
                        "abbreviation" : "UTAH",
                        "prestige" : "85",
                        "colorPrimary" : "#CC0000",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Washington",
                        "mascot" : "Huskies",
                        "abbreviation" : "WASH",
                        "prestige" : "80",
                        "colorPrimary" : "#4B2E83",
                        "colorSecondary" : "#B7A57A"
                    },
                    {
                        "name" : "California",
                        "mascot" : "Golden Bears",
                        "abbreviation" : "CAL",
                        "prestige" : "75",
                        "colorPrimary" : "#003262",
                        "colorSecondary" : "#FDB515"
                    },
                    {
                        "name" : "Oregon State",
                        "mascot" : "Beavers",
                        "abbreviation" : "ORST",
                        "prestige" : "75",
                        "colorPrimary" : "#DC4405",
                        "colorSecondary" : "#000000"
                    }
                ]
            },
            {
                "confName" : "American",
                "confFullName" : "American Athletic Conference",
                "teams" :
                [
                    {
                        "name" : "Central Florida",
                        "mascot" : "Knights",
                        "abbreviation" : "UCF",
                        "prestige" : "82",
                        "colorPrimary" : "#BA9B37",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Cincinnati",
                        "mascot" : "Bearcats",
                        "abbreviation" : "CINC",
                        "prestige" : "82",
                        "colorPrimary" : "#E00122",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "East Carolina",
                        "mascot" : "Pirates",
                        "abbreviation" : "ECU",
                        "prestige" : "75",
                        "colorPrimary" : "#592A8A",
                        "colorSecondary" : "#FDC82F"
                    },
                    {
                        "name" : "Houston",
                        "mascot" : "Cougars",
                        "abbreviation" : "HOU",
                        "prestige" : "80",
                        "colorPrimary" : "#C8102E",
                        "colorSecondary" : "#B2B4B2"
                    },
                    {
                        "name" : "Memphis",
                        "mascot" : "Tigers",
                        "abbreviation" : "MEM",
                        "prestige" : "75",
                        "colorPrimary" : "#003087",
                        "colorSecondary" : "#898D8D"
                    },
                    {
                        "name" : "Navy",
                        "mascot" : "Midshipmen",
                        "abbreviation" : "NAVY",
                        "prestige" : "70",
                        "colorPrimary" : "#00205B",
                        "colorSecondary" : "#C5B783"
                    },
                    {
                        "name" : "Southern Methodist",
                        "mascot" : "Mustangs",
                        "abbreviation" : "SMU",
                        "prestige" : "75",
                        "colorPrimary" : "#0033A0",
                        "colorSecondary" : "#C8102E"
                    },
                    {
                        "name" : "South Florida",
                        "mascot" : "Bulls",
                        "abbreviation" : "USF",
                        "prestige" : "70",
                        "colorPrimary" : "#006747",
                        "colorSecondary" : "#CFC493"
                    },
                    {
                        "name" : "Temple",
                        "mascot" : "Owls",
                        "abbreviation" : "TEMP",
                        "prestige" : "70",
                        "colorPrimary" : "#9D2235",
                        "colorSecondary" : "#C1C6C8"
                    },
                    {
                        "name" : "Tulane",
                        "mascot" : "Green Wave",
                        "abbreviation" : "TULN",
                        "prestige" : "75",
                        "colorPrimary" : "#006747",
                        "colorSecondary" : "#418FDE"
                    },
                    {
                        "name" : "Tulsa",
                        "mascot" : "Golden Hurricane",
                        "abbreviation" : "TLSA",
                        "prestige" : "75",
                        "colorPrimary" : "#002D72",
                        "colorSecondary" : "#C8102E"
                    }
                ]
            },
            {
                "confName" : "MWC",
                "confFullName" : "Mountain West Conference",
                "teams" :
                [
                    {
                        "name" : "Boise State",
                        "mascot" : "Broncos",
                        "abbreviation" : "BOI",
                        "prestige" : "80",
                        "colorPrimary" : "#0033A0",
                        "colorSecondary" : "#D64309"
                    },
                    {
                        "name" : "Fresno State",
                        "mascot" : "Bulldogs",
                        "abbreviation" : "FRES",
                        "prestige" : "75",
                        "colorPrimary" : "#DB0032",
                        "colorSecondary" : "#002E6D"
                    },
                    {
                        "name" : "Nevada",
                        "mascot" : "Wolfpack",
                        "abbreviation" : "NEV",
                        "prestige" : "70",
                        "colorPrimary" : "#003366",
                        "colorSecondary" : "#807F84"
                    },
                    {
                        "name" : "San Diego State",
                        "mascot" : "Aztecs",
                        "abbreviation" : "SDSU",
                        "prestige" : "75",
                        "colorPrimary" : "#A6192E",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "UNLV",
                        "mascot" : "Rebels",
                        "abbreviation" : "UNLV",
                        "prestige" : "65",
                        "colorPrimary" : "#CF0A2C",
                        "colorSecondary" : "#CAC8C8"
                    },
                    {
                        "name" : "Wyoming",
                        "mascot" : "Cowboys",
                        "abbreviation" : "WYO",
                        "prestige" : "70",
                        "colorPrimary" : "#492F24",
                        "colorSecondary" : "#FFC425"
                    },
                    {
                        "name" : "Air Force",
                        "mascot" : "Falcons",
                        "abbreviation" : "AFA",
                        "prestige" : "65",
                        "colorPrimary" : "#003087",
                        "colorSecondary" : "#8A8D8F"
                    },
                    {
                        "name" : "Colorado State",
                        "mascot" : "Rams",
                        "abbreviation" : "CSU",
                        "prestige" : "70",
                        "colorPrimary" : "#1E4D2B",
                        "colorSecondary" : "#C8C372"
                    },
                    {
                        "name" : "Hawaii",
                        "mascot" : "Rainbow Warriors",
                        "abbreviation" : "HAW",
                        "prestige" : "70",
                        "colorPrimary" : "#024731",
                        "colorSecondary" : "#C8C8C8"
                    },
                    {
                        "name" : "New Mexico",
                        "mascot" : "Lobos",
                        "abbreviation" : "UNM",
                        "prestige" : "60",
                        "colorPrimary" : "#BA0C2F",
                        "colorSecondary" : "#63666A"
                    },
                    {
                        "name" : "San Jose State",
                        "mascot" : "Spartans",
                        "abbreviation" : "SJSU",
                        "prestige" : "70",
                        "colorPrimary" : "#0055A2",
                        "colorSecondary" : "#E5A823"
                    },
                    {
                        "name" : "Utah State",
                        "mascot" : "Aggies",
                        "abbreviation" : "USU",
                        "prestige" : "70",
                        "colorPrimary" : "#00263A",
                        "colorSecondary" : "#8A8D8F"
                    }
                ]
            },
            {
                "confName" : "SBC",
                "confFullName" : "Sun Belt Conference",
                "teams" :
                [
                    {
                        "name" : "Appalachian State",
                        "mascot" : "Mountaineers",
                        "abbreviation" : "APP",
                        "prestige" : "75",
                        "colorPrimary" : "#222222",
                        "colorSecondary" : "#FFCC00"
                    },
                    {
                        "name" : "Coastal Carolina",
                        "mascot" : "Chanticleers",
                        "abbreviation" : "CCU",
                        "prestige" : "75",
                        "colorPrimary" : "#006F71",
                        "colorSecondary" : "#A27752"
                    },
                    {
                        "name" : "Georgia Southern",
                        "mascot" : "Eagles",
                        "abbreviation" : "GASO",
                        "prestige" : "70",
                        "colorPrimary" : "#011E41",
                        "colorSecondary" : "#A3AAAE"
                    },
                    {
                        "name" : "Georgia State",
                        "mascot" : "Panthers",
                        "abbreviation" : "GST",
                        "prestige" : "70",
                        "colorPrimary" : "#0039A6",
                        "colorSecondary" : "#C60C30"
                    },
                    {
                        "name" : "James Madison",
                        "mascot" : "Dukes",
                        "abbreviation" : "JMU",
                        "prestige" : "70",
                        "colorPrimary" : "#450084",
                        "colorSecondary" : "#CBB677"
                    },
                    {
                        "name" : "Marshall",
                        "mascot" : "Thundering Herd",
                        "abbreviation" : "MAR",
                        "prestige" : "70",
                        "colorPrimary" : "#00B140",
                        "colorSecondary" : "#A2AAAD"
                    },
                    {
                        "name" : "Old Dominion",
                        "mascot" : "Monarchs",
                        "abbreviation" : "ODU",
                        "prestige" : "65",
                        "colorPrimary" : "#003087",
                        "colorSecondary" : "#7C878E"
                    },
                    {
                        "name" : "Arkansas State",
                        "mascot" : "Red Wolves",
                        "abbreviation" : "ARST",
                        "prestige" : "70",
                        "colorPrimary" : "#CC092F",
                        "colorSecondary" : "#000000"
                    },
                    {
                        "name" : "Louisiana",
                        "mascot" : "Ragin' Cajuns",
                        "abbreviation" : "ULL",
                        "prestige" : "75",
                        "colorPrimary" : "#CE181E",
                        "colorSecondary" : "#0A0203"
                    },
                    {
                        "name" : "Louisiana Monroe",
                        "mascot" : "Warhawks",
                        "abbreviation" : "ULM",
                        "prestige" : "70",
                        "colorPrimary" : "#840029",
                        "colorSecondary" : "#FDB913"
                    },
                    {
                        "name" : "South Alabama",
                        "mascot" : "Jaguars",
                        "abbreviation" : "USA",
                        "prestige" : "70",
                        "colorPrimary" : "#00205B",
                        "colorSecondary" : "#BF0D3E"
                    },
                    {
                        "name" : "Southern Miss",
                        "mascot" : "Golden Eagles",
                        "abbreviation" : "SMIS",
                        "prestige" : "70",
                        "colorPrimary" : "#000000",
                        "colorSecondary" : "#FFAB00"
                    },
                    {
                        "name" : "Texas State",
                        "mascot" : "Bobcats",
                        "abbreviation" : "TST",
                        "prestige" : "70",
                        "colorPrimary" : "#501214",
                        "colorSecondary" : "#8D734A"
                    },
                    {
                        "name" : "Troy",
                        "mascot" : "Trojans",
                        "abbreviation" : "TROY",
                        "prestige" : "70",
                        "colorPrimary" : "#8A2432",
                        "colorSecondary" : "#B3B5B8"
                    }
                ]
            }             
        ]
    };
    init();
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('team', data.teams[0].name);
}
else
{
    data = JSON.parse(sessionStorage.getItem('data'))
}
 
weeksSimmed = Number(sessionStorage.getItem("weeksSimmed"))


if (location.pathname.includes("teams"))
{
    let teamName = decodeURI(location.pathname.split("/")[11]);
    sessionStorage.setItem("team", teamName);
    teamPage();
}

if (location.pathname.includes("confStandings"))
{
    document.getElementById('logo').setAttribute("src", `teams/${sessionStorage.getItem('team')}/logo.png`); 
}

if (location.pathname.includes("rankings"))
{
    displayRankings();
    document.getElementById('logo').setAttribute("src", `teams/${sessionStorage.getItem('team')}/logo.png`); 
}


for (team of data.teams)
{
    if (team.name == sessionStorage.getItem('team'))
    {
        sessionStorage.setItem("colorPrimary", team.colorPrimary);
        sessionStorage.setItem("colorSecondary", team.colorSecondary);
        
        let path = []
        path.push("teams")
        path.push(team.name)
        path.push("team.html")

        document.getElementById('navbar').children[1].children[0].setAttribute("href", path.join("/")); 
    }
}

document.getElementById("navbar").style.background = sessionStorage.getItem('colorPrimary');
document.getElementById("logobox").style.background = "white";

document.querySelectorAll('.navlink').forEach(link => { link.style.background = sessionStorage.getItem('colorPrimary'); });
document.querySelectorAll('.navlink').forEach(link => { link.style.color = sessionStorage.getItem('colorSecondary'); });

document.querySelectorAll('.navbutton').forEach(button => { button.style.background = sessionStorage.getItem('colorPrimary'); });
document.querySelectorAll('.navbutton').forEach(button => { button.style.color = sessionStorage.getItem('colorSecondary'); });

document.getElementById("active").style.background = sessionStorage.getItem('colorSecondary');
document.getElementById("active").style.color = sessionStorage.getItem('colorPrimary');

display();