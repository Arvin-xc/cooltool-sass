const crypto = require("crypto");
const CryptoJS = require("crypto-js");

const symmetricKey =
  "ab7502a91c0da76b7b0e3594b437ee1c2afde5444478490712781b60426d950d";
const encryptedSymmetricKey = `hIfvRtQdcFstspxcSgvWjVp5tJCOZZiE3Nhs6nITZ/m66Hw6KUKq5UpwyHpEgDp1+4gjskNaLDNBDuBuoee3aZErjYzX1CNa39AcDMuXXSaMUS/xjxbb9M4kVPUjYonQuB2Jr3DY6WB1BW+X6+aHKSGEB6IiGtwXlN9pZ7Sqk6+zq9Dh+wpIf579n2u0z0u9oqzGJG35odZQk3yDmyZyPkFyEIS+b9qJXI7Qpxbm5GO1k81giAxhPapzYvI6hcMlXWVY1skTKslBVTgU4r9azIyJcB48ueTt+oXYwIm84BlKBzxtymP4/SMQiLCmWBxUNN0ZcVUC7QLqONxied7W7w==`;
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCl+3eJ+VfJHvtT
kRahFZlIMIDcVhpVxZV1W4ah654kZQln6HNlJMcYWSl7ovYGq9/gUNjYJT6VmNsC
iVpGzvBWc2Yn+OnpRemvgJBAuhXqQ7pcdTYmuLmRi+ocIAYiQ5Xd7ttF4EGd/xw/
Cyk0ra1uMl7X7OkjWoAIDfAWuD/gGs3zDfDyaCDiAzZE8Re7mEdlg3ue4qyUOF6n
jo+WRv3+mtkM9TDXpaHCsujC6haQaI4I6MMyQmXdnT1MB0BYaP7agFZ8d5wRRowP
ZVtMm7LihA7JzTByPPSfVUVvBhxWBafcKg0MGAfKFpKsS0ncaNDDMA1icojY5Tgv
as87/yeZAgMBAAECggEAAqCdLnb1zufxoEcbn28LygW7iCzI0Yree4/c9hg8/LQ/
hX5AE4SZt0f4d2b3o7QlQy0yu4ni9jYn/Fs9W0rWDbZHQDcyWo8Vc4Zyn9WsiquO
d+IHLMDGksqBUkmd18/CCO+FDoXpTbWDSvhBa2MJNPexMFQlUGfKkW8253xOxYo8
jk+JvWlyi3IDI1R1hBsX0m2MzquzpXHX18/ud8x3NTZaIBO2FNVXAxZfQjZrHKan
XKsLimi9ixs2DnU+Xc6HTzvLi5nEuLemyvT2Aj/FnxA/lpr0SMfHxLXzYGgkVTaE
P4A0dORDMLf5J4uaWD9tCcMdPyASgRP5Y2rvRX0Q0QKBgQDPo7B/eHSyW2edqWhh
/YFzJBEnPswAQqqqbX5g7WFkFrxiSa0ohGXmUVuyR+DyI4tO5OzcKNEEMAnBFBQ3
WbUVlCeV1wjV1Iz8Xy/jn5M/hQoRBcVZCOjATl+cDB6wYYuiqVKuqaTTVlaWkA5l
S0dBHdtX1w6eycmU9yc0uUNa0QKBgQDMpAKASBadoLGihqq+ovmb+6AJyb4nqYHJ
w1gRbnFB1gi1zZxupwmRyIXDIFyrDRDabrzwM10hwADXu3OEVNQqRM82NoMlUSU4
YEkuojCNNe3GuDuICQHcIBAlSlQPPt/vt3bhLcJpFaR1F7gkG1+dTcmayTOzameB
TFcNM7KiSQKBgQCHRQVr1cZ4l3GmVcIJ7IQTxdBi99cg6E2U3+YwMRV8hg9OHN9x
AOf9ps0NFSSnup471Im2V+TrTHxeS71r3cZJ+43aYQ+Bdoous7hYGxJrlDldo5vQ
iCxRc/13hLHNiI7WdmbGIQCfKaUZS1oFhYgzFMdbr1/39E+d+3GQOI13sQKBgQC6
l62EJLciYTy3Ug1sKBRrKwOhCSfu6Dtkqk6qDkcM3ckxZFqH9pzeJbX51o9IlHBS
i3iRmHQJ6xWZn91Twzl1lSpPZ2MrapMClaEE+XRFve+iK6h0gKoGeeHe7qg5An6U
CHhIGD5VLRu4fLk1ixQizaPPFDilFpdsKRyS+BmgqQKBgQCHF1G4xgrrdO5qciXA
zYwWGN+luLF6tSAeuuacDLD/KgvQ6Ki/xozbQ4GDAqhFkN7MvfKigoXkU4c0uH1a
JYdWgqOSG8EQj8rbFashaIxQevpoX1RSk093E6Z77ee/0fcXD71G2dav4IAr1VDh
tytFNhcYWrJjg8h3GLrvo05NHQ==
-----END PRIVATE KEY-----`;
const publicKye = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApft3iflXyR77U5EWoRWZ
SDCA3FYaVcWVdVuGoeueJGUJZ+hzZSTHGFkpe6L2Bqvf4FDY2CU+lZjbAolaRs7w
VnNmJ/jp6UXpr4CQQLoV6kO6XHU2Jri5kYvqHCAGIkOV3e7bReBBnf8cPwspNK2t
bjJe1+zpI1qACA3wFrg/4BrN8w3w8mgg4gM2RPEXu5hHZYN7nuKslDhep46Plkb9
/prZDPUw16WhwrLowuoWkGiOCOjDMkJl3Z09TAdAWGj+2oBWfHecEUaMD2VbTJuy
4oQOyc0wcjz0n1VFbwYcVgWn3CoNDBgHyhaSrEtJ3GjQwzANYnKI2OU4L2rPO/8n
mQIDAQAB
-----END PUBLIC KEY-----`;
// 使用公钥加密对称密钥

// 使用对称密钥加密消息
const message = "12312-";
const encryptedMessage = CryptoJS.AES.encrypt(
  message,
  CryptoJS.enc.Hex.parse(symmetricKey),
  {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }
).toString();

console.log("加密后的消息:", encryptedMessage);

// 使用私钥解密对称密钥
const decryptedSymmetricKey = crypto
  .privateDecrypt(privateKey, Buffer.from(encryptedSymmetricKey, "base64"))
  .toString();
console.log("解密后的对称密钥:", decryptedSymmetricKey);

// 使用解密后的对称密钥解密消息
const decryptedMessage = CryptoJS.AES.decrypt(
  'LvA1l/WZJDbkGB7ZYE8vZSymqLm62wpRcnYx+4QtHUMtpXyhVHhB1dRBOdY3F4qN9V1h4pDJERTA1yye9T3FhnIad4hVFqlrVTxa1nZD4OEFPXwLkq9oBqdDrpzTsXBV',
  CryptoJS.enc.Hex.parse(decryptedSymmetricKey),
  {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }
).toString(CryptoJS.enc.Utf8);

console.log("解密后的消息:", decryptedMessage);
