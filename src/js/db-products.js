// ========================================
// Database Products - Supabase CRUD Operations
// ========================================

const ProductsDB = {
    // Create: Tambah produk baru ke Supabase
    async create(productData) {
        try {
            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                throw new Error('User not authenticated');
            }

            // Prepare product data
            const product = {
                user_id: user.id,
                name: productData.name,
                category: productData.category,
                price: parseInt(productData.price),
                description: productData.description,
                image: productData.image || null
            };

            // Insert to Supabase
            const { data, error } = await supabase
                .from('products')
                .insert([product])
                .select()
                .single();

            if (error) throw error;

            console.log('✅ Product created:', data);
            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error creating product:', error);
            return { success: false, error: error.message };
        }
    },

    // Read: Ambil semua produk user dari Supabase
    async getAll() {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                throw new Error('User not authenticated');
            }

            // Get products dari Supabase (RLS akan filter by user_id otomatis)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            console.log(`✅ Loaded ${data.length} products from Supabase`);
            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error loading products:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    // Read: Ambil satu produk by ID
    async getById(productId) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) throw error;

            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error getting product:', error);
            return { success: false, error: error.message };
        }
    },

    // Update: Update produk di Supabase
    async update(productId, productData) {
        try {
            // Prepare update data
            const updates = {
                name: productData.name,
                category: productData.category,
                price: parseInt(productData.price),
                description: productData.description,
                image: productData.image || null
            };

            // Update di Supabase
            const { data, error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', productId)
                .select()
                .single();

            if (error) throw error;

            console.log('✅ Product updated:', data);
            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error updating product:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete: Hapus produk dari Supabase
    async delete(productId) {
        try {
            const { data, error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId)
                .select()
                .single();

            if (error) throw error;

            console.log('✅ Product deleted:', data);
            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error deleting product:', error);
            return { success: false, error: error.message };
        }
    },

    // Get products by category
    async getByCategory(category) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error getting products by category:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    // Search products by name
    async search(searchTerm) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .ilike('name', `%${searchTerm}%`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { success: true, data: data };

        } catch (error) {
            console.error('❌ Error searching products:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    // Get products count
    async count() {
        try {
            const { count, error } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            if (error) throw error;

            return { success: true, count: count };

        } catch (error) {
            console.error('❌ Error counting products:', error);
            return { success: false, error: error.message, count: 0 };
        }
    },

    // Get category distribution for dashboard
    async getCategoryStats() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('category');

            if (error) throw error;

            // Count by category
            const stats = {};
            data.forEach(product => {
                stats[product.category] = (stats[product.category] || 0) + 1;
            });

            return { success: true, data: stats };

        } catch (error) {
            console.error('❌ Error getting category stats:', error);
            return { success: false, error: error.message, data: {} };
        }
    }
};

// Export ke global scope
window.ProductsDB = ProductsDB;
