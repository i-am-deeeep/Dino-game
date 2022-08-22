import { setupGround, updateGround } from "./ground.js"

const worldElem=document.querySelector("[data-world]")
const scoreElem=document.querySelector("[data-score]")
const startScreenElem=document.querySelector("[data-start-screen]")
const WORLD_WIDTH=100
const WORLD_HEIGHT=30
const SPEEDSCALEINCREASE=0.00001
let lastTime
let speedScale
let score
setWorldRatio()
window.addEventListener('resize',setWorldRatio)
document.addEventListener("keydown",handleStart,{ once:true })
function handleStart(){
    lastTime=null
    score=0
    startScreenElem.classList.add("hide")
    setupGround()
    speedScale=1
    window.requestAnimationFrame(update)
}
function update(time){
    if(lastTime==null){
        lastTime=time
        window.requestAnimationFrame(update)
        return    
    }
    const delta=time-lastTime
    updateScore(delta)
    updateGround(delta,speedScale)
    updateSpeedScale(delta)
    lastTime=time
    window.requestAnimationFrame(update)
}
function updateSpeedScale(delta){
    speedScale+=(delta*SPEEDSCALEINCREASE)
}
function updateScore(delta){
    score+=delta*0.01
    scoreElem.textContent=Math.floor(score)
}

function setWorldRatio(){
    let worldRatio
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldRatio = window.innerWidth / WORLD_WIDTH
    }
    else {
        worldRatio = window.innerHeight / WORLD_HEIGHT
    }
    worldElem.style.width = `${WORLD_WIDTH * worldRatio}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldRatio}px`
}