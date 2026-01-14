'use client'

import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  YoutubeLogoIcon,
  TwitchLogoIcon,
  DribbbleLogoIcon,
  BehanceLogoIcon,
  EnvelopeSimpleIcon,
  LinkIcon,
  GlobeIcon,
  DiscordLogoIcon,
  WhatsappLogoIcon,
  TelegramLogoIcon,
  StackOverflowLogoIcon,
  MediumLogoIcon,
  QuestionIcon,
  XLogoIcon,
  TiktokLogoIcon
} from '@phosphor-icons/react'

export const SocialIconsMap: Record<string, any> = {
  'github': GithubLogoIcon,
  'linkedin': LinkedinLogoIcon,
  'twitter': TwitterLogoIcon,
  'x': XLogoIcon,
  'instagram': InstagramLogoIcon,
  'facebook': FacebookLogoIcon,
  'youtube': YoutubeLogoIcon,
  'twitch': TwitchLogoIcon,
  'dribbble': DribbbleLogoIcon,
  'behance': BehanceLogoIcon,
  'envelope': EnvelopeSimpleIcon,
  'mail': EnvelopeSimpleIcon,
  'link': LinkIcon,
  'website': GlobeIcon,
  'discord': DiscordLogoIcon,
  'whatsapp': WhatsappLogoIcon,
  'telegram': TelegramLogoIcon,
  'stackoverflow': StackOverflowLogoIcon,
  'medium': MediumLogoIcon,
  'tiktok': TiktokLogoIcon,
  'default': LinkIcon
}

export const getSocialIcon = (iconName: string) => {
  if (!iconName) return QuestionIcon
  
  // Normalize: lowercase and remove 'logo'/'icon' suffixes if strictly matching keys
  // But our previous logic was PascalCase.
  // Let's support the existing kebab-case input -> map key lookup
  
  // Map keys are specific. The user input from DB is likely "github-logo" or just "github".
  // Let's make the map robust.
  
  const normalized = iconName.toLowerCase().replace(/-logo$/, '').replace(/-icon$/, '')
  return SocialIconsMap[normalized] || SocialIconsMap[iconName.toLowerCase()] || QuestionIcon
}
