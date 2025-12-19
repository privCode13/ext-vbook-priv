function execute(url) {
    // 1. Khởi tạo Trình duyệt Ảo
    var browser = Engine.newBrowser();
    
    // 2. Mở URL và Kích hoạt Danh sách Chương (Trang 1)
    browser.launch(url, 10000);
    browser.callJs("document.getElementById('sky-detail-chap-event').click();", 5000);
    
    // Lấy Document object hiện tại (đang ở Trang 1)
    var doc = browser.html();
    // console.log(doc)
    // 3. Xác định Số Trang Tối Đa
    // Lấy phần tử phân trang (phần tử cuối cùng trong #pagingControls)
    // Ví dụ: <li><a aria-label="Older" href="javascript:void(0)" onclick="pager.showPage(9, 'user'); return false;"><span aria-hidden="true">»</span></a></li>
    var lastPageElement = doc.select("#pagingControls li:last-child a");
    var totalPages = 1;

    if (lastPageElement.size() > 0) {
        // Trích xuất số trang từ thuộc tính onclick (ví dụ: 'pager.showPage(9, ...)')
        var onClickAttr = lastPageElement.attr("onclick");
        var match = onClickAttr.match(/pager\.showPage\((\d+)/);
        if (match && match[1]) {
            totalPages = parseInt(match[1]);
        }
    }

    // 4. Thu thập Dữ liệu Chương (Bắt đầu với Trang 1)
    var chapters = [];
    
    // Hàm nội bộ để trích xuất chương từ Document
    function extractChapters(document, hostUrl) {
        var pageChapters = [];
        var elements = document.select("#sky-detail-chap a[href*='/reading/']");
        
        elements.forEach(element => {
            var chapterUrl = element.attr("abs:href"); 
            var chapterName = element.text().replace(/\(.*\)/, '').trim(); 
            
            pageChapters.push({
                name: chapterName,
                url: chapterUrl,
                host: hostUrl
            });
        });
        return pageChapters;
    }

    // A. Thu thập Trang 1
    chapters = chapters.concat(extractChapters(doc, url));
    
    // B. Thu thập các Trang còn lại (từ Trang 2 đến totalPages)
    if (totalPages > 1) {
        Console.log("Tổng số trang cần tải: " + totalPages);
        
        for (let i = 2; i <= totalPages; i++) {
            Console.log("Đang tải Trang: " + i);
            
            // Gọi Javascript để chuyển sang trang i
            // Chờ 1 giây để nội dung mới được tải và hiển thị
            browser.callJs("pager.showPage(" + i + ");", 1000);
            
            // Lấy Document object mới sau khi chuyển trang
            var pageDoc = browser.html();
            
            // Thu thập chương và thêm vào danh sách chung
            chapters = chapters.concat(extractChapters(pageDoc, url));
        }
    }
    
    browser.close();
    
    // 5. Trả về Kết quả (Đảo ngược thứ tự để chương cũ nhất lên đầu)
    return Response.success(chapters.reverse());
}