# API jobhunt-multiple-cv-upload

## USER

### USER REGISTRATION
Method: "POST",
baseURL : "/auth/register/",
"data": {
    "username": "test123",
    "email": "test123@gmail.com",
    "password": "Test123",
}
Deskripsi :
API ini digunakan oleh pengguna untuk mendaftar akun baru dengan aturan sebagai berikut:
- Kolom email harus berisi alamat email yang valid.
- Pengguna tidak dapat mendaftar dengan email yang sudah terdaftar.
- Kata sandi harus berisi setidaknya 6 karakter, satu huruf besar, satu huruf kecil, dan satu angka.

### USER LOGIN
Method: "POST",
baseURL : "/auth/login/",
"data": {
    "email": "test123@gmail.com",
    "password": "Test123",
}
Deskripsi :
API ini digunakan oleh pengguna untuk masuk ke aplikasi jobhunt.

### USER LOGOUT
Method: "POST",
baseURL : "/auth/logout/",
 - Authorization -
Description :
API ini digunakan oleh pengguna untuk keluar dari aplikasi jobhunt.

## Region Indonesia

### GET data provinsi
Method: "GET",
baseURL : "/api/RegionIndonesia/provinsi",
Deskripsi :
API ini digunakan oleh pengguna untuk memudahkan mendapatkan provinsi di indonesia

### GET data Kota
Method: "GET",
baseURL : "/api/RegionIndonesia/kota/?kdProvinsi=????",
Deskripsi :
API ini digunakan oleh pengguna untuk memudahkan mendapatkan kota di indonesia.


## Bidang

### User Adds New Field
Method: "POST",
baseURL : "/api/Masyarakats/bidang/",
"data": {
    "namaBidang": "test123",
}

### User Get Field data
Method: "GET",
baseURL : "/api/Masyarakats/bidang/"

### User Update Field data
Method: "GET",
baseURL : "/api/Masyarakats/bidang/xxxxxxxxxxxxxxxxxxxxxxxx"

### User Delete Field data
Method: "GET",
baseURL : "/api/Masyarakats/bidang/xxxxxxxxxxxxxxxxxxxxxxxx"


## Data Pegawai

### User Adds New Employee data
Method: "POST",
baseURL : "/api/Masyarakats/pegawai/",
"data": {
    "NamaLengkap": "test123",
    "TanggalLahir": "2002-07-24",
    "AlamatLengkap": "Pekanbaru Riau",
    "Keahlian": "Teamwork;Problem;Solving;",
    "LevelPekerjaan": "Middle Level",
    "Kd_Provinsi": "14", => dari API provinsi
    "Kd_KotaKabupaten": "1471", dari API Kota
    "Kodepos": "12345",
}
Deskripsi :
API ini membuat data pegawai baru dengan aturan berikut:
- Kolom "NamaLengkap", "TanggalLahir", "AlamatLengkap, "Kd_Provinsi" dari api provinsi, Kd_KotaKabupaten dari api kota dan "Kodepos"
- NamaLengkap pegawai harus unik dan tidak dapat diduplikasi.

### User Get Employee data
Method: "GET",
baseURL : "/api/Masyarakats/pegawai/?skip=0&limit=20&NamaLengkap=test123",
Filter : {
    skip, limit, = required 
    NamaLengkap = opsional
}
Deskripsi :
API ini digunakan oleh pengguna untuk melihat semua data pegawai dan bisa di filter berdasarkan namaLengkat Pegawai.

### User Update Employee data
Method: "PUT",
baseURL : "/api/Masyarakats/pegawai/xxxxxxxxxxxxxxxxxxxxxxxx",
Deskripsi :
API ini digunakan oleh pengguna untuk mengubah data pegawai dengan id pegawai sebagai param
- NamaLengkap pegawai harus unik dan tidak dapat diduplikasi.

### User Delete Employee data
Method: "POST",
baseURL : "/api/Masyarakats/pegawai/xxxxxxxxxxxxxxxxxxxxxxxx",
Deskripsi :
API ini digunakan oleh pengguna untuk menghapus data pegawai
- API ini menggunakan safe delete untuk meminimalisir penghapusan tiket yang tidak sengaja (data dapat dikembalikan).


## Data Sertifikasi Pegawai

### ### User Adds Employee Certificate data
Method: "POST",
baseURL : "/api/Masyarakats/sertifikasi/xxxxxxxxxxxxxxxxxxxxxxxx => id pegawai",
"data": {
    "NamaLembaga": "test123",
    "Id_Bidang": "xxxxxxxxxxxxxxxxxxxxxxxx",
    "DokumentasiSertifikat": file,
}
Deskripsi :
API ini membuat data sertifikat dari pegawai dengan aturan berikut:
- Kolom "NamaLembaga", "Id_Bidang" data id bidang, "Id_Pegawai" => data id pegawai,
- Yang diperbolehkan dengan ukuran file maksimum 5MB.

### User Adds Employee Certificate data
Method: "DELETE",
baseURL : "/api/Masyarakats/sertifikasi/xxxxxxxxxxxxxxxxxxxxxxxx => id sertifikat",
Deskripsi :
API ini digunakan untuk menghapus data sertifikat pegawai

### User GET Employee Certificate data
Method: "GET",
baseURL : "/api/Masyarakats/sertifikasi/",
Deskripsi :
API ini digunakan untuk melihat semua data sertifikat.