import fetch from './fetch'

async function getIndices() {
    let indices = await fetch(`_all`)
    return indices.map(index => index.name)
}

async function search(index, query, from, size) {
    let url = `_search`
    if (index) {
        if (index != "*") {
            url = `${index}/_search`
        }

    }
    let data = {
        query: {
            query: query,
            boost: 1,
        },
        from: from ? from : 0,
        size: size ? size : 100,
    }
    let res = await fetch(url, data, 'POST')
    return res
}

export {
    getIndices,
    search
}