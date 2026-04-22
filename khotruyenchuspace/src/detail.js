function execute(url) {
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        
        // Lấy container chứa thông tin truyện để select chính xác hơn
        var info = doc.select(".truyen-info");
        
        return Response.success({
            name: info.select(".truyen-title").text(),
            cover: doc.select(".truyen-cover img").first().attr("src"),
            host: "https://khotruyenchu.space",
            // Lấy tên tác giả trong thẻ strong hoặc a bên trong meta
            author: info.select(".truyen-meta span:contains(Tác giả) strong").text(),
            // Lấy toàn bộ phần giới thiệu
            description: info.select(".truyen-desc").html(),
            // Phần detail hiển thị các thông tin phụ như thể loại, tình trạng
            detail: info.select(".truyen-meta").html(),
            // Kiểm tra trạng thái dựa trên text hiển thị
            ongoing: info.select(".truyen-meta").text().indexOf("Đang tiến hành") >= 0
        });
    }
    return null;
}