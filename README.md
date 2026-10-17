# loon-plugins
个人使用的 Loon 插件配置

## 网易云音乐

- [Loon 插件直链](https://raw.githubusercontent.com/Zgx7377/loon-plugins/main/wyy.loon.lpx?v=8614949)
- [查看插件文件](wyy.loon.lpx)

版本更新（2026-10-17）：规则、响应类型、脚本参数和顺序已与可用的原版转换结果对齐，用户已确认超清母带最高音质可正常播放。脚本仍使用原作者的远程地址。

在 Loon 中使用这份仓库版时，仅启用一份网易云同类插件；切换来源后，先完全退出网易云，再重新打开验证。

## 红果短剧

状态更新（2026-10-15）：本机已恢复原有 Loon 配置，实验兼容插件保持停用。两次完整退出后的冷启动均成功进入首页并播放短剧。尚未证明这份插件能解决之前的启动故障，暂不建议在本机重新启用。

- [腾讯应用宝兼容版](https://raw.githubusercontent.com/Zgx7377/loon-plugins/main/hongguo.mobile.loon.lpx)：用于 macOS 腾讯应用宝内的 Android 红果 `com.phoenix.read`，包含内容服务及 HTTPDNS 的直连规则，并豁免两个启动配置域名的 HTTPS 解密；无需证书或脚本。若用于进一步诊断，放在插件列表前部可覆盖其他插件对 `dig.bdurl.net` 的拒绝规则。
- [上游原版快照](upstream/hgdj.lpx)：收录自 [Tartarus2014/Loon-Script](https://github.com/Tartarus2014/Loon-Script/blob/master/Plugin/Block/hgdj.lpx)，保存于 2026-10-14。原版针对 iOS/iPadOS，包含 `zijieapi.com` 整域拒绝；不要与应用宝兼容版同时启用。

兼容版根据本机红果实际请求收窄图片规则，并补充 `fqnovel.com` 主接口及 `fqnovelpic.com`、`qznovelvod.com` 内容资源。部分服务与其他字节应用共享，域名规则也会影响使用相同域名的应用。HTTPDNS 放行是针对启动失败的可逆兼容调整，是否解决需要以应用实际加载为准。

兼容版排除 `tnc0-alisc1.zijieapi.com`、`tnc0-aliec2.zijieapi.com` 的 MitM，避免“汽水音乐去广告”插件中的 `tnc*-*.zijieapi.com` 通配符影响 Android 请求。此前已验证独立插件能使这两个域名直连、不解密、不复写，但当时仍卡启动页；插件作用与应用最终恢复之间没有确证的因果关系。
