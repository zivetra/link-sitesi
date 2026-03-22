// Dosya bazlı depolama sistemi - localStorage kota sorununu çözer

export interface ProfileFiles {
  avatar?: File | string;
  backgroundImage?: File | string;
  backgroundGif?: File | string;
  backgroundMusic?: File | string;
}

// Profil dosyalarını JSON olarak indir
export const downloadProfileData = (userId: string, profileData: any) => {
  console.log('📥 Profil dışa aktarılıyor...', { userId, dataSize: JSON.stringify(profileData).length });
  
  const dataStr = JSON.stringify(profileData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `linkhub_profile_${userId}_${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('✅ Profil başarıyla dışa aktarıldı!');
};

// JSON dosyasından profil verilerini yükle
export const loadProfileDataFromFile = (file: File): Promise<any> => {
  console.log('📤 Profil içe aktarılıyor...', { fileName: file.name, fileSize: file.size });
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        console.log('✅ Profil başarıyla içe aktarıldı!', data);
        resolve(data);
      } catch (error) {
        console.error('❌ JSON parse hatası:', error);
        reject(new Error('Geçersiz JSON dosyası'));
      }
    };
    
    reader.onerror = () => {
      console.error('❌ Dosya okuma hatası');
      reject(new Error('Dosya okunamadı'));
    };
    
    reader.readAsText(file);
  });
};

// Base64'ü Blob'a çevir
export const base64ToBlob = (base64: string): Blob => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uInt8Array], { type: contentType });
};

// Dosyayı indir
export const downloadFile = (base64Data: string, filename: string) => {
  const blob = base64ToBlob(base64Data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Dosyayı base64'e çevir (küçük dosyalar için)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Profil verilerini localStorage'a güvenli şekilde kaydet
export const safeStorageSave = (key: string, data: any): { success: boolean; error?: string } => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return { success: true };
  } catch (error: any) {
    if (error.name === 'QuotaExceededError') {
      return { 
        success: false, 
        error: 'Depolama alanı doldu. Lütfen profil verilerinizi dosya olarak kaydedin.' 
      };
    }
    return { success: false, error: 'Kaydetme hatası' };
  }
};

// Büyük dosyaları localStorage dışında tut
export const createLightweightProfile = (profile: any) => {
  const lightweight = { ...profile };
  
  // Büyük dosyaları kaldır, sadece varlık bilgisini tut
  if (lightweight.avatar && lightweight.avatar.length > 50000) {
    lightweight.avatar = '';
    lightweight.hasAvatar = true;
  }
  if (lightweight.backgroundImage && lightweight.backgroundImage.length > 50000) {
    lightweight.backgroundImage = '';
    lightweight.hasBackgroundImage = true;
  }
  if (lightweight.backgroundGif && lightweight.backgroundGif.length > 50000) {
    lightweight.backgroundGif = '';
    lightweight.hasBackgroundGif = true;
  }
  if (lightweight.backgroundMusic && lightweight.backgroundMusic.length > 50000) {
    lightweight.backgroundMusic = '';
    lightweight.hasBackgroundMusic = true;
  }
  
  return lightweight;
};
