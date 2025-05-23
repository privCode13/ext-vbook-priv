function execute(url) {
    var response = fetch(url);
        if (response.ok) {
        var doc = response.html();
        let statusText = doc.select("dl.info dd p").get(2).text();
        return Response.success({
            name: doc.select("dl.info dt span").text(),
            cover: doc.select(".novel-cover .img img").attr("src"),     
            host: "https://m.boquge.com",
            author: doc.select("dl.info dd p").get(0).text(), 
            detail: doc.select("dl.info dd").html(),
            description: doc.select("div.novel-desc #shot").html(),
            ongoing:  statusText.includes("连载中")
        });
    }
    return null;
}