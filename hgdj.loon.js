/*
 * 黄果短剧：Loon 视频链接捕获适配。
 * Original author: 彭于晏
 * Source: https://raw.githubusercontent.com/89996462/Quantumult-X/main/ghs/hgdj.js
 * Source SHA-256: 1e7c5ea5fe7d48c3f0894706ac9077de21e451df51c37e9f262a15ccc063356b
 * Adapted: 2026-11-25
 *
 * 保留原版的请求匹配、链接转换和空响应行为。
 * 使用 Loon 的 openUrl 通知，只发送一次；不回显原请求头。
 * 不读取请求体，不保存凭据，也不主动请求视频链接。
 */

(function () {
  var result = {};

  try {
    var request = typeof $request === "object" && $request ? $request : {};
    var url = typeof request.url === "string" ? request.url : "";
    var pattern = /^https?:\/\/[^\/]+\.(cloudfront\.net|lkkwip\.cn)\/api\/app\/vid\/h5\/m3u8\/.*/i;

    if (pattern.test(url)) {
      var headers = request.headers || {};
      var captured = Object.keys(headers).some(function (name) {
        return name.toLowerCase() === "x-playback-session-id";
      });

      if (captured) {
        var openUrl = url;
        if (url.indexOf("lkkwip.cn") !== -1) {
          var path = url.match(/\/api\/app\/vid\/h5\/m3u8\/.*$/);
          if (path) {
            openUrl = "https://dqsibjrdsxx5r.cloudfront.net" + path[0];
          }
        }

        $notification.post(
          "黄果短剧 · 视频链接捕获",
          "点击通知打开链接",
          "",
          { openUrl: openUrl }
        );
      }

      // 原版在请求阶段直接返回空响应；在 Loon 中显式补全状态和正文。
      result = { response: { status: 200, headers: {}, body: "" } };
    }
  } catch (error) {
    // 异常时放行，不记录可能带有签名或凭据的 URL 和请求头。
    console.log("黄果短剧：链接捕获失败，已放行原请求。");
  }

  $done(result);
})();
