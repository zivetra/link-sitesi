# 🔗 LinkHub — Sosyal Medya Link Toplama Platformu

> Tüm sosyal medya hesaplarınızı, web sitelerinizi ve önemli linklerinizi **tek bir özelleştirilebilir sayfada** toplayın.

LinkHub, "link-in-bio" konseptini temel alan, tamamen **AI destekli ürün tasarımı ve geliştirme** süreciyle üretilmiş bir web uygulamasıdır.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white">
</p>

---

## 🎓 Proje Bilgileri

| Alan | Bilgi |
| --- | --- |
| **Ders** | PP214 - Programlamada Yeni Eğilimler & BTE208 - Bilgisayar Teknolojilerinde Güncel Trendler |
| **Kurum** | Plato Meslek Yüksekokulu |
| **Dönem** | 2026 Bahar |
| **Konu** | AI-Driven Product Design & Development |

---

## 📚 İçindekiler

1. [Proje Özeti](#1-proje-özeti)
2. [Kullanılan AI Araçları](#2-kullanılan-ai-araçları)
3. [Prompt Kütüphanesi](#3-prompt-kütüphanesi)
4. [Kurulum ve Çalıştırma](#4-kurulum-ve-çalıştırma)
5. [Kullanım Kılavuzu](#5-kullanım-kılavuzu)
6. [Gelecek Vizyonu](#6-gelecek-vizyonu)
7. [Ek Bilgiler](#7-ek-bilgiler)

---

## 1. Proje Özeti

### 🎯 Uygulamanın Amacı
LinkHub'ın amacı, kullanıcıların dağınık olan tüm dijital varlıklarını (sosyal medya, web sitesi, portföy, müzik, iletişim) **tek bir minimal ve profesyonel sayfada** toplamasını sağlamaktır. Kullanıcı `linkhub.com/kullaniciadi` formatında kendine özel bir URL alır ve bu tek linki her yerde paylaşabilir.

### 👥 Hedef Kullanıcı Kitlesi
- **İçerik üreticileri & influencer'lar** — Instagram/TikTok bio'sundaki tek link sınırından kurtulmak isteyenler
- **Sanatçılar, müzisyenler ve tasarımcılar** — Tüm platformlarını tek yerde sergilemek isteyenler
- **Freelancer'lar & profesyoneller** — Portföy, iletişim ve sosyal hesaplarını derli toplu paylaşmak isteyenler
- **Küçük işletmeler** — Menü, rezervasyon, harita ve sosyal medya linklerini tek noktada toplamak isteyenler

### ❓ Çözülmek İstenen Problem
| Problem | LinkHub Çözümü |
| --- | --- |
| Instagram/TikTok bio'sunda yalnızca **1 link** paylaşılabilmesi | ✅ Sınırsız link ekleme |
| Linklerin farklı platformlara **dağılması** | ✅ Tek URL ile hepsine erişim |
| Linkleri **güncellemenin** zorluğu | ✅ Anında düzenleme & sürükle-bırak sıralama |
| **Profesyonel görünüm** eksikliği | ✅ Tema, arka plan, buton ve font özelleştirme |

### ✨ Öne Çıkan Özellikler

#### 🔐 Kullanıcı Yönetimi
- ✅ Kullanıcı kaydı ve girişi
- ✅ Oturum yönetimi
- ✅ Form validasyonu
- ✅ Özel kullanıcı URL'i (`linkhub.com/kullaniciadi`)

#### 🔗 Link Yönetimi
- ✅ Sınırsız link ekleme
- ✅ **13 farklı platform desteği** (Instagram, Twitter, GitHub, LinkedIn, YouTube, TikTok, Facebook, Twitch, Discord, Spotify, Website, Email, Özel Link)
- ✅ Platform seçimi (renkli görsel butonlar)
- ✅ Link düzenleme ve silme
- ✅ **Drag & Drop ile sıralama**
- ✅ Link aktif/pasif yapma
- ✅ Link tıklama sayacı altyapısı

#### 🎨 Profil Özelleştirme
- ✅ **Profil düzenleme sayfası**
- ✅ **Bio ekleme/güncelleme** (200 karakter limit)
- ✅ **Avatar yükleme** (max 2MB, JPG/PNG/GIF)
- ✅ **Tema seçimi** (Light / Dark)
- ✅ **Düzen seçimi** (Classic / Minimal / Card / Elite)
- ✅ **Arka plan özelleştirme:**
  - Düz renk (renk seçici)
  - Gradyan
  - Görsel yükleme (max 8MB)
  - GIF arka plan
  - **Three.js animasyonlu shader**
- ✅ **Buton stilleri** (Fill / Outline / Shadow / Gradient / Glass / Neon)
- ✅ **Buton & metin renk seçici**
- ✅ **Köşe yuvarlaklığı** (Yok / Küçük / Orta / Tam)
- ✅ **Yazı tipi seçimi** (Sans / Serif / Mono)
- ✅ **QR kod** ile profil paylaşımı
- ✅ Responsive (mobil + masaüstü) tasarım

---

## 2. Kullanılan AI Araçları

Bu proje uçtan uca AI araçlarıyla; konsept, tasarım, kod ve içerik aşamalarında yapay zekâ kullanılarak geliştirilmiştir.

| Aşama | Kullanılan AI Araçları | Kullanım Amacı |
| --- | --- | --- |
| **Konsept & Planlama** | ChatGPT (GPT-4), Claude | Problem tanımı, hedef kitle analizi, user journey ve özellik listesi çıkarımı |
| **UI / Görsel Tasarım** | shadcn/ui + Tailwind (AI üretimli), Claude (UI kodu) | Minimal arayüz, component üretimi, renk & tipografi kararları |
| **Kod Üretimi** | Claude, Cursor, GitHub Copilot, ChatGPT | TypeScript/React bileşenleri, storage katmanı, CRUD fonksiyonları, debugging |
| **Prototipleme** | Vite + React (AI destekli iskelet), Cursor | Hızlı sayfa iskeletleri ve route yapısı |
| **İçerik & Dokümantasyon** | ChatGPT, Claude | README, prompt kütüphanesi ve teknik dokümantasyon üretimi |

> **Not:** Ödev şablonundaki örnek araçlara karşılık gelecek şekilde — *UI tasarımı:* Tailwind/shadcn + Claude, *Kod üretimi:* GPT / Claude / Cursor / Copilot, *Prototipleme:* Vite + Cursor kullanılmıştır.

---

## 3. Prompt Kütüphanesi

Proje sürecinde kullanılan en başarılı prompt örnekleri aşağıda kategorilere ayrılmıştır.

### 🧠 Konsept Üretim Promptları
```text
"Sosyal medya kullanıcılarının tüm linklerini tek bir yerde toplama ihtiyacını
analiz et. Hedef kitle kim olabilir, hangi problemleri yaşıyorlar ve bir
'link-in-bio' uygulaması bu problemleri nasıl çözer? Madde madde açıkla."
```
```text
"Bir influencer'ın LinkHub'ı keşfetmesinden kayıt olup linklerini eklemesine
ve özel URL'ini paylaşmasına kadar olan kullanıcı yolculuğunu (user journey)
adım adım yaz. Her adımda kullanıcının duygusunu ve eylemini belirt."
```

### 🎨 UI Üretim Promptları
```text
"React + Tailwind + shadcn/ui kullanarak minimal ve modern bir 'link-in-bio'
landing page tasarla. Sade tipografi, bol beyaz alan, net bir hero başlığı ve
'Ücretsiz Başla' CTA butonu olsun. Mobil uyumlu olmalı."
```
```text
"Kullanıcının profilini özelleştirebileceği bir EditProfile sayfası tasarla:
tema seçimi, arka plan tipi (renk/gradyan/görsel/animasyon), buton stili ve
font seçimi için görsel seçici kartlar içersin. shadcn Card ve Button kullan."
```

### 💻 Kod Üretim Promptları
```text
"TypeScript ile JSON dosya tabanlı bir storage katmanı yaz. Kullanıcı kaydı,
girişi, oturum kontrolü ve çıkış fonksiyonları olsun. Veriler localStorage
yerine /api üzerinden public/data/*.json dosyalarına kaydedilsin."
```
```text
"React için link CRUD fonksiyonları üret. Her link şu alanlara sahip olsun:
id, userId, platformName, url, icon, order, isActive, createdAt, clicks.
Linkleri sürükle-bırak ile yeniden sıralayıp order alanını güncelle."
```

### 🗃️ Veri Üretim Promptları
```text
"13 popüler sosyal medya platformu için bir Platform[] dizisi oluştur. Her
platform için name, icon (react-icons anahtarı), marka rengi (hex) ve örnek
URL placeholder'ı bulunsun. Instagram, Twitter, GitHub, LinkedIn, YouTube,
TikTok, Facebook, Twitch, Discord, Spotify ve Website dahil olsun."
```

### 📝 İçerik Üretim Promptları
```text
"LinkHub projesi için ödev rubriğine (Proje Özeti, AI Araçları, Prompt
Kütüphanesi, Kurulum, Gelecek Vizyonu) uygun, profesyonel ve düzenli bir
README.md hazırla. Türkçe yaz, tablolar ve emoji başlıklar kullan."
```

---

## 4. Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js 18+**
- **npm** (veya yarn / pnpm)

### Adımlar

```bash
# 1. Projeyi klonlayın
git clone https://github.com/KULLANICI_ADIN/linkhub.git
cd linkhub

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Ardından tarayıcıdan açın:

```
http://localhost:5000
```

> **Not:** `npm run dev` hem frontend'i (Vite) hem de JSON tabanlı backend API'yi (`vite-plugin-backend.js`) tek komutta başlatır. Ayrı bir sunucu çalıştırmaya gerek yoktur.

### Kullanılabilir Komutlar
| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu + backend API |
| `npm run build` | Production derlemesi (`dist/`) |
| `npm run preview` | Production derlemesini önizleme |
| `npm run lint` | ESLint ile kod denetimi |

### 🧪 Demo Hesap
| Alan | Değer |
| --- | --- |
| Kullanıcı adı | `demo` |
| Şifre | `demo123` |

---

## 5. Kullanım Kılavuzu

### Yeni Hesap Oluşturma
1. `http://localhost:5000/register` adresine gidin
2. Kullanıcı adı, e-posta ve şifre girin
3. **"Hesap Oluştur"** butonuna tıklayın
4. Otomatik olarak dashboard'a yönlendirilirsiniz

### Link Ekleme
1. Dashboard'da **"Link Ekle"** butonuna tıklayın
2. Platform seçin (Instagram, Twitter, GitHub, vb.)
3. URL'nizi girin
4. **"Ekle"** butonuna tıklayın

### Link Sıralama
- Linkleri **sürükle-bırak** ile yeniden sıralayın
- Değişiklikler otomatik kaydedilir

### Profil Düzenleme
1. Dashboard'da **"Profil Düzenle"** butonuna tıklayın
2. **Avatar yükleyin** (isteğe bağlı, max 2MB — JPG/PNG/GIF)
3. **Bio ekleyin/güncelleyin** (200 karakter)
4. **Tema seçin** (Light / Dark)
5. **Düzen seçin** (Classic / Minimal / Card / Elite)
6. **Arka plan özelleştirin:**
   - Düz renk: Renk seçici ile özel renk
   - Gradyan: Hazır gradyan efekti
   - Görsel: Kendi görselinizi yükleyin (max 8MB)
   - GIF: Hareketli arka plan
   - Animasyonlu: Three.js shader animasyonu
7. **Buton stilini seçin** (Fill / Outline / Shadow / Gradient / Glass / Neon)
8. **Buton & metin rengini özelleştirin** (renk seçici)
9. **Köşe yuvarlaklığını ayarlayın** (Yok / Küçük / Orta / Tam)
10. **Yazı tipini seçin** (Sans / Serif / Mono)
11. **"Değişiklikleri Kaydet"** butonuna tıklayın

### Profil Görüntüleme & Paylaşma
- Dashboard'da **"Görüntüle"** butonuna tıklayın
- Veya doğrudan: `http://localhost:5000/kullaniciadi`
- Profilinizi **QR kod** ile de paylaşabilirsiniz

---

## 6. Gelecek Vizyonu

### 🤖 Geliştirilebilecek AI Özellikleri
- **AI bio yazarı** — Kullanıcının mesleğine ve tarzına göre otomatik biyografi önerisi
- **AI tema asistanı** — "Minimal ve mor tonlu bir tema yap" gibi komutla otomatik renk/arka plan üretimi
- **Akıllı link önerisi** — Eklenen URL'den platformu, başlığı ve ikonu otomatik tanıma
- **AI içerik analizi** — Hangi linklerin daha çok tıklandığını analiz edip sıralama önerme

### 🧩 Çözülebilecek Kullanıcı Problemleri
- Tasarımdan anlamayan kullanıcıların **tek tıkla profesyonel görünüm** elde etmesi
- Çok dilli kitleye hitap edenler için **otomatik çeviri** desteği
- İşletmeler için **rezervasyon / ürün vitrin** blokları

### 📈 Ürünün Ölçeklenmesi
- **Gerçek backend & veritabanı** — Node.js + Express + PostgreSQL/MongoDB'ye geçiş
- **Güvenlik** — Şifre hashleme (bcrypt), JWT tabanlı oturum, e-posta doğrulama, şifre sıfırlama
- **Analitik panel** — Tıklama, ziyaretçi ve coğrafi dağılım istatistikleri
- **Özel domain & ekip hesapları** — Markalar için `marka.com` bağlama ve çoklu yönetici
- **Tema pazarı** — Kullanıcıların hazır temaları paylaşıp indirebileceği bir ekosistem

---

## 7. Ek Bilgiler

### 🛠️ Kullanılan Teknolojiler
| Katman | Teknoloji |
| --- | --- |
| **Frontend** | React 19, TypeScript 5.9, Vite 8 |
| **Routing** | React Router DOM 7 |
| **Stil** | Tailwind CSS 3.4, shadcn/ui, Radix UI |
| **İkonlar** | Lucide React, React Icons |
| **3D / Animasyon** | Three.js (animasyonlu shader arka plan) |
| **QR Kod** | qrcode.react |
| **Backend (geliştirme)** | Express + Vite plugin (`vite-plugin-backend.js`) |
| **Veri Depolama** | JSON dosya tabanlı (`public/data/*.json`) + fiziksel medya (`public/media/`) |
| **Geliştirme Araçları** | ESLint, PostCSS, Autoprefixer |

### 🗂️ Proje Yapısı
```
linkhub/
├── public/
│   ├── data/                 # JSON "veritabanı" dosyaları
│   │   ├── users.json        # Kullanıcı bilgileri
│   │   ├── current_user.json # Aktif oturum
│   │   ├── profiles.json     # Profil ayarları
│   │   └── links.json        # Kullanıcı linkleri
│   └── media/                # Yüklenen medya dosyaları
│       ├── avatars/          # Profil resimleri
│       └── backgrounds/      # Arka plan görselleri & GIF'ler
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui bileşenleri
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Landing.tsx       # Ana sayfa
│   │   ├── Register.tsx      # Kayıt
│   │   ├── Login.tsx         # Giriş
│   │   ├── Dashboard.tsx     # Link yönetimi
│   │   ├── EditProfile.tsx   # Profil düzenleme
│   │   └── Profile.tsx       # Genel profil görüntüleme (/:username)
│   ├── utils/
│   │   ├── jsonStorage.ts    # JSON dosya yönetimi
│   │   ├── storage.ts        # Ana storage API
│   │   └── platforms.ts      # Platform bilgileri (13 platform)
│   ├── types/index.ts        # TypeScript tipleri
│   ├── App.tsx               # Route tanımları
│   └── main.tsx              # Giriş noktası
├── vite-plugin-backend.js    # Geliştirme backend API'si
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

> **Veri Depolama Notu:** Bu proje tarayıcının localStorage'ı yerine **JSON dosya tabanlı** bir depolama kullanır. Tüm metin verileri `public/data/*.json` dosyalarında, yüklenen medya dosyaları ise `public/media/` klasöründe fiziksel olarak saklanır. Detaylar için [`STORAGE_SYSTEM.md`](STORAGE_SYSTEM.md) dosyasına bakın.

### 📄 Lisans
Bu proje **eğitim amaçlı** geliştirilmiştir.

### 👨‍💻 Geliştirici
**Eray Çelik**
Plato Meslek Yüksekokulu — AI-Driven Product Design & Development
2026 Bahar Dönemi

---

<p align="center"><i>Tüm linkleriniz, tek bir yerde. 🔗</i></p>
