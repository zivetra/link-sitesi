# LinkHub - Sosyal Medya Link Toplama Platformu

Tüm sosyal medya linklerinizi tek bir minimal sayfada toplayın.

## 🎯 Proje Özeti

LinkHub, kullanıcıların sosyal medya hesaplarını, web sitelerini ve önemli linklerini tek bir özelleştirilebilir sayfada toplamasını sağlayan minimal ve kullanıcı dostu bir platformdur.

### Problem
- Instagram bio'sunda sadece 1 link paylaşabilme
- Farklı platformlarda dağınık linkler
- Link güncelleme zorluğu
- Profesyonel görünüm eksikliği

### Çözüm
- ✅ Sınırsız link ekleme
- ✅ Tek bir URL ile tüm linklere erişim
- ✅ Kolay güncelleme ve yönetim
- ✅ Minimal ve profesyonel tasarım

## 🎓 Proje Bilgileri

**Ders:** PP214 - Programlamada Yeni Eğilimler & BTE208 - Bilgisayar Teknolojilerinde Güncel Trendler  
**Kurum:** Plato Meslek Yüksekokulu  
**Dönem:** 2026 Bahar  
**Konu:** AI-Driven Product Design & Development

## 🚀 Özellikler

### Kullanıcı Yönetimi
- ✅ Kullanıcı kaydı ve girişi
- ✅ Oturum yönetimi (localStorage)
- ✅ Güvenli şifre saklama
- ✅ Form validasyonu

### Link Yönetimi
- ✅ Sınırsız link ekleme
- ✅ 13 farklı platform desteği (Instagram, Twitter, GitHub, vb.)
- ✅ Platform seçimi (görsel butonlar)
- ✅ Link düzenleme ve silme
- ✅ **Drag & Drop ile sıralama**
- ✅ Link aktif/pasif yapma
- ✅ Renkli platform ikonları

### Profil
- ✅ Özel kullanıcı URL'i (linkhub.com/username)
- ✅ Profil görüntüleme sayfası
- ✅ **Profil düzenleme sayfası**
- ✅ **Bio ekleme/güncelleme**
- ✅ **Tema seçimi (açık/koyu mod)**
- ✅ Avatar gösterimi
- ✅ Minimal ve temiz tasarım
- ✅ Responsive tasarım

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **React 19.2.4** - UI framework
- **Vite 8.0.0** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS 3.4.17** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Veri Depolama
- **localStorage** - Tarayıcı yerel depolama

### Geliştirme Araçları
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. Projeyi klonlayın:
```bash
git clone https://github.com/KULLANICI_ADIN/linkhub.git
cd linkhub
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda açın:
```
http://localhost:5001
```

## 📱 Kullanım Kılavuzu

### Yeni Hesap Oluşturma
1. http://localhost:5001/register adresine gidin
2. Kullanıcı adı, email ve şifre girin
3. "Hesap Oluştur" butonuna tıklayın
4. Otomatik olarak dashboard'a yönlendirileceksiniz

### Link Ekleme
1. Dashboard'da "Link Ekle" butonuna tıklayın
2. Platform seçin (Instagram, Twitter, GitHub, vb.)
3. URL'nizi girin
4. "Ekle" butonuna tıklayın

### Link Sıralama
- Linkleri sürükle-bırak ile yeniden sıralayın
- Değişiklikler otomatik kaydedilir

### Profil Düzenleme
1. Dashboard'da "Profil Düzenle" butonuna tıklayın
2. Bio ekleyin/güncelleyin (200 karakter)
3. Tema seçin (açık/koyu)
4. "Değişiklikleri Kaydet" butonuna tıklayın

### Profil Görüntüleme
- Dashboard'da "Görüntüle" butonuna tıklayın
- Veya direkt: http://localhost:5001/kullaniciadi

## 🎨 Kullanılan AI Araçları

### Konsept Geliştirme
- **ChatGPT/Claude** - Problem tanımı, kullanıcı profili, user journey
- **AI ile dokümantasyon** - AŞAMA_2_KONSEPT.md

### Tasarım
- **shadcn/ui** - Minimal UI component'leri
- **Tailwind CSS** - Utility-first CSS framework

### Kod Geliştirme
- **Cursor / GitHub Copilot** - Kod yazımı ve tamamlama
- **ChatGPT** - Kod açıklamaları ve debugging

## 📝 Prompt Kütüphanesi

### Konsept Geliştirme Promptları

**Problem Tanımı:**
```
Sosyal medya kullanıcılarının linklerini tek bir yerde toplama ihtiyacını 
analiz et ve bir çözüm öner. Hedef kitle, problemler ve çözümler neler olabilir?
```

**Kullanıcı Yolculuğu:**
```
Bir influencer'ın LinkHub'ı keşfetmesinden, kayıt olup linklerini eklemesine 
kadar olan süreci adım adım yaz. Her adımda kullanıcının düşünceleri ve 
eylemleri neler olabilir?
```

### UI Tasarım Promptları

**Ana Sayfa:**
```
Minimal ve modern bir link-in-bio landing page tasarımı. 
Beyaz arka plan, sade tipografi, shadcn/ui component'leri kullan.
```

**Dashboard:**
```
Link yönetim paneli tasarımı. Kullanıcı linklerini ekleyebilmeli, 
düzenleyebilmeli ve sıralayabilmeli. Minimal ve kullanıcı dostu.
```

### Kod Üretim Promptları

**localStorage Yönetimi:**
```
React için localStorage tabanlı kullanıcı yönetim sistemi. 
Kayıt, giriş, çıkış ve oturum kontrolü fonksiyonları.
```

**Link CRUD İşlemleri:**
```
localStorage kullanarak link ekleme, güncelleme, silme ve 
listeleme fonksiyonları. Her link için id, userId, platformName, 
url, order ve isActive alanları olmalı.
```

## 🗂️ Proje Yapısı

```
linkhub/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── pages/
│   │   ├── Landing.jsx      # Ana sayfa
│   │   ├── Register.jsx     # Kayıt sayfası
│   │   ├── Login.jsx        # Giriş sayfası
│   │   ├── Dashboard.jsx    # Link yönetimi
│   │   ├── EditProfile.jsx  # Profil düzenleme
│   │   ├── Profile.jsx      # Profil görüntüleme
│   │   └── Test.jsx         # Test sayfası
│   ├── utils/
│   │   ├── storage.js       # localStorage yönetimi
│   │   └── platforms.js     # Platform bilgileri
│   ├── App.jsx              # Ana uygulama
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── ÖZELLIKLER.md                      # Detaylı özellik listesi
├── PROJE_YOL_HARITASI.txt             # Proje yol haritası
├── TAMAMLANDI.md                      # Tamamlanan özellikler
├── PROJE_SURECI_VE_PROMPT_GECMISI.md  # Prompt geçmişi ve süreç
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧪 Demo Hesap

Projeyi test etmek için demo hesap kullanabilirsiniz:

- **Kullanıcı adı:** demo
- **Şifre:** demo123

## 🔮 Gelecek Vizyonu

### Tamamlanan Özellikler ✅
- ✅ Drag & drop ile link sıralama
- ✅ Sosyal medya platform ikonları (13 platform)
- ✅ Tema sistemi (açık/koyu mod)
- ✅ Profil düzenleme
- ✅ Bio ekleme

### Planlanan Özellikler (Opsiyonel)
- Link tıklama istatistikleri
- QR kod oluşturma
- Profil paylaşma butonu
- Avatar yükleme (base64)
- Link önizleme
- Animasyonlar

### Potansiyel Geliştirmeler
- Backend entegrasyonu (Node.js + MongoDB)
- Gerçek veritabanı
- Email doğrulama
- Şifre sıfırlama
- Özel domain desteği
- Analytics dashboard

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

**Plato Meslek Yüksekokulu**  
AI-Driven Product Design & Development  
2026 Bahar Dönemi

---

**Not:** Bu proje localhost üzerinde çalışmak üzere tasarlanmıştır. Tüm veriler tarayıcının localStorage'ında saklanır.
