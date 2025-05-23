function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let contentDiv = doc.select(".content").html(); 

        let cleanText = Html.clean(contentDiv, ["div", "p"]);
        return Response.success(cleanText);
    }
    return null;
}