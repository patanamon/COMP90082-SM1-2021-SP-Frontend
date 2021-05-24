export function unixToDate(unixTimeStamp){
    let date = new Date(unixTimeStamp*1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[date.getMonth()];
    let day = date.getDate();
    let d = day + '/' + month;
    return d;
}