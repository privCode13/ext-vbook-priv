function execute(url) {
    var response = fetch(url);
        if (response.ok) {
        var doc = response.html();
            console.log("DOC:")
            // console.log(doc)
        let statusText = true;
        return Response.success({
            name: doc.select(".novel_info ul li").get(0).text(),
            cover: doc.select(".novel_info img").first().attr("src"),     
            host: "https://www.ttkan.co",
            author: doc.select(".novel_info ul li").get(1).text(),
            detail: doc.select(".novel_info ul li").get(2).text(),
            description: doc.select(".novel_info ul li").get(2).text(),
            ongoing:  statusText
        });
    }
    return null;
}