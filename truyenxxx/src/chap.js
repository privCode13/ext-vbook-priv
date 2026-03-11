function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let txt = doc.select(".single-content").html();
        return Response.success(txt);
    }
    return null;
}