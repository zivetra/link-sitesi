import type { Platform } from '@/types';

// Popüler sosyal medya platformları ve renkleri
export const PLATFORMS: Platform[] = [
  {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    placeholder: 'https://instagram.com/kullaniciadi'
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    placeholder: 'https://twitter.com/kullaniciadi'
  },
  {
    name: 'GitHub',
    icon: 'github',
    color: '#181717',
    placeholder: 'https://github.com/kullaniciadi'
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    placeholder: 'https://linkedin.com/in/kullaniciadi'
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    placeholder: 'https://youtube.com/@kullaniciadi'
  },
  {
    name: 'TikTok',
    icon: 'music',
    color: '#000000',
    placeholder: 'https://tiktok.com/@kullaniciadi'
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    placeholder: 'https://facebook.com/kullaniciadi'
  },
  {
    name: 'Twitch',
    icon: 'twitch',
    color: '#9146FF',
    placeholder: 'https://twitch.tv/kullaniciadi'
  },
  {
    name: 'Discord',
    icon: 'message-circle',
    color: '#5865F2',
    placeholder: 'https://discord.gg/sunucuadi'
  },
  {
    name: 'Spotify',
    icon: 'music',
    color: '#1DB954',
    placeholder: 'https://open.spotify.com/user/kullaniciadi'
  },
  {
    name: 'Website',
    icon: 'globe',
    color: '#6B7280',
    placeholder: 'https://website.com'
  },
  {
    name: 'Email',
    icon: 'mail',
    color: '#6B7280',
    placeholder: 'email@example.com'
  },
  {
    name: 'Özel Link',
    icon: 'link',
    color: '#6B7280',
    placeholder: 'https://...'
  }
];

// Platform adına göre bilgi getir
export const getPlatformInfo = (platformName: string): Platform => {
  return PLATFORMS.find(p => p.name === platformName) || PLATFORMS[PLATFORMS.length - 1];
};

// Icon adına göre Lucide icon component adı döndür
export const getIconName = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'instagram': 'Instagram',
    'twitter': 'Twitter',
    'github': 'Github',
    'linkedin': 'Linkedin',
    'youtube': 'Youtube',
    'music': 'Music',
    'facebook': 'Facebook',
    'twitch': 'Twitch',
    'message-circle': 'MessageCircle',
    'globe': 'Globe',
    'mail': 'Mail',
    'link': 'Link'
  };
  return iconMap[iconName] || 'Link';
};
