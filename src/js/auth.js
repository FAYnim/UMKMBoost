// Supabase Configuration
// IMPORTANT: Ganti dengan kredensial Anda sendiri dari https://supabase.com
const SUPABASE_URL = 'https://hgrpljzalzbinlillkij.supabase.co'; // Contoh: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncnBsanphbHpiaW5saWxsa2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MDQzOTQsImV4cCI6MjA4MDM4MDM5NH0.IXyL3sGMumUiwLelDyteimQRMSQAPBcRstxsAHROEaQ';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth Functions
const Auth = {
    // Register new user
    async register(email, password, name) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) throw error;
            
            return { success: true, data: data };
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: error.message };
        }
    },

    // Login user
    async login(email, password, rememberMe = false) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;
            
            // Jika login berhasil, simpan ke cookie (jika fungsi tersedia)
            if (data.user) {
                if (typeof window.saveAuthSession === 'function') {
                    window.saveAuthSession(email, rememberMe);
                }
                if (typeof window.trackLoginStats === 'function') {
                    window.trackLoginStats();
                }
            }
            
            return { success: true, data: data };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    },

    // Logout user
    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            // Hapus semua cookie auth saat logout (jika fungsi tersedia)
            if (typeof window.clearAuthSession === 'function') {
                window.clearAuthSession();
            }
            
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            // First try to get user from Supabase session
            const { data: { user }, error } = await supabase.auth.getUser();
            
            // If no error and user exists, return user
            if (!error && user) {
                return { success: true, user: user };
            }
            
            // If AuthSessionMissingError, it's expected for non-authenticated users
            if (error && error.message.includes('Auth session missing')) {
                return { success: true, user: null };
            }
            
            // For other errors, throw them
            if (error) throw error;
            
            return { success: true, user: null };
        } catch (error) {
            console.error('Get user error:', error);
            
            // If session missing, it's not really an error - user just not logged in
            if (error.message.includes('Auth session missing')) {
                return { success: true, user: null };
            }
            
            return { success: false, error: error.message };
        }
    },

    // Check if user is authenticated
    async isAuthenticated() {
        const { success, user } = await this.getCurrentUser();
        return success && user !== null;
    },

    // Listen to auth state changes
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    },

    // Get session
    async getSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            
            // If AuthSessionMissingError, return null session (not an error)
            if (error && error.message.includes('Auth session missing')) {
                return { success: true, session: null };
            }
            
            if (error) throw error;
            
            return { success: true, session: session };
        } catch (error) {
            console.error('Get session error:', error);
            
            // Handle session missing as normal case
            if (error.message.includes('Auth session missing')) {
                return { success: true, session: null };
            }
            
            return { success: false, error: error.message };
        }
    },

    // Check if user has remember me enabled
    hasRememberMe() {
        if (typeof window.hasRememberMe === 'function') {
            return window.hasRememberMe();
        }
        return false;
    },

    // Get remembered email for auto-fill
    getRememberedEmail() {
        if (typeof window.getAuthSession === 'function') {
            const session = window.getAuthSession();
            return session.email || '';
        }
        return '';
    },

    // Get login statistics
    getLoginStats() {
        if (typeof window.getLoginStats === 'function') {
            return window.getLoginStats();
        }
        return { totalLogins: 0, lastLoginDate: null, lastLoginTime: null };
    },

    // Initialize auth system and check for valid session
    async initAuth() {
        try {
            // Check if we have a valid Supabase session
            const { success, session } = await this.getSession();
            
            if (success && session && session.user) {
                // Valid session exists, user is authenticated
                console.log('Valid session found:', session.user.email);
                return { authenticated: true, user: session.user };
            }
            
            // No valid session, check for remember me cookie
            if (typeof window.hasRememberMe === 'function' && window.hasRememberMe()) {
                console.log('No active session but remember me is enabled');
                // Clear cookie since session is invalid
                if (typeof window.clearAuthSession === 'function') {
                    window.clearAuthSession();
                }
            }
            
            return { authenticated: false, user: null };
        } catch (error) {
            console.error('Auth initialization error:', error);
            
            // Clear potentially corrupted cookies
            if (typeof window.clearAuthSession === 'function') {
                window.clearAuthSession();
            }
            
            return { authenticated: false, user: null };
        }
    }
};

// Auth Guard - Protect pages that require authentication
async function requireAuth() {
    const { success, user } = await Auth.getCurrentUser();
    
    if (!success || !user) {
        // User not authenticated, redirect to login
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Redirect if already authenticated (for login/register pages)
async function redirectIfAuthenticated() {
    const { success, user } = await Auth.getCurrentUser();
    
    if (success && user) {
        // User already authenticated, redirect to dashboard
        window.location.href = 'dashboard.html';
        return true;
    }
    
    return false;
}
