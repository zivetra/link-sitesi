// JSON dosya tabanlı depolama sistemi
// Tüm veriler public/data/*.json dosyalarında
// Medya dosyaları public/media/* klasöründe

import type { 
  User, 
  UserWithoutPassword, 
  Link, 
  Profile, 
  RegisterResponse, 
  LoginResponse, 
  LinkResponse, 
  ProfileResponse,
  ApiResponse 
} from '@/types';

// JSON dosya yolları
const DATA_FILES = {
  USERS: '/data/users.json',
  CURRENT_USER: '/data/current_user.json',
  LINKS: '/data/links.json',
  PROFILES: '/data/profiles.json'
} as const;

// Medya klasör yolları
const MEDIA_DIRS = {
  AVATARS: '/media/avatars',
  BACKGROUNDS: '/media/backgrounds',
  MUSIC: '/media/music'
} as const;

// ============================================================================
// JSON DOSYA İŞLEMLERİ
// ============================================================================

// JSON dosyasından veri oku
const readJSON = async <T>(filePath: string): Promise<T | null> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.log(`Dosya bulunamadı: ${filePath}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`JSON okuma hatası: ${filePath}`, error);
    return null;
  }
};

// JSON dosyasına veri yaz (backend'e POST isteği)
const writeJSON = async <T>(filePath: string, data: T): Promise<boolean> => {
  try {
    const response = await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath, data })
    });
    
    if (!response.ok) {
      console.error(`JSON yazma hatası: ${filePath}`, response.statusText);
      return false;
    }
    
    console.log(`✅ Kaydedildi: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`JSON yazma hatası: ${filePath}`, error);
    return false;
  }
};

// ============================================================================
// MEDYA DOSYA İŞLEMLERİ
// ============================================================================

// Base64'ten dosya oluştur ve kaydet
const saveMediaFile = async (
  base64Data: string, 
  directory: string, 
  filename: string
): Promise<string | null> => {
  try {
    const response = await fetch('/api/save-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Data, directory, filename })
    });
    
    if (!response.ok) {
      console.error('Medya kaydetme hatası:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    console.log(`✅ Medya kaydedildi: ${result.filePath}`);
    return result.filePath;
  } catch (error) {
    console.error('Medya kaydetme hatası:', error);
    return null;
  }
};

// Dosyayı sil
const deleteMediaFile = async (filePath: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/delete-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Dosya silme hatası:', error);
    return false;
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const hashPassword = (password: string): string => {
  return btoa(password);
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return btoa(password) === hashedPassword;
};

// Base64'ten dosya uzantısı çıkar
const getFileExtension = (base64: string): string => {
  const match = base64.match(/data:([^;]+);/);
  if (!match) return 'bin';
  
  const mimeType = match[1];
  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'audio/mpeg': 'mp3',
    'audio/mp3': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg'
  };
  
  return extensions[mimeType] || 'bin';
};

// ============================================================================
// KULLANICI İŞLEMLERİ
// ============================================================================

export const getAllUsers = async (): Promise<User[]> => {
  return await readJSON<User[]>(DATA_FILES.USERS) || [];
};

export const registerUser = async (
  username: string, 
  email: string, 
  password: string
): Promise<RegisterResponse> => {
  const users = await getAllUsers();
  
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Bu kullanıcı adı zaten kullanılıyor' };
  }
  
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Bu email zaten kayıtlı' };
  }
  
  const newUser: User = {
    id: generateId('user'),
    username,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  const saved = await writeJSON(DATA_FILES.USERS, users);
  
  if (!saved) {
    return { success: false, message: 'Kayıt başarısız' };
  }
  
  // Profil oluştur
  await createProfile(newUser.id, username);
  
  return { success: true, message: 'Kayıt başarılı', user: newUser };
};

export const loginUser = async (
  usernameOrEmail: string, 
  password: string
): Promise<LoginResponse> => {
  const users = await getAllUsers();
  
  const user = users.find(u => 
    u.username === usernameOrEmail || u.email === usernameOrEmail
  );
  
  if (!user) {
    return { success: false, message: 'Kullanıcı bulunamadı' };
  }
  
  if (!verifyPassword(password, user.password)) {
    return { success: false, message: 'Şifre hatalı' };
  }
  
  const { password: _, ...userWithoutPassword } = user;
  await writeJSON(DATA_FILES.CURRENT_USER, userWithoutPassword);
  
  return { success: true, message: 'Giriş başarılı', user: userWithoutPassword };
};

export const logoutUser = async (): Promise<ApiResponse> => {
  await writeJSON(DATA_FILES.CURRENT_USER, null);
  return { success: true, message: 'Çıkış yapıldı' };
};

export const getCurrentUser = async (): Promise<UserWithoutPassword | null> => {
  return await readJSON<UserWithoutPassword>(DATA_FILES.CURRENT_USER);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user !== null;
};

// ============================================================================
// PROFİL İŞLEMLERİ
// ============================================================================

const getAllProfiles = async (): Promise<Profile[]> => {
  return await readJSON<Profile[]>(DATA_FILES.PROFILES) || [];
};

const createProfile = async (userId: string, username: string): Promise<Profile> => {
  const profiles = await getAllProfiles();
  
  const newProfile: Profile = {
    id: generateId('profile'),
    userId,
    bio: '',
    avatar: '',
    theme: 'dark',
    customUrl: username,
    layout: 'minimal',
    backgroundType: 'animated',
    backgroundColor: '#030014',
    backgroundImage: '',
    backgroundGif: '',
    backgroundMusic: '',
    buttonStyle: 'fill',
    buttonColor: '#6366f1',
    buttonTextColor: 'auto',
    cornerRadius: 'medium',
    fontStyle: 'sans'
  };
  
  profiles.push(newProfile);
  await writeJSON(DATA_FILES.PROFILES, profiles);
  
  return newProfile;
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const profiles = await getAllProfiles();
  return profiles.find(p => p.userId === userId) || null;
};

export const getProfileByUsername = async (username: string): Promise<Profile | null> => {
  const users = await getAllUsers();
  const user = users.find(u => u.username === username);
  
  if (!user) return null;
  
  return await getProfile(user.id);
};

export const updateProfile = async (
  userId: string, 
  updates: Partial<Profile>
): Promise<ProfileResponse> => {
  const profiles = await getAllProfiles();
  const index = profiles.findIndex(p => p.userId === userId);
  
  if (index === -1) {
    return { success: false, message: 'Profil bulunamadı' };
  }
  
  const currentProfile = profiles[index];
  const updatedProfile = { ...currentProfile };
  
  // Avatar işle
  if (updates.avatar && updates.avatar.startsWith('data:')) {
    // Eski avatar'ı sil
    if (currentProfile.avatar && !currentProfile.avatar.startsWith('data:')) {
      await deleteMediaFile(currentProfile.avatar);
    }
    
    const ext = getFileExtension(updates.avatar);
    const filename = `${userId}_avatar_${Date.now()}.${ext}`;
    const filePath = await saveMediaFile(updates.avatar, MEDIA_DIRS.AVATARS, filename);
    
    if (filePath) {
      updatedProfile.avatar = filePath;
    }
  } else if (updates.avatar !== undefined) {
    updatedProfile.avatar = updates.avatar;
  }
  
  // Background image işle
  if (updates.backgroundImage && updates.backgroundImage.startsWith('data:')) {
    if (currentProfile.backgroundImage && !currentProfile.backgroundImage.startsWith('data:')) {
      await deleteMediaFile(currentProfile.backgroundImage);
    }
    
    const ext = getFileExtension(updates.backgroundImage);
    const filename = `${userId}_bg_${Date.now()}.${ext}`;
    const filePath = await saveMediaFile(updates.backgroundImage, MEDIA_DIRS.BACKGROUNDS, filename);
    
    if (filePath) {
      updatedProfile.backgroundImage = filePath;
    }
  } else if (updates.backgroundImage !== undefined) {
    updatedProfile.backgroundImage = updates.backgroundImage;
  }
  
  // Background GIF işle
  if (updates.backgroundGif && updates.backgroundGif.startsWith('data:')) {
    if (currentProfile.backgroundGif && !currentProfile.backgroundGif.startsWith('data:')) {
      await deleteMediaFile(currentProfile.backgroundGif);
    }
    
    const ext = getFileExtension(updates.backgroundGif);
    const filename = `${userId}_gif_${Date.now()}.${ext}`;
    const filePath = await saveMediaFile(updates.backgroundGif, MEDIA_DIRS.BACKGROUNDS, filename);
    
    if (filePath) {
      updatedProfile.backgroundGif = filePath;
    }
  } else if (updates.backgroundGif !== undefined) {
    updatedProfile.backgroundGif = updates.backgroundGif;
  }
  
  // Background music işle
  if (updates.backgroundMusic && updates.backgroundMusic.startsWith('data:')) {
    if (currentProfile.backgroundMusic && !currentProfile.backgroundMusic.startsWith('data:')) {
      await deleteMediaFile(currentProfile.backgroundMusic);
    }
    
    const ext = getFileExtension(updates.backgroundMusic);
    const filename = `${userId}_music_${Date.now()}.${ext}`;
    const filePath = await saveMediaFile(updates.backgroundMusic, MEDIA_DIRS.MUSIC, filename);
    
    if (filePath) {
      updatedProfile.backgroundMusic = filePath;
    }
  } else if (updates.backgroundMusic !== undefined) {
    updatedProfile.backgroundMusic = updates.backgroundMusic;
  }
  
  // Diğer alanları güncelle
  Object.keys(updates).forEach(key => {
    if (!['avatar', 'backgroundImage', 'backgroundGif', 'backgroundMusic'].includes(key)) {
      (updatedProfile as any)[key] = (updates as any)[key];
    }
  });
  
  profiles[index] = updatedProfile;
  const saved = await writeJSON(DATA_FILES.PROFILES, profiles);
  
  if (!saved) {
    return { success: false, message: 'Profil kaydedilemedi' };
  }
  
  return { success: true, message: 'Profil güncellendi', profile: updatedProfile };
};

// Medya ile birlikte profil yükle (uyumluluk için)
export const loadProfileWithMedia = async (userId: string): Promise<Profile | null> => {
  return await getProfile(userId);
};

// ============================================================================
// LİNK İŞLEMLERİ
// ============================================================================

const getAllLinks = async (): Promise<Link[]> => {
  return await readJSON<Link[]>(DATA_FILES.LINKS) || [];
};

export const getUserLinks = async (userId: string): Promise<Link[]> => {
  const links = await getAllLinks();
  return links.filter(l => l.userId === userId).sort((a, b) => a.order - b.order);
};

export const addLink = async (
  userId: string, 
  platformName: string, 
  url: string, 
  icon: string = ''
): Promise<LinkResponse> => {
  const links = await getAllLinks();
  const userLinks = await getUserLinks(userId);
  
  const newLink: Link = {
    id: generateId('link'),
    userId,
    platformName,
    url,
    icon,
    order: userLinks.length + 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    clicks: 0
  };
  
  links.push(newLink);
  const saved = await writeJSON(DATA_FILES.LINKS, links);
  
  if (!saved) {
    return { success: false, message: 'Link eklenemedi' };
  }
  
  return { success: true, message: 'Link eklendi', link: newLink };
};

export const updateLink = async (
  linkId: string, 
  updates: Partial<Link>
): Promise<LinkResponse> => {
  const links = await getAllLinks();
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return { success: false, message: 'Link bulunamadı' };
  }
  
  links[index] = { ...links[index], ...updates };
  const saved = await writeJSON(DATA_FILES.LINKS, links);
  
  if (!saved) {
    return { success: false, message: 'Link güncellenemedi' };
  }
  
  return { success: true, message: 'Link güncellendi', link: links[index] };
};

export const deleteLink = async (linkId: string): Promise<ApiResponse> => {
  const links = await getAllLinks();
  const filteredLinks = links.filter(l => l.id !== linkId);
  
  const saved = await writeJSON(DATA_FILES.LINKS, filteredLinks);
  
  if (!saved) {
    return { success: false, message: 'Link silinemedi' };
  }
  
  return { success: true, message: 'Link silindi' };
};

export const reorderLinks = async (
  userId: string, 
  linkIds: string[]
): Promise<ApiResponse> => {
  const links = await getAllLinks();
  
  linkIds.forEach((linkId, index) => {
    const linkIndex = links.findIndex(l => l.id === linkId && l.userId === userId);
    if (linkIndex !== -1) {
      links[linkIndex].order = index + 1;
    }
  });
  
  const saved = await writeJSON(DATA_FILES.LINKS, links);
  
  if (!saved) {
    return { success: false, message: 'Sıralama güncellenemedi' };
  }
  
  return { success: true, message: 'Sıralama güncellendi' };
};

export const toggleLinkStatus = async (linkId: string): Promise<LinkResponse> => {
  const links = await getAllLinks();
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return { success: false, message: 'Link bulunamadı' };
  }
  
  links[index].isActive = !links[index].isActive;
  const saved = await writeJSON(DATA_FILES.LINKS, links);
  
  if (!saved) {
    return { success: false, message: 'Link durumu güncellenemedi' };
  }
  
  return { success: true, message: 'Link durumu güncellendi', link: links[index] };
};

// Link tıklama sayısını artır
export const incrementLinkClicks = async (linkId: string): Promise<LinkResponse> => {
  const links = await getAllLinks();
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return { success: false, message: 'Link bulunamadı' };
  }
  
  // Eğer clicks yoksa 0'dan başlat
  links[index].clicks = (links[index].clicks || 0) + 1;
  const saved = await writeJSON(DATA_FILES.LINKS, links);
  
  if (!saved) {
    return { success: false, message: 'Tıklama sayısı güncellenemedi' };
  }
  
  return { success: true, message: 'Tıklama kaydedildi', link: links[index] };
};

// ============================================================================
// DEMO VERİ
// ============================================================================

export const createDemoData = async (): Promise<void> => {
  const demoUser: User = {
    id: 'user_demo_123',
    username: 'demo',
    email: 'demo@linkhub.com',
    password: hashPassword('demo123'),
    createdAt: new Date().toISOString()
  };
  
  await writeJSON(DATA_FILES.USERS, [demoUser]);
  
  const demoProfile: Profile = {
    id: 'profile_demo_123',
    userId: demoUser.id,
    bio: 'Merhaba! Ben demo kullanıcısıyım 👋',
    avatar: '',
    theme: 'dark',
    customUrl: 'demo',
    layout: 'minimal',
    backgroundType: 'animated',
    backgroundColor: '#030014',
    backgroundImage: '',
    backgroundGif: '',
    backgroundMusic: '',
    buttonStyle: 'fill',
    buttonColor: '#6366f1',
    buttonTextColor: 'auto',
    cornerRadius: 'medium',
    fontStyle: 'sans'
  };
  
  await writeJSON(DATA_FILES.PROFILES, [demoProfile]);
  
  const demoLinks: Link[] = [
    {
      id: 'link_demo_1',
      userId: demoUser.id,
      platformName: 'Instagram',
      url: 'https://instagram.com/demo',
      icon: 'instagram',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      clicks: 0
    },
    {
      id: 'link_demo_2',
      userId: demoUser.id,
      platformName: 'Twitter',
      url: 'https://twitter.com/demo',
      icon: 'twitter',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      clicks: 0
    },
    {
      id: 'link_demo_3',
      userId: demoUser.id,
      platformName: 'GitHub',
      url: 'https://github.com/demo',
      icon: 'github',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      clicks: 0
    }
  ];
  
  await writeJSON(DATA_FILES.LINKS, demoLinks);
  
  console.log('✅ Demo data created! Login: demo / demo123');
};

export const clearAllData = async (): Promise<void> => {
  await writeJSON(DATA_FILES.USERS, []);
  await writeJSON(DATA_FILES.CURRENT_USER, null);
  await writeJSON(DATA_FILES.LINKS, []);
  await writeJSON(DATA_FILES.PROFILES, []);
  console.log('✅ All data cleared!');
};
