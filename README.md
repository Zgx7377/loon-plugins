# loon-plugins
个人使用的 Loon 插件配置

## 红果短剧

- [腾讯应用宝兼容版](https://raw.githubusercontent.com/Zgx7377/loon-plugins/main/hongguo.mobile.loon.lpx)：用于 macOS 腾讯应用宝内的 Android 红果 `com.phoenix.read`，包含内容服务及 HTTPDNS 的直连规则，并豁免两个启动配置域名的 HTTPS 解密；无需证书或脚本。导入后放在插件列表最前面，以覆盖其他插件对 `dig.bdurl.net` 的拒绝规则。
- [上游原版快照](upstream/hgdj.lpx)：收录自 [Tartarus2014/Loon-Script](https://github.com/Tartarus2014/Loon-Script/blob/master/Plugin/Block/hgdj.lpx)，保存于 2026-10-14。原版针对 iOS/iPadOS，包含 `zijieapi.com` 整域拒绝；不要与应用宝兼容版同时启用。

兼容版根据本机红果实际请求收窄图片规则，并补充 `fqnovel.com` 主接口及 `fqnovelpic.com`、`qznovelvod.com` 内容资源。部分服务与其他字节应用共享，域名规则也会影响使用相同域名的应用。HTTPDNS 放行是针对启动失败的可逆兼容调整，是否解决需要以应用实际加载为准。

兼容版排除 `tnc0-alisc1.zijieapi.com`、`tnc0-aliec2.zijieapi.com` 的 MitM，避免“汽水音乐去广告”插件中的 `tnc*-*.zijieapi.com` 通配符影响 Android 请求。已验证独立插件能使这两个域名直连、不解密、不复写；目前应用仍停在启动页，完整启动及播放尚未验证成功。
