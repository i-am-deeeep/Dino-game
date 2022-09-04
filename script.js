import { setupGround, updateGround } from "./ground.js"
import { getDinoRect, setDinoLose, setupDino, updateDino } from "./dino.js"
import { getCactusRects, setupCactus, updateCactus } from "./cactus.js"

const worldElem=document.querySelector("[data-world]")
const scoreElem=document.querySelector("[data-score]")
const startScreenElem=document.querySelector("[data-start-screen]")
const WORLD_WIDTH=100
const WORLD_HEIGHT=30
const SPEEDSCALEINCREASE=0.00001
let lastTime
let speedScale
let score
const p=document.querySelector(".pause")
let a=0
p.addEventListener("click",pauseit)
function pauseit(){
    if(a==0){
        a=1
        p.textContent="Resume"
    }
    else{
        a=0
        p.textContent="Pause"
        lastTime=null
        window.requestAnimationFrame(update)
    }
}

setWorldRatio()
window.addEventListener('resize',setWorldRatio)
document.addEventListener("keydown",handleStart,{ once:true })
function handleStart(){
    p.addEventListener("click",pauseit)
    lastTime=null
    score=0
    startScreenElem.classList.add("hide")
    setupDino()
    setupGround()
    setupCactus()
    speedScale=1
    window.requestAnimationFrame(update)
}
function update(time){
    if(a==1){
        return
    }
    if(lastTime==null){
        lastTime=time
        window.requestAnimationFrame(update)
        return    
    }
    const delta=time-lastTime
    lastTime=time
    updateScore(delta)
    updateGround(delta,speedScale)
    updateDino(delta,speedScale)
    updateCactus(delta,speedScale)
    updateSpeedScale(delta)
    if(checkLose()) return handleLose()
    window.requestAnimationFrame(update)
    
}
function updateSpeedScale(delta){
    speedScale+=(delta*SPEEDSCALEINCREASE)
}
function updateScore(delta){
    score+=delta*0.01
    scoreElem.textContent=Math.floor(score)
}
function checkLose(){
    const rect2=getDinoRect()
    return getCactusRects().some(rect1=>isCollision(rect1,rect2))
}
function isCollision(rect1,rect2){
    return (rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top)
}
function handleLose(){
    p.removeEventListener("click",pauseit)
    setDinoLose() 
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
      }, 100) 
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