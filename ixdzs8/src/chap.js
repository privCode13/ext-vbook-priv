function execute(url) {
    // 1. Khởi tạo Trình duyệt Ảo
    var browser = Engine.newBrowser();
    
    // 2. Chạy URL và đợi một khoảng thời gian (ít nhất 5-10s) 
    // để nó vượt qua trang "Đang xác thực" và load nội dung truyện
    browser.launch(url, 10000); 

    // 3. Lấy HTML sau khi trình duyệt đã thực thi JS và chuyển hướng
    var doc = browser.html();
    
    // Kiểm tra xem đã thoát khỏi trang xác thực chưa bằng cách check sự tồn tại của content
    var contentElement = doc.select("article.page-content section");
    
    if (contentElement.length > 0) {
        // Loại bỏ các thành phần rác (quảng cáo, tiêu đề lặp lại, script)
        contentElement.select("div.abg, script, ins, h3, div.chapter-act").remove();
        
        // Lấy mã HTML
        var htm = contentElement.html();

        // Format lại nội dung cho đẹp (nếu trang dùng thẻ <p>)
        htm = htm.replace(/<p>/g, "").replace(/<\/p>/g, "<br><br>");
        
        // Dọn dẹp các khoảng trắng thừa
        htm = htm.replace(/&nbsp;/g, " ").trim();

        return Response.success(htm);
    }
    
    // Nếu vẫn không thấy nội dung, có thể do delay chưa đủ hoặc bị chặn gắt hơn
    return Response.error("Không thể vượt qua lớp bảo vệ hoặc nội dung trống.");
}