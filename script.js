const worldElem=document.querySelector("[data-world]")
const WORLD_WIDTH=100
const WORLD_HEIGHT=30

setWorldRatio()
window.addEventListener('resize',setWorldRatio)
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