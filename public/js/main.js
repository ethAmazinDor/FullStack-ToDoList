
const itemCompleted = document.querySelectorAll('.item span.completed')
const item = document.querySelectorAll('.item span')

Array.from(item).forEach((element) => {
    element.addEventListener('click', markComplete)
})


Array.from(itemCompleted).forEach((element) => {
    element.addEventListener('click', markUncomplete)
})

async function markUncomplete() {
    const itemText = this.parentNode.childNodes[1].innerText

    try {
        const response = await fetch('markUncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'itemsFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}



async function markComplete() {
    const itemText = this.parentNode.childNodes[1].innerText

    try {
        const response = await fetch('markComplete', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)

    }

}