function execute(url) {
    // 1. Lấy ID truyện từ URL (ví dụ: https://ixdzs8.com/read/636769/ -> ID là 636769)
    var bookId = url.match(/read\/(\d+)/)[1];

    // 2. Gọi API lấy danh sách chương (Dựa vào code AJAX trong source web)
    // Trang này dùng phương thức POST tới /novel/clist/ với tham số bid
    var response = fetch("https://ixdzs8.com/novel/clist/", {
        method: "POST",
        body: "bid=" + bookId,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    if (response.ok) {
        var resJson = response.json();
        var data = resJson.data; // Mảng chứa các chương
        var chapters = [];

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            // Bỏ qua các mục không phải chương (ctype == 1 thường là tên volume/quyển)
            if (item.ctype != 1) {
                chapters.push({
                    name: item.title,
                    url: "read/" + bookId + "/p" + item.ordernum + ".html",
                    host: "https://ixdzs8.com"
                });
            }
        }
        return Response.success(chapters);
    }

    return null;
}