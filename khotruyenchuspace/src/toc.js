function execute(url) {
    // Đảm bảo URL kết thúc bằng dấu / để ghép /page/n/ không bị lỗi
    if (url.slice(-1) !== '/') url += '/';

    var allChapters = [];
    var response = fetch(url);

    if (response.ok) {
        var doc = response.html();

        // 1. Tìm số trang lớn nhất (maxPages) từ các nút phân trang
        var lastPage = 1;
        var pageNumbers = doc.select(".page-numbers");
        pageNumbers.forEach(function(e) {
            var p = parseInt(e.text());
            if (!isNaN(p) && p > lastPage) {
                lastPage = p;
            }
        });

        // 2. Hàm con để bóc tách chương từ một trang HTML
        function parseChapters(htmlDoc) {
            var list = [];
            // Dựa vào HTML bạn gửi: thẻ h2 class entry-title chứa link chương
            var items = htmlDoc.select(".entry-card h2.entry-title a");
            for (var i = 0; i < items.size(); i++) {
                var item = items.get(i);
                list.push({
                    name: item.text().trim(),
                    url: item.attr("href"),
                    host: "https://khotruyenchu.space"
                });
            }
            return list;
        }

        // 3. Lấy chương của trang 1 trước
        allChapters = allChapters.concat(parseChapters(doc));

        // 4. Nếu có nhiều trang, duyệt qua các trang còn lại
        for (var p = 2; p <= lastPage; p++) {
            var nextRes = fetch(url + "page/" + p + "/");
            if (nextRes.ok) {
                var nextDoc = nextRes.html();
                allChapters = allChapters.concat(parseChapters(nextDoc));
            }
        }

        return Response.success(allChapters);
    }

    return null;
}