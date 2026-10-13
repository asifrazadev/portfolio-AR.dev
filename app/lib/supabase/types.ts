// Database Types
export interface Project {
    id: string
    title: string
    description: string
    year: string
    tags: string[]
    image_url?: string
    project_url?: string
    order: number
    created_at: string
    updated_at: string
    slug?: string
    featured?: boolean
    overview?: string
    problem?: string
    solution?: string
    tech_stack?: string[]
    features?: string[]
    challenges?: string[]
    results?: string[]
    gallery_images?: string[]
    live_url?: string
    github_url?: string
}

export interface Experience {
    id: string
    title: string
    company: string
    date_range: string
    description: string
    achievements: string[]
    order: number
    created_at: string
    updated_at: string
}

export interface Skill {
    id: string
    category: 'Frontend' | 'Backend' | 'Tools'
    name: string
    order: number
    created_at: string
}

export interface About {
    id: string
    hero_stats?: {
        value: string
        label: string
    }[]
    tech_ticker?: string[]
    social_links?: {
        platform: string
        url: string
        icon: string
    }[]
    image_url?: string
    updated_at: string
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: Record<string, unknown> | null
    cover_image: string | null
    published: boolean
    tags: string[]
    reading_time: number
    created_at: string
    updated_at: string
}

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: Project
                Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
            }
            experience: {
                Row: Experience
                Insert: Omit<Experience, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Experience, 'id' | 'created_at' | 'updated_at'>>
            }
            skills: {
                Row: Skill
                Insert: Omit<Skill, 'id' | 'created_at'>
                Update: Partial<Omit<Skill, 'id' | 'created_at'>>
            }
            about: {
                Row: About
                Insert: Omit<About, 'id' | 'updated_at'>
                Update: Partial<Omit<About, 'id' | 'updated_at'>>
            }
            blog_posts: {
                Row: BlogPost
                Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
            }
        }
    }
}
