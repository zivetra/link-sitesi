# GitHub'a Yükleme - LinkHub Projesi

## Adım 1: GitHub'da Yeni Repo Oluştur

1. https://github.com/new adresine git
2. Repository name: **linkhub**
3. Description: **Sosyal medya linklerini tek bir yerde toplayan minimal platform - AI-Driven Product Design & Development**
4. **Public** seç (proje için gerekli)
5. **Initialize this repository with a README** seçeneğini SEÇME (zaten var)
6. "Create repository" butonuna tıkla

## Adım 2: Remote Ekle ve Push Yap

GitHub'da repo oluşturduktan sonra, linkhub klasöründe şu komutları çalıştır:

```bash
cd linkhub

# Remote ekle (KULLANICI_ADIN'i kendi GitHub kullanıcı adınla değiştir)
git remote add origin https://github.com/KULLANICI_ADIN/linkhub.git

# Branch adını kontrol et
git branch -M main

# Push yap
git push -u origin main
```

## Örnek:
Eğer GitHub kullanıcı adın "ahmet" ise:
```bash
git remote add origin https://github.com/ahmet/linkhub.git
git branch -M main
git push -u origin main
```

## Adım 3: Doğrula

1. GitHub repo sayfana git: https://github.com/KULLANICI_ADIN/linkhub
2. Dosyaların yüklendiğini kontrol et
3. README.md'nin düzgün göründüğünü kontrol et

## Alternatif: GitHub CLI Kullanarak

Eğer GitHub CLI yüklüyse:

```bash
cd linkhub
gh repo create linkhub --public --source=. --remote=origin --push
```

## Sonraki Adımlar

Repo oluşturduktan sonra:

1. ✅ Proje tamamlandı
2. ✅ README.md hazır
3. ✅ Tüm sayfalar çalışıyor
4. ✅ localStorage sistemi aktif
5. ✅ Minimal ve sade tasarım

## Vize İçin Hazırlık

Vize sunumunda gösterilecekler:
- ✅ Problem tanımı (AŞAMA_2_KONSEPT.md)
- ✅ Hedef kullanıcı profili
- ✅ Kullanıcı yolculuğu
- ✅ MVP özellikleri
- ✅ Çalışan prototip (localhost:5000)
- ✅ GitHub deposu
- ✅ README dokümantasyonu
- ✅ Prompt kütüphanesi

---

**Not:** İlk push'ta GitHub kullanıcı adı ve şifre/token isteyebilir.
