

const item = document.querySelectorAll('.item span')

Array.from(item).forEach((element) => {
    element.addEventListener('click', markComplete)
})




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