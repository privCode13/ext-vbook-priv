function execute(url) {
    var response = fetch(url);
        if (response.ok) {
        var doc = response.html();
        return Response.success({
            name: doc.select(".novel .n-text h1").text(),
            cover: doc.select(".novel img").attr("src"),     
            host: "https://ixdzs8.com",
            author: "AUTHOR", 
            detail: doc.select(".novel .n-text"),
            description: doc.select("p.pintro"),
            ongoing:  true
        });
    }
    return null;
}


