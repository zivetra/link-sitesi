# GitHub'a Yükleme Talimatları

## Adım 1: GitHub'da Yeni Repo Oluştur

1. https://github.com/new adresine git
2. Repository name: `linkhub` (veya istediğin isim)
3. Description: `Sosyal medya linklerini tek bir yerde toplayan minimal platform`
4. Public seç (proje için gerekli)
5. **Initialize this repository with a README** seçeneğini SEÇME
6. "Create repository" butonuna tıkla

## Adım 2: Komutları Çalıştır

GitHub'da repo oluşturduktan sonra, linkhub klasöründe şu komutları çalıştır:

```bash
# Remote ekle (REPO_URL'i kendi repo URL'inle değiştir)
git remote add origin https://github.com/KULLANICI_ADIN/linkhub.git

# Push yap
git branch -M main
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

GitHub repo sayfana git ve dosyaların yüklendiğini kontrol et.

---

**Alternatif: GitHub CLI Kullanarak (Eğer yüklüyse)**

```bash
gh repo create linkhub --public --source=. --remote=origin --push
```

---

**Not:** İlk push'ta GitHub kullanıcı adı ve şifre/token isteyebilir.
