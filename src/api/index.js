import fetch from './fetch'

async function getIndices() {
    let indices = await fetch(`_all`)
    return indices.map(index => index.name)
}

export {
    getIndices
}