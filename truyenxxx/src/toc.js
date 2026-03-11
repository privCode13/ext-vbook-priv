function execute(url) {
    let response = fetch(url);
    if (response.ok) { 
        let doc = response.html();
        let chaptersList = doc.select(".chapter-links").get(0);
        console.log("CHAPTER");
        // console.log(chaptersList);
        let el = chaptersList.select("a");
        const data = [];
        data.push({
                name: "Phần 1",
                url: url
            });
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            let chapter_url = e.attr("href");
            data.push({
                name: e.text(),
                url: chapter_url
            });
        }
        return Response.success(data);
    }
    return null;
}