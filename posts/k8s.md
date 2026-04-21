---
title: 自宅K8sクラスターを再構築した話
date: "2026-04-21"
---

自宅の **MicroK8s** クラスターを再構築し、IPv6 Single Stack での運用に挑戦しました。

#### 今回のポイント
1. **IPv6 GUAの割り当て**: 外部から直接Podに到達できる環境を構築
2. **MetalLBの導入**: レイヤー2モードでのLoadBalancer運用
3. **GitOps化**: ArgoCDを使用してマニフェスト管理を完全に自動化

#### 設定ファイルの一分 (Helm values)
```yaml
networking:
  ipFamilies: [IPv6]
  ipFamilyPolicy: SingleStack