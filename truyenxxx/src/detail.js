function execute(url) {
    var response = fetch(url);
        if (response.ok) {
        var doc = response.html();
        return Response.success({
            name: doc.select(".single-header h1.single-title").text(),
            cover: "https://i.imgur.com/5BdXa90.png",     
            host: "https://truyenxxx.net",
            author: "AUTHOR", 
            detail: "DETAIL",
            description: "DESCRIPTION",
            ongoing:  true
        });
    }
    return null;
}



        // return Response.success({
        //     name: doc.select(".single-header h1.single-title").text(),
        //     cover: doc.select(".col-thumb .thumb img").attr("src"),     
        //     host: "https://botruyen.biz",
        //     author: doc.select(".info .item .item-value a").get(0).text(), 
        //     detail: doc.select("section.sky-section .brief").html(),
        //     description: doc.select("div.novel-desc #shot").html(),
        //     ongoing:  true
        // });