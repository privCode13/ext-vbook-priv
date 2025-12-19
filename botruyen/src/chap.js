function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        
        // 1. Trích xuất Tiêu đề
        // Lấy nội dung text của thẻ h1.title
        // let title = doc.select(".header .title").text().trim();
        
        // 2. Trích xuất Nội dung
        // Lấy toàn bộ nội dung HTML bên trong thẻ div#js-sky-content (các thẻ <p>...)
        let contentHtml = doc.select("#js-sky-content").html();
        
        // 3. Xử lý và Định dạng Nội dung
        
        // Thêm tiêu đề vào đầu nội dung.
        // Sử dụng thẻ <h1> hoặc tiêu đề Markdown để định dạng tiêu đề.
        // let fullContent = "<h1>" + title + "</h1>\n" + contentHtml;
        
        // Tùy chọn: Dọn dẹp các script/widget không cần thiết nếu còn sót lại trong contentHtml.
        // Ví dụ: Loại bỏ các đoạn code widget/script như:
        contentHtml = contentHtml.replace(/[\s\S]*?/g, '');
        
        return Response.success(contentHtml);
    }
    
    // Trả về response lỗi nếu request thất bại
    return Response.error("Không thể tải trang truyện.");
}