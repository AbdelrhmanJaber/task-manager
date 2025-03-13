class baseTaskRepository {
  constructor(model) {
    this.model = model;
  }

  async getByID(id, populateFields = []) {
    return await this.model.findById(id).populate(populateFields);
  }

  async getAll() {
    return await this.model.find().lean();
  }

  async create(date) {
    return await this.model.create(date);
  }

  async update(id, updatedData) {
    return await this.model.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default baseTaskRepository;
