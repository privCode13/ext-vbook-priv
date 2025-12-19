function execute(url) {
    var response = fetch(url);
        if (response.ok) {
        var doc = response.html();
        return Response.success({
            name: doc.select(".sky-detail-info-block .info .title a").text(),
            cover: doc.select(".col-thumb .thumb img").attr("src"),     
            host: "https://botruyen.biz",
            author: doc.select(".info .item .item-value a").get(0).text(), 
            detail: doc.select("section.sky-section .brief").html(),
            description: doc.select("div.novel-desc #shot").html(),
            ongoing:  true
        });
    }
    return null;
}