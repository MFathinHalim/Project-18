import { nanoid } from "nanoid"; // Import nanoid
import { cardModel } from "@/models/model";
import dbConnect from "@/utils/mongoose";
await dbConnect();

class ControllerCard {
  static instance;
  #cards;

  constructor() {
    this.#cards = cardModel;
  }

  static getInstance() {
    if (!ControllerCard.instance) ControllerCard.instance = new ControllerCard();
    return ControllerCard.instance;
  }

  async add(data) {
    try {
      // Tambahkan ID unik menggunakan nanoid
      const post = new this.#cards({
        ...data,
        uid: nanoid(), // Generate unique ID
      });
      const result = await post.save();
      return result;
    } catch (error) {
      throw new Error(`Error adding post: ${error.message}`);
    }
  }

  async get(filter = {}) {
    try {
      const posts = await this.#cards.find(filter); // Perbaiki penggunaan model
      return posts;
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }
}

export default ControllerCard;