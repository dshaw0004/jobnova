import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number
  email: string
  role: string
  createdAt: string
}

export interface AcademicRecord {
  degree: string
  institution: string
  year?: string
  grade?: string
}

export interface ProfessionalRecord {
  company: string
  role: string
  duration?: string
  description?: string
}

export interface Profile {
  full_name: string | null
  phone: string | null
  location: string | null
  about_self: string | null
  academic_info: AcademicRecord[]
  professional_info: ProfessionalRecord[]
  sector: string | null
  sector_reason: string | null
  team_scenario_answer: string | null
  completeness_score: number
  onboarding_skipped: number
  onboarding_completed: number
  updated_at?: string
}

export function useAuth() {
  const router = useRouter()

  // Globally shared state via Nuxt's useState
  const user = useState<User | null>('jn_user', () => null)
  const profile = useState<Profile | null>('jn_profile', () => null)
  const loading = useState<boolean>('jn_auth_loading', () => false)
  const error = useState<string | null>('jn_auth_error', () => null)

  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<{ user: User; profile: Profile | null }>('/api/auth/me')
      user.value = data.user
      profile.value = data.profile
    }
    catch (err: any) {
      user.value = null
      profile.value = null
      if (err.status !== 401) {
        error.value = err.data?.message || 'Failed to authenticate'
      }
    }
    finally {
      loading.value = false
    }
  }

  async function updateProfile(data: Partial<Profile>) {
    loading.value = true
    error.value = null
    try {
      // Merge current state with updates to calculate completeness properly
      const merged = {
        ...profile.value,
        ...data
      }
      const res = await $fetch<{ success: boolean; completeness: number }>('/api/profile/update', {
        method: 'POST',
        body: merged
      })
      if (profile.value) {
        Object.assign(profile.value, data)
        profile.value.completeness_score = res.completeness
        if (res.completeness >= 80) {
          profile.value.onboarding_completed = 1
        }
      }
      return res
    }
    catch (err: any) {
      error.value = err.data?.message || 'Failed to update profile'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    }
    catch (err) {
      console.error('Logout error:', err)
    }
    finally {
      // Notify other open tabs to redirect to home
      const channel = new BroadcastChannel('jobnova_tab_sync')
      channel.postMessage('jobnova_logout')
      channel.close()

      user.value = null
      profile.value = null
      loading.value = false
      router.push('/login')
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    isLoggedIn,
    fetchUser,
    updateProfile,
    logout
  }
}
