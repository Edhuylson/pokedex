const modalPage = {}
const modal = document.querySelector("dialog")

modalPage.showPokeModal = (pokeID) => {

    document.body.style.overflow = 'hidden'
    modal.showModal()

    showPoke(pokeID)

}

function showPoke(pokeID) {
    let offset = pokeID - 1
    const limit = 1
    pokeApi.getPokemons(offset, limit)
    .then(pokemon => {
        modal.className = pokemon[0].type
        const modalPokemon = document.getElementsByClassName('modalPokemon')
        modalPokemon[0].innerHTML += `
        <div class="modalBack">
            <img id="modalClose" src="assets/images/arrow.png">
        </div>
        <div class="modalPoke">
            <div class="nameType">
                <span class="pokeName">${pokemon[0].name}</span>
                <span class="pokeTypes">
                    <ol class="types">
                        ${pokemon[0].types.map((type) => `<li class="type ${type} modalType">${type}</li>`).join('')}
                    </ol>
                </span>
            </div>
            <div class="pokeNumber">#${pokemon[0].number}</div>
        </div>
        `

        const modalPhoto = document.getElementsByClassName('modalPhoto')
        modalPhoto[0].innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon[0].id}.svg">`

        const modalDetails = document.getElementsByClassName('modalDetails')
        modalDetails[0].innerHTML = `<div class="detailsMenu">
        <ol>
            <li class='statsOption'><p>Base Stats</p></li>
            <li class='aboutOption'><p>About</p></li>
        </ol>
        </div>
        <div class="detailsContent">
        <section class="about">
            <ol class="description">
                <li>Height</li>
                <li>Weight</li>
                <li>Abilities</li>
            </ol>
            <ol>
                <li>${pokemon[0].height/10}(m)</li>
                <li>${pokemon[0].weight/10}(kg)</li>
                <li class='abilities'>${pokemon[0].abilities.join(', ')}</li>
            </ol>
        </section>
        
        <section class="stats">
            <ol class="description">
                <li>Hp</li>
                <li>Attack</li>
                <li>Defense</li>
                <li>Sp. Attack</li>
                <li>Sp. Defense</li>
                <li>Speed</li>
                <li>Total</li>
            </ol>
            <ol>
                <li class="num">${pokemon[0].stats[0]} <hr class='bar0'></li>
                <li class="num">${pokemon[0].stats[1]} <hr class='bar1'></li>
                <li class="num">${pokemon[0].stats[2]} <hr class='bar2'></li>
                <li class="num">${pokemon[0].stats[3]} <hr class='bar3'></li>
                <li class="num">${pokemon[0].stats[4]} <hr class='bar4'></li>
                <li class="num">${pokemon[0].stats[5]} <hr class='bar5'></li>
                <li class="num">${pokemon[0].stats[6]} <hr class='bar6'></li>
            </ol>
        </section>
        </div>`

        function style1(element, porcent1, porcent2) {
            element.style = `background: linear-gradient(to left, #DCDCDC 0, #DCDCDC ${porcent2}%, #FC8383 ${porcent1}%);`
        }

        function style2(element, porcent1, porcent2) {
            element.style = `background: linear-gradient(to right, #72CE97 0, #72CE97 ${porcent1}%, #DCDCDC ${porcent2}%);`
        }

        for (let i = 0; i <= 6; i++){

            if (i <= 5) {
                porcent1 = pokemon[0].stats[i] 
                porcent2 = 100 - porcent1
    
                if (pokemon[0].stats[i] < 50) {
                    const element = document.querySelector(`.bar${i}`)
                    style1(element, porcent1, porcent2)
                } else {
                    const element = document.querySelector(`.bar${i}`)
                    style2(element, porcent1, porcent2)
                }
            } else {
                porcent1 = (pokemon[0].stats[i] * 100) / 900
                porcent2 = 100 - porcent1
    
                if (pokemon[0].stats[i] < 450) {
                    const element = document.querySelector(`.bar${i}`)
                    style1(element, porcent1, porcent2)
                } else {
                    const element = document.querySelector(`.bar${i}`)
                    style2(element, porcent1, porcent2)
                }
            }   

        }



        const statsOption = document.getElementsByClassName('statsOption')
        statsOption[0].setAttribute('tabindex', '0');
        statsOption[0].focus()
        statsOption[0].addEventListener('click', () => {
            document.querySelector('.stats').style.display = 'grid'
            document.querySelector('.about').style.display = 'none'
        })

        const aboutOption = document.getElementsByClassName('aboutOption')
        aboutOption[0].setAttribute('tabindex', '0');
        aboutOption[0].addEventListener('click', () => {
            aboutOption[0].focus()
            document.querySelector('.stats').style.display = 'none'
            document.querySelector('.about').style.display = 'grid'
        })

        const closeModal = document.getElementById("modalClose")
        closeModal.addEventListener('click', () => {
            modal.close()
            modalPokemon[0].innerHTML = ``
            modalPhoto[0].innerHTML = ``
            modalDetails[0].innerHTML = ``
            document.body.style.overflow = 'visible'
        })
    })
    
}