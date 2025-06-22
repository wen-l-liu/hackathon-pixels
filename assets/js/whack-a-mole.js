const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

const sound = new Audio("assets/images/whack.mp3")

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/images/mole.png'

    // Add randm chance for star mole
     const isSpecialMole = Math.random() < 0.3; // 30% chance for a special mole
    
    if (isSpecialMole) {
        img.src = 'assets/images/starmole.png' // Star mole image
        img.classList.add('star-mole') // Class for styling
        

    } else {
        img.src = 'assets/images/mole.png'
    }
    img.addEventListener('click', () => {
        // Award 50 points for special mole, 10 for regular mole
        if (isSpecialMole) {
            score += 50
            new Audio("assets/images/crash.mp3").play() //Crash audio
            scoreEl.textContent = score
            img.src = 'assets/images/starmole.png' // Change to star mole image
        } else {
            score += 10
            sound.play()
            scoreEl.textContent = score
            img.src = 'assets/images/mole.png' // Change to regular mole image
        }
        
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)
}
run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

// Reset Score Button Functionality
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) { // Need to figure why the button does not display before adding listener
    resetBtn.addEventListener('click', () => {
        score = 0;
        scoreEl.textContent = score;
    });
}