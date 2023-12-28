# Test Karir Pro

Test Karir Pro menggunakan nest js dengan auth jwt serta orm database menggunakan prisma 

## Persyaratan

Node js  => versi v20.5.1 
Nest Js  => versi 10.0.0
Database => postgressql

## Panduan Instalasi

Langkah-langkah untuk menginstal proyek dan dependensinya.

```bash
yarn install

// setting .env 
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/test-karir-pro?schema=public"
PORT= "PORT Jika tidak di isi 3000"
JWT_SECRET= "SECRET KEY UNTUK JWT"

// jalankan comment ini jika ingin menggunakan migration
yarn add prisma migrate dev

// jika sudah di setting jalan kan
yarn start dev
```

## End Point Yang di buat

Dokumentasi Postman https://documenter.getpostman.com/view/6173923/2s9YkuYdZo 

Register
```bash
end point: /auth/register 
method: post
body type: row-json
body: {
    "name" : "fajar setiawan",
    "phone" : "082213100769",
    "email" : "test@gmail.com",
    "password" : "test1234567"
}
```

login
```bash
end point: /auth/login 
method: post
body type: row-json
body: {
    "email" : "test@gmail.com",
    "password" : "test1234567"
}
```

Get Profile
```bash
end point: /auth/profile 
method: get
header : {
    "Authorization" : "Bearer {{token}}",
}
```

Update Foto Profile
```bash
end point: /auth/image 
method: post
body type: form-data
body: image
header : {
    "Authorization" : "Bearer {{token}}",
    "Content-Type" : "multipart/form-data"
}
```

Update Users
```bash
end point: /auth/update 
method: post
body type: row-json
body: {
    "name" : "fajar setiawan",
    "phone" : "082213100769",
    "email" : "fajar@gmail.com"
}
header : {
    "Authorization" : "Bearer {{token}}",
}
```

Update Password Users
```bash
end point: /auth/update_password 
method: post
body type: row-json
body: {
    "password" : "test1234567!",
    "password_old" : "test1234567"
}
header : {
    "Authorization" : "Bearer {{token}}",
}
```