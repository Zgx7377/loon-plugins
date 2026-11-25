/*
 * 黄果短剧：Loon 视频链接捕获适配。
 * Original author: 彭于晏
 * Source: https://raw.githubusercontent.com/89996462/Quantumult-X/main/ghs/hgdj.js
 * Source SHA-256: 1e7c5ea5fe7d48c3f0894706ac9077de21e451df51c37e9f262a15ccc063356b
 * Adapted: 2026-11-25
 *
 * 保留原版的请求匹配和链接转换；仅捕获来源请求返回空响应。
 * 使用 Safari 专用链接发送一次 Loon 通知；不回显原请求头。
 * 对有效 HLS 清单修正 MIME 并移除下载附件头，保留清单正文。
 * 不读取请求体，不保存凭据，也不主动请求视频链接。
 */

(function () {
  var result = {};

  if (typeof $response === "object" && $response) {
    try {
      var responseUrl = typeof $request === "object" && $request ? $request.url : "";
      var playlistPattern = /^https?:\/\/[^\/:?#]+\.(?:cloudfront\.net|lkkwip\.cn)(?::\d+)?\/(?:api\/app\/vid\/h5\/m3u8\/[^?#]*|[^?#]*\.m3u8)(?:\?[^#]*)?$/i;
      var status = Number($response.status);
      var body = $response.body;

      if (playlistPattern.test(responseUrl) && (status === 200 || status === 206) &&
          typeof body === "string" && /^#EXTM3U(?:\r?\n|$)/.test(body)) {
        var responseHeaders = {};
        Object.keys($response.headers || {}).forEach(function (name) {
          var lower = name.toLowerCase();
          if (lower !== "content-type" && lower !== "content-disposition") {
            responseHeaders[name] = $response.headers[name];
          }
        });
        responseHeaders["Content-Type"] = "application/vnd.apple.mpegurl";
        result = { headers: responseHeaders };
      }
    } catch (error) {
      console.log("黄果短剧：清单格式处理失败，已保留原响应。");
    }

    $done(result);
    return;
  }

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

        // Safari 专用协议使用 HTTPS；仅替换开头，保留路径和签名参数。
        var safariUrl = openUrl.replace(/^https?:\/\//i, "x-safari-https://");

        $notification.post(
          "黄果短剧 · 视频链接捕获",
          "点击通知用 Safari 打开",
          "",
          { openUrl: safariUrl }
        );

        // 只终止来源请求；Safari 不带捕获头的播放请求必须正常放行。
        result = { response: { status: 200, headers: {}, body: "" } };
      }
    }
  } catch (error) {
    // 异常时放行，不记录可能带有签名或凭据的 URL 和请求头。
    console.log("黄果短剧：链接捕获失败，已放行原请求。");
  }

  $done(result);
})();
