# LinkHub - JSON Dosya Tabanlı Depolama Sistemi

## Özellikler

✅ **Tamamen Dosya Tabanlı**: Tüm veriler JSON dosyalarında saklanır
✅ **Medya Yönetimi**: Resim, GIF ve müzik dosyaları proje dizininde fiziksel olarak tutulur
✅ **Chrome Storage Yok**: Hiçbir veri tarayıcıda saklanmaz
✅ **Kolay Yedekleme**: Tüm veriler `public/data/` ve `public/media/` klasörlerinde
✅ **Tek Komut**: Backend Vite ile birlikte otomatik çalışır

## Dizin Yapısı

```
linkhub/
├── public/
│   ├── data/                    # JSON veritabanı dosyaları
│   │   ├── users.json          # Kullanıcı bilgileri
│   │   ├── current_user.json   # Aktif oturum
│   │   ├── profiles.json       # Profil ayarları
│   │   └── links.json          # Kullanıcı linkleri
│   └── media/                   # Medya dosyaları
│       ├── avatars/            # Profil resimleri
│       ├── backgrounds/        # Arka plan resimleri ve GIF'ler
│       └── music/              # Arka plan müzikleri
├── vite-plugin-backend.js       # Backend API plugin
└── src/
    └── utils/
        ├── jsonStorage.ts      # JSON dosya yönetimi
        └── storage.ts          # Ana storage API
```

## Kurulum ve Çalıştırma

### Tek Komut ile Başlat

```bash
npm run dev
```

Bu komut hem frontend'i hem de backend API'yi başlatır.

- Frontend: `http://localhost:5000`
- Backend API: `/api/*` (Vite proxy üzerinden)

## API Endpoints

### POST /api/save-data
JSON dosyasına veri kaydet

```json
{
  "filePath": "/data/users.json",
  "data": [...]
}
```

### POST /api/save-media
Medya dosyası kaydet (base64)

```json
{
  "base64Data": "data:image/png;base64,...",
  "directory": "/media/avatars",
  "filename": "user_123_avatar.png"
}
```

### POST /api/delete-media
Medya dosyası sil

```json
{
  "filePath": "/media/avatars/user_123_avatar.png"
}
```

## Veri Akışı

1. **Kayıt/Giriş**: Kullanıcı bilgileri `users.json` ve `current_user.json` dosyalarına kaydedilir
2. **Profil Güncelleme**: 
   - Metin verileri `profiles.json` dosyasına kaydedilir
   - Medya dosyaları (avatar, arka plan, müzik) `public/media/` klasörüne fiziksel olarak kaydedilir
   - JSON'da sadece dosya yolu tutulur (örn: `/media/avatars/user_123_avatar.png`)
3. **Link Yönetimi**: Tüm linkler `links.json` dosyasında saklanır

## Yedekleme

Tüm verilerinizi yedeklemek için:

```bash
# Sadece bu iki klasörü yedekleyin
cp -r public/data backup/
cp -r public/media backup/
```

## Demo Kullanıcı

Demo veri oluşturmak için tarayıcı konsolunda:

```javascript
import { createDemoData } from '@/utils/storage';
await createDemoData();
```

Giriş bilgileri:
- Kullanıcı adı: `demo`
- Şifre: `demo123`

## Teknik Detaylar

### Backend Entegrasyonu

Backend API, Vite plugin olarak çalışır (`vite-plugin-backend.js`). Bu sayede:
- Ayrı bir server başlatmaya gerek yok
- Tek `npm run dev` komutu yeterli
- Hot reload çalışır
- Production build'de backend kodu dahil edilmez

### Dosya Yapısı

- **JSON Dosyaları**: `public/data/` klasöründe, her veri tipi için ayrı dosya
- **Medya Dosyaları**: `public/media/` klasöründe, kategorilere göre alt klasörler
- **Dosya Adlandırma**: `{userId}_{type}_{timestamp}.{ext}` formatında

## Güvenlik Notları

⚠️ Bu sistem geliştirme amaçlıdır. Production için:
- Şifreleri bcrypt ile hashleyin
- JWT token sistemi ekleyin
- API endpoint'lerini güvenli hale getirin
- Dosya yükleme limitlerini ayarlayın
- CORS ayarlarını yapılandırın

