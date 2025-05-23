function execute(url) {
    let id = url.match(/\/wapbook\/(\d+)\.html/)[1];
    console.log("ID: " + id);
    let response = fetch(`https://www.boquge.com/book/${id}/`);
    if (response.ok) { 
        let doc = response.html();
        let el = doc.select("#chapters-list li a")
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            let url = e.attr("href");
            let match = url.match(/\/book\/(\d+)\/(\d+)\.html/);
            let id = match ? match[1] : 0;
            let chap = match ? match[2] : 0;
            data.push({
                name: e.text(),
                url: `/wapbook/${id}_${chap}.html`,
                host: "https://m.boquge.com"
            });
        }
        return Response.success(data);
    }
    return null;
}
// let response = fetch(url);
//     if (response.ok) { 
//         let doc = response.html();
//         let el = doc.select(".book_textList li a");
//         const data = [];
//         for (let i = 0; i < el.size(); i++) {
//             let e = el.get(i);
//             data.push({
//                 name: e.text(),
//                 url: e.attr("href"),
//                 host: "https://m.boquge.com"
//             });
//         }
//         return Response.success(data);
//     }
//     return null;