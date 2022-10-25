let power = 15;
let passFreq = 0.5;
let comp = 0.6;
let sack = 0.06;
let fumble = 0.02;
let afMaster = 0.85;
let int = 0.1;


function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
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

a = 90;
b = 85;

data = {
    "teams" : [
        {
            "name" : "Team1",
            "offense" : {
                "pass" : a,
                "run" : a, 
                "st" : a
            },
            "defense" : {
                "pass" : a,
                "run" : a
            }
        },
        {
            "name" : "Team2",
            "offense" : {
                "pass" : b,
                "run" : b,
                "st" : b
            },
            "defense" : {
                "pass" : b,
                "run" : b           
            }
        }
    ]
}

teamA = data.teams[0];
teamB = data.teams[1];

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

// let Aavg = 0;
// let Bavg = 0;
// let tests = 10000;
// let wins = 0;
// let losses = 0;

// for (let i = 0; i < tests; i++)
// {
//     let game = simGame(teamA, teamB);
//     Aavg += game.scoreA;
//     Bavg += game.scoreB;

//     game.scoreA > game.scoreB ? wins++ : losses++;
// }

// Aavg /= tests;
// Bavg /= tests;

// console.log(Aavg, Bavg)
// console.log(wins/tests*100, losses/tests*100)
// console.log(getWinProb(a, b))

function getWinProb(teamARating, teamBRating)
{
    sum = Math.pow(teamARating, power) + Math.pow(teamBRating, power);
    teamAChance = Math.pow(teamARating, power) / sum * 100;
    return teamAChance;
}

function testPass()
{
    let tests = [];
    let sum = 0;

    for (let i = 0; i < 1000; i++)
    {
        result = simPass(comp)
        tests.push(result);
        sum += result.yards;
    }

    let avg = sum / 1000;

    // for (test of tests)
    // {
    //     console.log(test);
    // }

    tests.sort((a, b) => a.yards - b.yards)
    console.log(tests[100])
    console.log(tests[200])
    console.log(tests[300])
    console.log(tests[400])
    console.log(tests[500])
    console.log(tests[600])
    console.log(tests[700])
    console.log(tests[800])
    console.log(tests[900])
    console.log(avg);
}

function testRun()
{
    let tests = [];
    let sum = 0;

    for (let i = 0; i < 1000; i++)
    {
        result = simRun()
        tests.push(result);
        sum += result.yards;
    }

    let avg = sum / 1000;

    // for (test of tests)
    // {
    //     console.log(test);
    // }

    tests.sort((a, b) => a.yards - b.yards)
    console.log(tests[100])
    console.log(tests[200])
    console.log(tests[300])
    console.log(tests[400])
    console.log(tests[500])
    console.log(tests[600])
    console.log(tests[700])
    console.log(tests[800])
    console.log(tests[900])
    console.log(avg);
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


testRun()