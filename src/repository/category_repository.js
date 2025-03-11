import Category from "../models/category.js";

class categoryRepository {
  static async getCategoryByID(categoryID) {
    return await Category.findById(categoryID);
  }

  static async getAllCategories() {
    return await Category.find().lean();
  }

  static async createCategory(newCategory) {
    return await Category.create(newCategory);
  }

  static async updateCategory(categoryID, updatedCategory) {
    return await Category.findByIdAndUpdate(
      categoryID,
      { $set: updatedCategory },
      { new: true, runValidators: true }
    );
  }

  static async deleteCategory(categoryID) {
    return await Category.findByIdAndDelete(categoryID);
  }
}

export default categoryRepository;
