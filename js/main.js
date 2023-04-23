const NUM_EPISODES = 52;
let characters;
let data, linechart; 
let all_character_stats; 
let global_word_arr;
let morty_stats, summer_stats, jerry_stats, beth_stats, rick_stats, jessica_stats, principal_stats, poopybutthole_stats, goldenfold_stats, squanchy_stats, birdperson_stats, tammy_stats;


d3.csv("/data/data.csv")
    .then(_data =>{
        data = _data;
        console.log(_data)

    table = new Tabulator("#table", {
         height: 205,
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


    let wordArr = formatWords(_data)
    global_word_arr = wordArr

    set_characters();

    word_cloud = new Wordcloud({
        parentElement: '#word_cloud',
        containerHeight: 300,
        containerWidth: 466.83
    }, _data, wordArr);
    word_cloud.updateVis()

    all_character_stats = 
    {
        All: get_char_stats(data,"All"), 
        Morty: get_char_stats(data,"Morty"), 
        Rick: get_char_stats(data, "Rick"),
        Summer: get_char_stats(data, "Summer"),
        Jerry: get_char_stats(data, "Jerry"),
        Beth: get_char_stats(data, "Beth"),
        Jessica: get_char_stats(data, "Jessica"),
        PrincipalVagina: get_char_stats(data, "Principal Vagina"),
        MrPoopybutthole: get_char_stats(data, "Mr. Poopybutthole"),
        Goldenfold: get_char_stats(data, "Mr.Goldenfold"),
        Squanchy: get_char_stats(data, "Squanchy"),
        Birdperson: get_char_stats(data, "Birdperson"),
        Tammy: get_char_stats(data, "Tammy")
    }
    


    linechart = new LineChart({ parentElement: '#linechart'}, get_linechart_data(all_character_stats["Morty"]));
    linechart.updateVis();
})


function set_characters()
{

     characters = {
        All: {
            name: "All",
            image: "/CharacterImages/allcharacters.png",
            info: get_char_stats(data, "All")
        },
        Rick: {
            name: "Rick Sanchez",
            image: "/CharacterImages/rick.png",
            info: get_char_stats(data, "Rick")
        },
        Morty: {
            name: "Morty Smith",
            image: "/CharacterImages/morty.png",
            info: get_char_stats(data, "Morty")
        },
        Summer: {
            name: "Summer Smith",
            image: "/CharacterImages/summer.png",
            info: get_char_stats(data, "Summer")
        },
        Beth: {
            name: "Beth Smith",
            image: "/CharacterImages/beth.png",
            info: get_char_stats(data, "Beth")
        },
        Jerry: {
            name: "Jerry Smith",
            image: "/CharacterImages/jerry.png",
            info: get_char_stats(data, "Jerry")
        },
        Jessica: {
            name: "Jessica W.",
            image: "/CharacterImages/jessica.png",
            info: get_char_stats(data, "Jessica")
        },
        PrincipalVagina: {
            name: "Principal Vagina",
            image: "/CharacterImages/principal_vag.png",
            info: get_char_stats(data, "Principal Vagina")
        },
        Poopybutthole: {
            name: "Mr. Poopybutthole",
            image: "/CharacterImages/poopybutthole.png",
            info: get_char_stats(data, "Mr. Poopybutthole")
        },
        Goldenfold: {
            name: "Mr. Goldenfold",
            image: "/CharacterImages/goldenfold.png",
            info: get_char_stats(data, "Mr. Goldenfold")
        },
        Squanchy: {
            name: "Squanchy",
            image: "/CharacterImages/squanchy.png",
            info: get_char_stats(data, "Squanchy")
        },
        Birdperson: {
            name: "Birdperson",
            image: "/CharacterImages/birdperson.png",
            info: get_char_stats(data, "Birdperson")
        },
        Tammy: {
            name: "Tammy Gueterman",
            image: "/CharacterImages/tammy.png",
            info: get_char_stats(data, "Tammy")
        },
}

}
function get_char_stats(data, char_name)
{
    
    let total_ep = 0;
    let total_lines = 0;
    let total_seasons = 0;
    let lines_by_ep = {};
    
    let episode_counter, season_counter =0;
        data.forEach(d => {
           if (char_name == "All") {
            total_lines += 1
           }
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
        //console.log(char_stats)
        
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

return line_chart_data;
}

function getStopWords() {
    stop_words = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"]
    for (let i = 0; i < stop_words.length; i++) {
        stop_words[i] = stop_words[i].toUpperCase()
    }
    return stop_words
}

function formatWords(words) {

    let wordDict = {}
    let wordArr = []
    
    stop_words = getStopWords()

    words.forEach(d => {
        temp_line = d.line.replace(/[.,;!?":'-]/g, "")
        line_list = temp_line.split(" ")
        line_list.forEach(l => {
            l = l.toUpperCase()

            if (!stop_words.includes(l) && l != "") {

            if (wordDict[l] == undefined) {
                wordDict[l] = 1
            } else {
                wordDict[l] += 1
            }
        }
        })
    })

    for (const [key, value] of Object.entries(wordDict)) {
        temp = Object()
        temp.word = key
        temp.count = value
        wordArr.push(temp)
      }

      return wordArr

}

function loadCharacter(character){
    if (character == "all") {
        linechart.data = get_linechart_data(all_character_stats["Morty"])
        console.log(global_word_arr)
        word_cloud.words = global_word_arr
    } else {
        let temp_data = get_linechart_data(all_character_stats[character]);
        let temp_words = []
        document.getElementById("charimg").src = characters[character].image;
        document.getElementById("charname").innerHTML= characters[character].name;
        document.getElementById("random").innerHTML = "Episodes Appeared In: " + all_character_stats[character].total_ep;
        document.getElementById("seasons").innerHTML = "Seasons Appeared In: " + all_character_stats[character].total_seasons;
        document.getElementById("lines").innerHTML = "Total Lines: " + all_character_stats[character].total_lines;

        

        linechart.data = temp_data;

        data.forEach(d => {
            if (d.character == character) {
                temp_words.push(d)
            }
        })

        console.log(temp_words)
        let updated_words = formatWords(temp_words)
        word_cloud.words = updated_words
    }

    word_cloud.updateVis()
    linechart.updateVis();
}