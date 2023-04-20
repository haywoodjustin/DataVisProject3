const NUM_EPISODES = 52;
function get_char_stats(data, char_name)
{
    
    let total_ep = 0;
    let total_lines = 0;
    let total_seasons = 0;
    let lines_by_ep = {};
    
    let episode_counter, season_counter =0;

        data.forEach(d => {
           if(d.character == char_name)
           {
            //console.log(d)
            total_lines+=1;
          
            if(season_counter != d.season)
            {
                total_seasons +=1;
                season_counter = d.season;
            }

            if(episode_counter != d.episode_num)
            {
                total_ep +=1;
                episode_counter = d.episode_num;
                lines_by_ep[d.episode_num] =1;
            }

            else
            {
                lines_by_ep[d.episode_num]+=1
            }
           }
        });

        let char_stats = {
            total_ep: total_ep,
            total_lines: total_lines,
            total_seasons: total_seasons,
            lines_by_ep: lines_by_ep
        }
        console.log(char_stats)
        return char_stats;
        
}

function get_linechart_data(stats)
{
    let line_chart_data= [];

    for(let i = 0; i <NUM_EPISODES; i++)
    {
        let temp = Object();

        temp.x = i;
        if(stats.lines_by_ep[i]==undefined)
        {
            temp.y = 0;
        }
        else
        {
            temp.y = stats.lines_by_ep[i];
        }

        line_chart_data.push(temp);
    }
console.log(line_chart_data);

return line_chart_data;
}

let data, linechart; 
let morty_stats, summer_stats, jerry_stats, beth_stats, rick_stats, jessica_stats, principal_stats, poopybutthole_stats, 
    goldenfold_stats, squanchy_stats, birdperson_stats, tammy_stats;

d3.csv("/data/data.csv")
    .then(_data =>{
        data = _data;
        console.log(_data)

    let wordDict = {}
    let wordArr = []

    table = new Tabulator("#table", {
        // height: 205,
        // responsiveLayout: true, 
        layout: "fitDataStretch", 
        data: _data, 
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Episode", field:"episode_num"},
            {title:"Character", field:"character"},
            {title:"Dialog", field:"line", formatter: "textarea"}
        ],
    });

    _data.forEach(d => {
        temp_line = d.line.replace(/[.,;!?":'-]/g, "")
        line_list = temp_line.split(" ")
        line_list.forEach(l => {
            l = l.toUpperCase()
            if (wordDict[l] == undefined) {
                wordDict[l] = 1
            } else {
                wordDict[l] += 1
            }
        })
    })

    for (const [key, value] of Object.entries(wordDict)) {
        temp = Object()
        temp.word = key
        temp.count = value
        wordArr.push(temp)
      }
      
    
    wordArr.sort((a, b) => b.count - a.count)

    console.log(wordArr)
 


    word_cloud = new Wordcloud({
        parentElement: '#word_cloud',
        containerHeight: 300,
        containerWidth: 466.83
    }, _data, "day", "Day of Week", "Total Calls", "Amount of Calls Per Day");

    
    morty_stats = get_char_stats(data,"Morty");
    summer_stats = get_char_stats(data, "Summer");
    jerry_stats = get_char_stats(data, "Jerry");
    beth_stats = get_char_stats(data, "Beth");
    rick_stats = get_char_stats(data, "Rick");
    jessica_stats = get_char_stats(data, "Jessica");
    principal_stats = get_char_stats(data, "Principal Vagina");
    poopybutthole_stats = get_char_stats(data, "Mr.Poopybutthole")
    goldenfold_stats = get_char_stats(data, "Mr. Goldenfold");
    squanchy_stats = get_char_stats(data, "Squanchy");
    birdperson_stats = get_char_stats(data, "Birdperson");
    tammy_stats = get_char_stats(data, "Tammy");

    linechart = new LineChart({ parentElement: '#linechart'}, get_linechart_data(morty_stats));
    linechart.updateVis();
})

let characters = {
        Rick: {
            name: "Rick Sanchez",
            image: "/CharacterImages/rick.png"
        },
        Morty: {
            name: "Morty Smith",
            image: "/CharacterImages/morty.png"
        },
        Summer: {
            name: "Summer Smith",
            image: "/CharacterImages/summer.png"
        },
        Beth: {
            name: "Beth Smith",
            image: "/CharacterImages/beth.png"
        },
        Jerry: {
            name: "Jerry Smith",
            image: "/CharacterImages/jerry.png"
        },
        Jessica: {
            name: "Jessica W.",
            image: "/CharacterImages/jessica.png"
        },
        Spaceship: {
            name: "Spacechip",
            image: "/CharacterImages/spaceship.png"
        },
        Poopybutthole: {
            name: "Mr. Poopybutthole",
            image: "/CharacterImages/poopybutthole.png"
        },
        Goldenfold: {
            name: "Mr. Goldenfold",
            image: "/CharacterImages/goldenfold.png"
        },
        Squanchy: {
            name: "Squanchy",
            image: "/CharacterImages/squanchy.png"
        },
        Birdperson: {
            name: "Birdperson",
            image: "/CharacterImages/birdperson.png"
        },
        Tammy: {
            name: "Tammy Gueterman",
            image: "/CharacterImages/tammy.png"
        },
}

function loadCharacter(character){
     console.log(character)
}