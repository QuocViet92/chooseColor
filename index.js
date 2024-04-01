let color = '#f6b73c'
let mode = ''
let arr = {
    modes: '',
    colors: []
}

function changeColor() {
    color = document.getElementById('select-color').value.slice(1)
    mode = document.getElementById('mode-color').value

    fetch(` https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
        .then((response) => response.json())
        .then((data) => {
            arr.modes = data.modes
            arr.colors = data.colors
            render()
        })
}

function render() {
    let htmlColors = arr.colors.map(item => {
        return  `<div class="color" style="background-color: ${item.hex.value}" data-hex=${item.hex.value}>
        <h4 class="copyColor" id=${item.hex.value}>Copy</h4>
        <div class='infoColor'><h4 data-hex=${item.hex.value}>${item.hex.value}</h4></div>
        
</div>`
    }).join('')
    document.getElementById('render').innerHTML = htmlColors
}

changeColor()

document.getElementById('btn').addEventListener('click', changeColor)

document.getElementById('mode-color').addEventListener('change', changeColor)

document.addEventListener('click', function (e) {
    if (e.target.dataset.hex) {
        navigator.clipboard
            .writeText(e.target.dataset.hex)
            .then(function () {
                document.getElementById(e.target.dataset.hex).style.display =
                    'block'
                setTimeout(() => {
                    document.getElementById(
                        e.target.dataset.hex
                    ).style.display = 'none'
                }, 500)
            })
            .catch(function (error) {
                console.error('Lỗi khi sao chép: ', error)
            })
    }
})
