const Product = require('../model/product');

/**
 * Update expired "new" products
 * This function finds all products that are marked as new but have passed their expiry date,
 * and updates them to no longer be new
 */
const updateExpiredNewProducts = async () => {
    try {
        const currentDate = new Date();
        
        // Find all products that are marked as new and have an expiry date that has passed
        const result = await Product.updateMany(
            { 
                isNewProduct: true,
                newProductExpiry: { $lt: currentDate }
            },
            {
                $set: { 
                    isNewProduct: false,
                    newProductExpiry: null
                }
            }
        );
        
        console.log(`Updated ${result.modifiedCount} expired new products`);
        return result.modifiedCount;
    } catch (error) {
        console.error('Error updating expired products:', error);
        throw error;
    }
};

module.exports = {
    updateExpiredNewProducts
}; 