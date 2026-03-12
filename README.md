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
- Kullanıcı kaydı ve girişi
- Oturum yönetimi (localStorage)
- Güvenli şifre saklama

### Link Yönetimi
- Sınırsız link ekleme
- Link düzenleme ve silme
- Link sıralama
- Link aktif/pasif yapma

### Profil
- Özel kullanıcı URL'i (linkhub.com/username)
- Profil görüntüleme sayfası
- Minimal ve temiz tasarım

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
http://localhost:5000
```

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
│   │   └── Profile.jsx      # Profil görüntüleme
│   ├── utils/
│   │   └── storage.js       # localStorage yönetimi
│   ├── App.jsx              # Ana uygulama
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
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

### Planlanan Özellikler
- Link tıklama istatistikleri
- Özel tema renkleri
- QR kod oluşturma
- Profil fotoğrafı yükleme
- Drag & drop ile link sıralama
- Sosyal medya paylaşım butonları

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
