import type { Platform } from '@/types';
import { IconType } from 'react-icons';
import { 
  FaInstagram, 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaYoutube, 
  FaTiktok, 
  FaFacebook, 
  FaTwitch, 
  FaDiscord, 
  FaSpotify,
  FaGlobe,
  FaEnvelope,
  FaLink
} from 'react-icons/fa';

// Platform icon mapping
export const PLATFORM_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  github: FaGithub,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  facebook: FaFacebook,
  twitch: FaTwitch,
  discord: FaDiscord,
  spotify: FaSpotify,
  globe: FaGlobe,
  mail: FaEnvelope,
  link: FaLink
};

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
    icon: 'tiktok',
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
    icon: 'discord',
    color: '#5865F2',
    placeholder: 'https://discord.gg/sunucuadi'
  },
  {
    name: 'Spotify',
    icon: 'spotify',
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

// Icon adına göre React Icon component döndür
export const getPlatformIcon = (iconName: string): IconType => {
  return PLATFORM_ICONS[iconName] || FaLink;
};
