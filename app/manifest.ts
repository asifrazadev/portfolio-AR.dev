import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asif Raza - Software Engineer Portfolio',
    short_name: 'Asif Raza',
    description: 'Portfolio of Asif Raza, an experienced Software Engineer specializing in React, Next.js, and Node.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
