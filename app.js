
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(300).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))
const pokemonPromises = generatePokemonPromises()
const ul = document.querySelector('[data-js="pokedex"]')

const newArray = Array(6).fill().map((item, index) => {
    return index
})



const fetchPokemon =()=> {   
    Promise.all(pokemonPromises)
    .then(pokemons => {
        return pokemons.reduce((accumulator, {types,name,id,stats}) => {
            const type = types.map(typeInfo => typeInfo.type.name)
            console.log(type);
            accumulator += 
            `<li class="card ${type[0]} ">
                <h1 class="title">#${id}</h1>
                <img class="card-image " alt="${name}" 
                src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png" </>
                <h2 class="title"> ${name} </h2>
                <p class="card-subtitile">${type.join(' | ')}</p>
            </li>` 
            return accumulator
        },'')
        
    }).then(pokemons => {
        ul.innerHTML = pokemons
        const modal = document.querySelectorAll('.card')
        modal.forEach((item,index) => {
            item.addEventListener('click', ()=> {
                activeModal()
                modalClick(index + 1)
                
            })
        })
    })
}


fetchPokemon()
const modalActive = document.querySelector('.container-modal')

function activeModal() {
  modalActive.classList.toggle('ativo')
}
function removeModal(event) {
  if(modalActive === event.target) {
    modalActive.classList.remove('ativo')
  }
}
modalActive.addEventListener('click', removeModal)


function modalClick(event) {

    const element = event
    Promise.all(pokemonPromises)
   .then(pokemon => pokemon.filter(({id})=> id === element))
    .then(pokemon => {
        return pokemon.reduce((accumulator, {types,name,id,stats}) => {
            const type = types.map(typeInfo => typeInfo.type.name)

            const status = stats.map(({base_stat, stat})=>
              `<span class="status-color"></span><li class="${stat.name}">
              <style>
              .${stat.name}::before{
                width: ${base_stat +20 }px;
              }
              </style> 
              ${stat.name}<span>${base_stat}</span></li>`)

             accumulator += 
             `<div class=" ${type[0]} modal">
             <button class="fechar-modal">X</button>
             <div class="pokemon-modal"><img class="card-image " alt="${name}" 
             src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png" </>
             <h2 class="title"> ${name} </h2>
             <p class="card-subtitile">${type.join(' | ')}</p>
             </div>
             <div class="status"><ul>${status}</ul</div>
         </div>`.replace(/,/g, '')
            // .replace('attack', 'atk')
            // .replace('defense', 'def')
            // .replace('special-attack', 'atk-esp')
            // .replace('special-defense', 'def-esp')
            // .replace('speed', 'vel')
             return accumulator
            
        },'')
    }).then(r => {
        const modal = document.querySelector('.container-modal')
        modal.innerHTML = r
        const btnRemoveModal = document.querySelector('.fechar-modal')
        btnRemoveModal.addEventListener('click', activeModal)
    })
    
}






/*Criacao do inpu de pesquisa, podendo ser pesquisado id, nome e classe pokemon */
const inputPokemon = document.querySelector('input')

function handleInput(event) { 
ul.innerHTML= ''
if(event.target.value == '') {
    fetchPokemon()
}else {
Promise.all(pokemonPromises)
.then(r=> r.filter(({id,name,types})=> {
    if(name === event.target.value) {
        return name === event.target.value
    }else if(types[0].type.name === event.target.value) {
        return types[0].type.name === event.target.value
    } else {
        return id === +event.target.value
    }
}))
.then(pokemons => {
   
    return pokemons.reduce((accumulator, pokemon)=> {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        accumulator +=
        `<li class="card ${types[0]}">
        <h1 class="title-id">#${pokemon.id}</h1>
        <img class="card-image" alt="${pokemon.name}" 
        src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" </>
        <h2 class="title"> ${pokemon.name} </h2>
        <p class="card-subtitile">${types.join(' | ')}</p>
    </li>` 
    return accumulator
    }, '')
    }).then(r => {
        ul.innerHTML = r
        const modal = document.querySelectorAll('.card')
            modal.forEach((item) => {
            item.addEventListener('click', ()=> {
                const idpokemon = item.querySelector('.title-id')
                activeModal()
                modalClick(+idpokemon.innerText.replace('#', ''))
            })
        })
        
    })
    }
}
inputPokemon.addEventListener('change', handleInput)



/*--------criando os botoes de cada classe pokemon*/ 
const tipoBtn = [
    {
        type: "grass",
        tipo: "Planta" 
    },
    {
        type: "poison",
        tipo: "Poção"
    },
    {
        type: "fire",
        tipo: "Fogo"
    },
    {
        type: "water",
        tipo: "Água"
    },
    {
        type: "bug",
        tipo: "Erro"
    },
    {
        type: "normal",
        tipo: "Normal"
    },
    {
        type: "ground",
        tipo: "Chão"
    },
    {
        type: "electric",
        tipo: "Elétrico"
    },
    {
        type: "fairy",
        tipo: "Feitiço"
    },
    {
        type: "fighting",
        tipo: "Lutador"
    },
    {
        type: "psychic",
        tipo: "Psíquico"
    },
    {
        type: "rock",
        tipo: "Pedra"
    },
    {
        type: "ice",
        tipo: "Gelo"
    },
    {
        type: "dragon",
        tipo: "Dragão"
    },
    {
        type: "all",
        tipo: "Todos"
    },
]

function creatButton() {
    const btn = tipoBtn.map(({type, tipo}) => {
        return `<button class="${type} btn" value="${type}">${tipo}</button>\n`   
    })
    const newArray = btn.reduce((accumulator, item) => {
       return accumulator += item  
    }, '')
    const btn2 = document.querySelector('.btn-bg')
    btn2.innerHTML = newArray
}
creatButton()

const btnPokemon = document.querySelectorAll('.btn')
btnPokemon.forEach(item => {
    item.addEventListener('click', ()=> {;
        handleClick(item.value);
    })
})

function handleClick(element) {
    if(element === 'all') {
        fetchPokemon()
    }else{
    Promise.all(pokemonPromises)
    .then(r=> r.filter(pokemon=> pokemon.types[0].type.name === element))
    .then(pokemons => {
        return pokemons.reduce((accumulator, pokemon)=> {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator +=
            `<li class="card  ${types[0]}">
            <h1 class="title-id">#${pokemon.id}</h1>
            <img class="card-image " alt="${pokemon.name}" 
            src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" </>
            <h2 class="title"> ${pokemon.name} </h2>
            <p class="card-subtitile">${types.join(' | ')}</p>
        </li>` 
        return accumulator
        }, '')
    }).then(r => {
        ul.innerHTML = r
        const modal = document.querySelectorAll('.card')
            modal.forEach((item,index) => {
            item.addEventListener('click', ()=> {
                const idpokemon = item.querySelector('.title-id')
                activeModal()
                modalClick(+idpokemon.innerText.replace('#', ''))
            })
        })
    })
    }
}


