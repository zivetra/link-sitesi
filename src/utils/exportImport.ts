// Export/Import utilities for data backup and restore

export interface ExportData {
  version: string;
  exportDate: string;
  users: any[];
  profiles: any[];
  links: any[];
  currentUser: any;
}

// Export all data to JSON file
export const exportData = (): void => {
  const data: ExportData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    users: JSON.parse(localStorage.getItem('linkhub_users') || '[]'),
    profiles: JSON.parse(localStorage.getItem('linkhub_profiles') || '[]'),
    links: JSON.parse(localStorage.getItem('linkhub_links') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('linkhub_current_user') || 'null')
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `linkhub-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import data from JSON file
export const importData = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data: ExportData = JSON.parse(content)
        
        // Validate data structure
        if (!data.version || !data.users || !data.profiles || !data.links) {
          throw new Error('Geçersiz dosya formatı')
        }
        
        // Import data to localStorage
        localStorage.setItem('linkhub_users', JSON.stringify(data.users))
        localStorage.setItem('linkhub_profiles', JSON.stringify(data.profiles))
        localStorage.setItem('linkhub_links', JSON.stringify(data.links))
        if (data.currentUser) {
          localStorage.setItem('linkhub_current_user', JSON.stringify(data.currentUser))
        }
        
        resolve(true)
      } catch (error) {
        console.error('Import error:', error)
        reject(error)
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Dosya okuma hatası'))
    }
    
    reader.readAsText(file)
  })
}

// Download media file (avatar, background, music)
export const downloadMedia = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Get file extension from data URL
export const getFileExtension = (dataUrl: string): string => {
  const match = dataUrl.match(/data:([^;]+);/)
  if (match) {
    const mimeType = match[1]
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
    }
    return extensions[mimeType] || 'bin'
  }
  return 'bin'
}

// Export user's media files
export const exportUserMedia = (userId: string): void => {
  const profiles = JSON.parse(localStorage.getItem('linkhub_profiles') || '[]')
  const profile = profiles.find((p: any) => p.userId === userId)
  
  if (!profile) {
    alert('Profil bulunamadı')
    return
  }
  
  let downloadCount = 0
  
  // Download avatar
  if (profile.avatar) {
    const ext = getFileExtension(profile.avatar)
    downloadMedia(profile.avatar, `avatar.${ext}`)
    downloadCount++
  }
  
  // Download background image
  if (profile.backgroundImage) {
    const ext = getFileExtension(profile.backgroundImage)
    downloadMedia(profile.backgroundImage, `background.${ext}`)
    downloadCount++
  }
  
  // Download background GIF
  if (profile.backgroundGif) {
    const ext = getFileExtension(profile.backgroundGif)
    downloadMedia(profile.backgroundGif, `background.${ext}`)
    downloadCount++
  }
  
  // Download background music
  if (profile.backgroundMusic) {
    const ext = getFileExtension(profile.backgroundMusic)
    downloadMedia(profile.backgroundMusic, `music.${ext}`)
    downloadCount++
  }
  
  if (downloadCount === 0) {
    alert('İndirilecek medya dosyası bulunamadı')
  } else {
    alert(`${downloadCount} medya dosyası indirildi`)
  }
}
