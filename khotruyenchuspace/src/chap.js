function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        // 1. Lấy tiêu đề chương
        let title = doc.select("h1.page-title").text().trim();

        // 2. Chọn vùng chứa nội dung truyện
        let contentElement = doc.select("div.entry-content");

        // 3. Loại bỏ các thành phần điều hướng và công cụ (Rác hệ thống)
        contentElement.select(".story-navigation").remove();
        contentElement.select(".reading-tools-bar").remove();
        contentElement.select("script").remove();
        contentElement.select("style").remove();

        // 4. Loại bỏ các đoạn văn bản ẩn chống copy (Rác nội dung)
        // Các thẻ này thường có style "clip-path: inset(100%)" hoặc "opacity: 0"
        contentElement.select("span[style*='clip-path']").remove();
        contentElement.select("b[style*='opacity:0']").remove();
        contentElement.select("b[style*='clip-path']").remove();
        
        // Loại bỏ các thẻ rác cụ thể theo class bạn đã gửi
        contentElement.select(".wnpkaj").remove();
        contentElement.select(".gqnud").remove();
        contentElement.select(".hdoklxfj").remove();

        // 5. Lấy nội dung HTML sau khi đã sạch sẽ
        let content = contentElement.html();

        // 6. Dọn dẹp thêm bằng Regex (Xóa các thực thể HTML thừa và khoảng trắng)
        content = content.replace(/&nbsp;/g, " ");
        content = content.replace(/<p>\s*<\/p>/g, ""); // Xóa các thẻ p trống

        return Response.success(content);
    }
    return null;
}