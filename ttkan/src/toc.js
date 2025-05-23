function execute(url) {
    let response = fetch(url);
    if (response.ok) { 
        let doc = response.html();
        let chaptersList = doc.select(".full_chapters div").get(0);
        let el = chaptersList.select("a");
        const data = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            let url = e.attr("href");
            data.push({
                name: e.text(),
                url: url,
                host: "https://www.wa01.com"
            });
        }
        return Response.success(data);
    }
    return null;
}