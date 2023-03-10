const container = document.querySelector('.pixelGrid')
const rowsEl = document.querySelector('.rows')
const columnsEl = document.querySelector('.cols')
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')
const canvas = document.querySelector('canvas')
const canvasWidth = canvas.offsetWidth
const canvasHeight = canvas.offsetHeight
let rows = (Math.floor(canvasHeight / 20) * 20) / 20
let columns = (Math.floor(canvasWidth / 20) * 20) / 20

let draw = false

function populate(rows, columns) {
    container.style.setProperty('--rows', rows)
    container.style.setProperty('--cols', columns)
    container.style.width = Math.floor(canvasWidth / 20) * 20 + 'px'
    container.style.height = Math.floor(canvasHeight / 20) * 20 + 'px'
    canvas.style.width = Math.floor(canvasWidth / 20) * 20 + 'px'
    canvas.style.height = Math.floor(canvasHeight / 20) * 20 + 'px'
  for (let i = 0; i < rows * columns; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')

    div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value
    })

    container.appendChild(div)
  }
}

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    container.innerHTML = ''
    populate(rows, columns)
}

resetBtn.addEventListener('click', reset)

rowsEl.addEventListener('keyup', function(){
    rows = rowsEl.value
    columns = columnsEl.value
    reset()
})

columnsEl.addEventListener('keyup', function () {
    rows = rowsEl.value
    columns = columnsEl.value
    reset()
})

populate(rows, columns)