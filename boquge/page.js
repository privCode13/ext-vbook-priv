function execute(url) {
    let trimmedUrl = url.replace(/\.html$/, "");
    let fetchUrl = `${trimmedUrl}-1.html`;
    let response = fetch(fetchUrl);
    if (response.ok) {
        let doc = response.html();
        let lastPage = 1;
        // Lấy số trang cuối
        lastPageElement = doc.select("#pager a").get(1);
        let href = lastPageElement.attr("href");
        let match = href.match(/-(\d+)\.html/);
        lastPage = match ? parseInt(match[1]) : 1;
        let pages = [];

        // Tạo danh sách URL theo số trang
        for (let i = 1; i <= lastPage; i++) {
            pages.push(`${trimmedUrl}-${i}.html`);
        }

        return Response.success(pages);
    }

    return null;
}
