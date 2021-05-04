export function formatSearchResult(searchResults){
    let options = [];
    for (let i in searchResults){
        options[i] = {
            value: searchResults[i],
            label: searchResults[i],
        }
    }
    return options;
}