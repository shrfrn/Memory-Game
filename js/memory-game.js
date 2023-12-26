'use strict'

const state = {
	isClickable: true,
}

function init() {
	const nums = initNums()
    const strHtml = 
        nums.map(num => `
            <article class="card" onclick="onCardClick(this)"><div>${num}</div></article>`).join('')

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
	if (!state.isClickable) return

	const elSelectedCard = document.querySelector('.selected')
	elCard.classList.add('selected')

	if (!elSelectedCard) return
	state.isClickable = false

	const elSelectedCards = document.querySelectorAll('.selected')

	if (elSelectedCard.innerText === elCard.innerText) {
		elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
		elSelectedCards.forEach(elCard => elCard.classList.add('matched'))
		state.isClickable = true
	} else {
		setTimeout(() => {
			elSelectedCards.forEach(elCard => elCard.classList.remove('selected'))
			state.isClickable = true
		}, 2000)
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
