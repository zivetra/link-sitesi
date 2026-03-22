// JSON dosya tabanlı depolama sistemi
// Tüm veriler public/data/*.json dosyalarında
// Medya dosyaları public/media/* klasöründe

export {
  // Kullanıcı işlemleri
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  
  // Profil işlemleri
  getProfile,
  getProfileByUsername,
  updateProfile,
  loadProfileWithMedia,
  
  // Link işlemleri
  getUserLinks,
  addLink,
  updateLink,
  deleteLink,
  reorderLinks,
  toggleLinkStatus,
  
  // Yardımcı işlemler
  createDemoData,
  clearAllData
} from './jsonStorage';
