# npm install troubleshooting

Nếu gặp lỗi request tới domain `packages.applied-caas-gateway1.internal.api.openai.org`, nguyên nhân là lockfile cũ được tạo trong môi trường build nội bộ.

Bản source này đã bỏ `package-lock.json`, pin version trong `package.json`, và thêm `.npmrc` dùng npm registry public.

Chạy lại:

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Nếu vẫn bị lỗi timeout, kiểm tra proxy/VPN/mạng công ty:

```bash
npm config get registry
npm config get proxy
npm config get https-proxy
```

Registry đúng nên là:

```txt
https://registry.npmjs.org/
```
