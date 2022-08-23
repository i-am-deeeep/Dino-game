import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED=0.05
const CACTUS_INT_MIN=500
const CACTUS_INT_MAX=2000
const worldElem=document.querySelector("[data-world]")

let nextCactusTime
//let cactus

export function setupCactus(){
    nextCactusTime=CACTUS_INT_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
      })
}
export function updateCactus(delta,speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        incrementCustomProperty(cactus,"--left",delta*speedScale*SPEED*-1)
        if(getCustomProperty(cactus,"--left")<=-50){
            cactus.remove()
        }
    })
    if(nextCactusTime<=0){
        createCactus()
        nextCactusTime=randomNumberBetween(CACTUS_INT_MAX,CACTUS_INT_MIN)/speedScale
    }
    nextCactusTime-=delta
}

export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
        return cactus.getBoundingClientRect()
    })
}

function randomNumberBetween(max,min){
    return Math.floor(Math.random()*(max-min+1)+min)
}
function createCactus(){
    const cactus=document.createElement("img")
    cactus.dataset.cactus=true
    cactus.src="imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldElem.append(cactus)
}
