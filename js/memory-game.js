'use strict'

const state = {
	isClickable: true,
    paired: 0,
}

function init() {
    initState()
	const nums = initNums()
    const strHtml = 
        nums.map(num => `
            <article class="card" onclick="onCardClick(this)"><div>${num}</div></article>`).join('')

    document.querySelector('main').innerHTML = strHtml
}

function initState() {
    state.isClickable = true
    state.paired = 0
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
	if (!state.isClickable) return

	const elSelectedCard = document.querySelector('.selected')
	elCard.classList.add('selected')

	if (!elSelectedCard) return
	state.isClickable = false

	const elSelectedCards = document.querySelectorAll('.selected')

	if (elSelectedCard.innerText === elCard.innerText) {
		elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
		elSelectedCards.forEach(elCard => elCard.classList.add('matched'))
		updateStats()
        state.isClickable = true
	} else {
		setTimeout(() => {
			elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
			state.isClickable = true
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
