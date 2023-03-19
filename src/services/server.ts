function getCurrentNews(sites: Array<string>) {
    // TODO: call the server

    // mock implementation:
    let result: { [s: string]: Array<string> } = {}
    for (const site of sites) {
        result[site] = []
        for (let i = 0; i < 3; i++) {
            result[site].push(site + "/clanek/" + i)
        }
    }

}