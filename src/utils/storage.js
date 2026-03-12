// localStorage Yönetim Sistemi
// Tüm veri işlemleri bu dosya üzerinden yapılacak

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'linkhub_users',
  CURRENT_USER: 'linkhub_current_user',
  LINKS: 'linkhub_links',
  PROFILES: 'linkhub_profiles'
};

// Helper: localStorage'dan veri al
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

// Helper: localStorage'a veri kaydet
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Helper: Unique ID oluştur
const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper: Basit şifre hash (demo için)
const hashPassword = (password) => {
  // Gerçek projede bcrypt kullanılmalı, bu sadece demo için
  return btoa(password);
};

// Helper: Şifre doğrula
const verifyPassword = (password, hashedPassword) => {
  return btoa(password) === hashedPassword;
};

// ============================================================================
// KULLANICI İŞLEMLERİ
// ============================================================================

// Tüm kullanıcıları getir
export const getAllUsers = () => {
  return getFromStorage(STORAGE_KEYS.USERS) || [];
};

// Kullanıcı kayıt
export const registerUser = (username, email, password) => {
  const users = getAllUsers();
  
  // Kullanıcı adı kontrolü
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Bu kullanıcı adı zaten kullanılıyor' };
  }
  
  // Email kontrolü
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Bu email zaten kayıtlı' };
  }
  
  // Yeni kullanıcı oluştur
  const newUser = {
    id: generateId('user'),
    username,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  // Profil oluştur
  createProfile(newUser.id, username);
  
  return { success: true, message: 'Kayıt başarılı', user: newUser };
};

// Kullanıcı giriş
export const loginUser = (usernameOrEmail, password) => {
  const users = getAllUsers();
  
  const user = users.find(u => 
    u.username === usernameOrEmail || u.email === usernameOrEmail
  );
  
  if (!user) {
    return { success: false, message: 'Kullanıcı bulunamadı' };
  }
  
  if (!verifyPassword(password, user.password)) {
    return { success: false, message: 'Şifre hatalı' };
  }
  
  // Şifreyi çıkar (güvenlik için)
  const { password: _, ...userWithoutPassword } = user;
  
  // Oturum aç
  saveToStorage(STORAGE_KEYS.CURRENT_USER, userWithoutPassword);
  
  return { success: true, message: 'Giriş başarılı', user: userWithoutPassword };
};

// Çıkış yap
export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  return { success: true, message: 'Çıkış yapıldı' };
};

// Aktif kullanıcıyı getir
export const getCurrentUser = () => {
  return getFromStorage(STORAGE_KEYS.CURRENT_USER);
};

// Kullanıcı oturum kontrolü
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// ============================================================================
// PROFİL İŞLEMLERİ
// ============================================================================

// Tüm profilleri getir
const getAllProfiles = () => {
  return getFromStorage(STORAGE_KEYS.PROFILES) || [];
};

// Profil oluştur
const createProfile = (userId, username) => {
  const profiles = getAllProfiles();
  
  const newProfile = {
    id: generateId('profile'),
    userId,
    bio: '',
    avatar: '',
    theme: 'light',
    customUrl: username
  };
  
  profiles.push(newProfile);
  saveToStorage(STORAGE_KEYS.PROFILES, profiles);
  
  return newProfile;
};

// Profil getir
export const getProfile = (userId) => {
  const profiles = getAllProfiles();
  return profiles.find(p => p.userId === userId);
};

// Username'e göre profil getir
export const getProfileByUsername = (username) => {
  const users = getAllUsers();
  const user = users.find(u => u.username === username);
  
  if (!user) return null;
  
  return getProfile(user.id);
};

// Profil güncelle
export const updateProfile = (userId, updates) => {
  const profiles = getAllProfiles();
  const index = profiles.findIndex(p => p.userId === userId);
  
  if (index === -1) {
    return { success: false, message: 'Profil bulunamadı' };
  }
  
  profiles[index] = { ...profiles[index], ...updates };
  saveToStorage(STORAGE_KEYS.PROFILES, profiles);
  
  return { success: true, message: 'Profil güncellendi', profile: profiles[index] };
};

// ============================================================================
// LİNK İŞLEMLERİ
// ============================================================================

// Tüm linkleri getir
const getAllLinks = () => {
  return getFromStorage(STORAGE_KEYS.LINKS) || [];
};

// Kullanıcının linklerini getir
export const getUserLinks = (userId) => {
  const links = getAllLinks();
  return links.filter(l => l.userId === userId).sort((a, b) => a.order - b.order);
};

// Link ekle
export const addLink = (userId, platformName, url, icon = '') => {
  const links = getAllLinks();
  const userLinks = getUserLinks(userId);
  
  const newLink = {
    id: generateId('link'),
    userId,
    platformName,
    url,
    icon,
    order: userLinks.length + 1,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  links.push(newLink);
  saveToStorage(STORAGE_KEYS.LINKS, links);
  
  return { success: true, message: 'Link eklendi', link: newLink };
};

// Link güncelle
export const updateLink = (linkId, updates) => {
  const links = getAllLinks();
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return { success: false, message: 'Link bulunamadı' };
  }
  
  links[index] = { ...links[index], ...updates };
  saveToStorage(STORAGE_KEYS.LINKS, links);
  
  return { success: true, message: 'Link güncellendi', link: links[index] };
};

// Link sil
export const deleteLink = (linkId) => {
  const links = getAllLinks();
  const filteredLinks = links.filter(l => l.id !== linkId);
  
  saveToStorage(STORAGE_KEYS.LINKS, filteredLinks);
  
  return { success: true, message: 'Link silindi' };
};

// Link sırasını güncelle
export const reorderLinks = (userId, linkIds) => {
  const links = getAllLinks();
  
  linkIds.forEach((linkId, index) => {
    const linkIndex = links.findIndex(l => l.id === linkId && l.userId === userId);
    if (linkIndex !== -1) {
      links[linkIndex].order = index + 1;
    }
  });
  
  saveToStorage(STORAGE_KEYS.LINKS, links);
  
  return { success: true, message: 'Sıralama güncellendi' };
};

// Link aktif/pasif durumunu değiştir
export const toggleLinkStatus = (linkId) => {
  const links = getAllLinks();
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return { success: false, message: 'Link bulunamadı' };
  }
  
  links[index].isActive = !links[index].isActive;
  saveToStorage(STORAGE_KEYS.LINKS, links);
  
  return { success: true, message: 'Link durumu güncellendi', link: links[index] };
};

// ============================================================================
// DEMO VERİ OLUŞTURMA (Geliştirme için)
// ============================================================================

export const createDemoData = () => {
  // Demo kullanıcı
  const demoUser = {
    id: 'user_demo_123',
    username: 'demo',
    email: 'demo@linkhub.com',
    password: hashPassword('demo123'),
    createdAt: new Date().toISOString()
  };
  
  saveToStorage(STORAGE_KEYS.USERS, [demoUser]);
  
  // Demo profil
  const demoProfile = {
    id: 'profile_demo_123',
    userId: demoUser.id,
    bio: 'Merhaba! Ben demo kullanıcısıyım 👋',
    avatar: '',
    theme: 'light',
    customUrl: 'demo'
  };
  
  saveToStorage(STORAGE_KEYS.PROFILES, [demoProfile]);
  
  // Demo linkler
  const demoLinks = [
    {
      id: 'link_demo_1',
      userId: demoUser.id,
      platformName: 'Instagram',
      url: 'https://instagram.com/demo',
      icon: 'instagram',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'link_demo_2',
      userId: demoUser.id,
      platformName: 'Twitter',
      url: 'https://twitter.com/demo',
      icon: 'twitter',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'link_demo_3',
      userId: demoUser.id,
      platformName: 'GitHub',
      url: 'https://github.com/demo',
      icon: 'github',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];
  
  saveToStorage(STORAGE_KEYS.LINKS, demoLinks);
  
  console.log('Demo data created! Login with: demo / demo123');
};

// Tüm verileri temizle (geliştirme için)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('All data cleared!');
};
