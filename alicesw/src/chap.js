function execute(url) {
    var browser = Engine.newBrowser(); 
    browser.setUserAgent(UserAgent.android()); // Tùy chỉnh user agent
    browser.launch(url, 5000);
    sleep(2000);
    var doc = browser.html();
    browser.close();
    var htm = doc.select(".content_txt").html();
    return Response.success(htm);
}