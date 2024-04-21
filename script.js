let dataChart;
let data2Chart;

async function onclickLeft() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    let response = await getPokemonData(pokemonName);
    let pokeImg = document.getElementById("pokemonSprite");
    pokeImg.src = response.img;
    pokeImg.style.display = "block";
    card.className = 'card active'
    /*
    card.innerHTML =
        `<div class="pokebox found">
            <span class="closebox">x</span>
            <h3 class="pokename">${pokemonName}</h3>
        </div>`;
    */
}

async function onclickRight() {
    const pokemonName = document.getElementById("pokemonName2").value.toLowerCase();
    let response = await getPokemonData(pokemonName);
    let pokeImg = document.getElementById("pokemonSprite2");
    pokeImg.src = response.img;
    pokeImg.style.display = "block";
    card.className = 'card active'
}
async function getPokemonData(name){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // pokemon name
        
        if(!response.ok){
            throw new Error("Could not find the Pokemon");
        }
        const pokemonData = await response.json();
        
        let pokeDex = pokemonData.order;

        // let pokemonStats = pokemonData.stats;
        const statHp = pokemonData.stats[0].base_stat
        const statAtk = pokemonData.stats[1].base_stat
        const statDef = pokemonData.stats[2].base_stat
        const statSpeAtk = pokemonData.stats[3].base_stat
        const statSpeDef = pokemonData.stats[4].base_stat
        const statSpeed = pokemonData.stats[5].base_stat
        const baseExp = pokemonData.base_experience
        const height = pokemonData.height
        const weight = pokemonData.weight

        return {
            img: pokemonData.sprites.front_default,
            Hp: statHp,
            Atk: statAtk,
            Def: statDef,
            Special_Atk: statSpeAtk,
            Special_Def: statSpeDef,
            Speed: statSpeed,
            Base: {Base_experience: baseExp, Weight: weight, Height: height}
        };
        //console.log(pokemonData.stats[0].base_stat)
        //console.log(Hp)
        
    }
    catch(error){
        console.log(error);
    }
}

async function createStatChart () {
    let pokemon1 = document.getElementById("pokemonName").value.toLowerCase();
    let pokemon2 = document.getElementById("pokemonName2").value.toLowerCase();

    if (pokemon1 != "" && pokemon2 != "") {
        if (typeof dataChart !== 'undefined')
            dataChart.destroy();

        try {
            let ctx = document.getElementById('statChart').getContext('2d');
            const data1 = await getPokemonData(pokemon1);
            const data2 = await getPokemonData(pokemon2);
            delete data1.img;
            delete data2.img;
            delete data1.Base;
            delete data2.Base;
            //console.log(data1);
            //console.log(data2);
            dataChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: pokemon1.toUpperCase(), // Note: Define pokemonName1 somewhere in your code
                        data: data1,
                        backgroundColor: 'rgba(89, 213, 224, 1)',
                        borderWidth: 1
                    }, 
                    {
                        label: pokemon2.toUpperCase(), // Note: Define pokemonName1 somewhere in your code
                        data: data2,
                        backgroundColor: 'rgba(244, 83, 138, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    barValueSpacing: 20,
                    tooltips: {
                        mode: 'index'
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

async function createExpChart () {
    let pokemon1 = document.getElementById("pokemonName").value.toLowerCase();
    let pokemon2 = document.getElementById("pokemonName2").value.toLowerCase();

    if (pokemon1 != "" && pokemon2 != "") {
        if (typeof data2Chart !== 'undefined')
            data2Chart.destroy();

        try {
            let ctx = document.getElementById('expChart').getContext('2d');
            const data1 = await getPokemonData(pokemon1);
            const data2 = await getPokemonData(pokemon2);

            //onsole.log(data1.Base);
            //console.log(data2.Base);
            data2Chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: pokemon1.toUpperCase(), // Note: Define pokemonName1 somewhere in your code
                        data: data1.Base,
                        backgroundColor: 'rgba(245, 221, 97, 1)',
                        borderWidth: 1
                    }, 
                    {
                        label: pokemon2.toUpperCase(), // Note: Define pokemonName1 somewhere in your code
                        data: data2.Base,
                        backgroundColor: 'rgba(250, 163, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    //indexAxis: 'y',
                    barValueSpacing: 20,
                    tooltips: {
                        mode: 'index'
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
