'use strict'

const state = {
    paired: 0,
}

function init() {
    state.paired = 0
    
    const nums = initNums()
    const strHtml = 
        nums.map(num => `
            <article 
                class="card" 
                onclick="onCardClick(this)"> <div>${num}</div>
            </article>`).join('')
    
    document.querySelector('main').innerHTML = strHtml
}

function initNums() {
    const nums = []

	for (var i = 0; i < 20; i++) {
		nums.push(i % 10)
	}

    for(var i = 0; i < nums.length; i++){
        const idx = getRandomInt(0, nums.length)
        
        const temp = nums[idx]
        nums[idx] = nums[i]
        nums[i] = temp
    }
    return nums
}

function onCardClick(elCard) {
	var elSelectedCards = document.querySelectorAll('.selected')
    if(elSelectedCards.length === 2) return

	elCard.classList.add('selected')

    if(elSelectedCards.length === 0) return
    else elSelectedCards = document.querySelectorAll('.selected')

	if (elSelectedCards[0].innerText === elSelectedCards[1].innerText) {
		elSelectedCards.forEach(elCard => {
            elCard.classList.add('matched')
            elCard.classList.remove('selected')
        })
        updateStats()
	} else {
		setTimeout(() => {
            elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
        }, 2000)
	}
}

function updateStats() {
    const elPaired = document.querySelector('.paired')
    const elRemaining = document.querySelector('.remaining')

    elPaired.innerText = ++state.paired
    elRemaining.innerText = 10 - state.paired

    if(state.paired === 10) {
        const elDialog = document.querySelector('dialog')
        elDialog.showModal()
    }
}

function restart() {
    const elDialog = document.querySelector('dialog')
    elDialog.close()
    init()
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
