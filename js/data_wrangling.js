export function get_char_stats(char_name)
{
    let char_stats = Object();
    char_stats.total_ep = 0;
    char_stats.total_lines = 0;
    char_stats.total_seasons = 0;
    char_stats.lines_by_ep = {};
    
    let episode_counter, season_counter =0;
    d3.csv("/data/data(1).csv")
    .then(data =>{
        data.forEach(d => {
           // console.log(d.episode_num)
           // console.log(d.character)
           if(d.character == char_name)
           {
            //console.log(d)
            char_stats.total_lines+=1;
          
            if(season_counter != d.season)
            {
                char_stats.total_seasons +=1;
                season_counter = d.season;
            }
            if(episode_counter != d.episode_num)
            {
                char_stats.total_ep +=1;
                episode_counter = d.episode_num;
                char_stats.lines_by_ep[d.episode_num] =1;
                
            }
            else
            {
                char_stats.lines_by_ep[d.episode_num]+=1
            }
            

           
           }
           
          
        });
        console.log(data)
} )
console.log(char_stats)
}


let morty_stats = get_char_stats("Morty");
let rick_stats = get_char_stats("Rick");
let summer_stats = get_char_stats("Summer");
let jerry_stats = get_char_stats("Jerry");
let beth_stats = get_char_stats("Beth");
let jessica_stats = get_char_stats("Jessica");