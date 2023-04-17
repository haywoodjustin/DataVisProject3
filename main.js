d3.csv("/data/data.csv")
    .then(_data =>{
        console.log(_data)

    table = new Tabulator("#table", {
        // height: 205,
        // responsiveLayout: true, 
        layout: "fitDataStretch", 
        data: _data, 
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Episode", field:"episode_num"},
            {title:"Character", field:"character"},
            {title:"Dialog", field:"line", formatter: "textarea"},
            // {title:"Discovery Year", field:"disc_year"},
            // {title:"Star Type", field:"st_spectype"},
            // {title:"Distance from Earth", field:"sy_dist"},
            // {title:"Number of Stars", field:"sy_snum"},
            // {title:"Habitability", field:"habitable"},
        ],
    });
} )

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
     
}