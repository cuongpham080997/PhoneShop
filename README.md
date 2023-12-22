# Tao file quan ly du an

`npm init` <br>
Enter <br>

# package.json

File quan ly du an cua chung ta <br>

- Ten du an
- Thu vien duoc su dung trong du an

# De cai thu vien cho du an

`npm install <ten_thu_vien>` <br>
`npm i <ten_thu_vien>`

# De xoa

`npm uninstall <ten_thu_vien>`

# Sau khi cai dat xong thu vien

- Liet ke thu vien duoc cai dat trong file package.json. <br>
- Tao ra folder node_modules: chua cac thu vien duoc cai dat trong du an.
- Tao ra file package-lock.json.

# So sanh package.json vs package-lock.json

- package.json: liet ke khoang version duoc phep cai dat trong du an.
- package-lock.json: liet ke chinh xac version ma chung ta cai dat trong du an.

# .gitignore

Loai bo nhung folder hay file khong muon commit len git <br>

- Loai bo node_modules: vi qua nang. <br>

# Bien dich file scss -> css

-          [INPUT]                [OUTPUT]
- npx sass src/scss/index.scss dist/index.css

# Thu muc public

- Chua file (static): images, fonts, audios, icons

# 2 dev a - b

npm i: cai tat ca thu vien trong du an
1.10.0 < version < 1.10.10
dev a: cai sass version 1.10.2
dev b: cai sass version 1.10.3

# File scss: bat dau bang dau "\_"

- file do se khong duoc bien dich tat ca, tru nhung cai nao duoc tai su dung o noi khac
- Thuong dung de khai bao bien, mixin.
