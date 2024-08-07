import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  debugger;
  await mongooseConnect();

  if (method === "POST") {
    const { title, description, price, images } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
    });
    res.json(productDoc);
  }

  if(method === 'DELETE'){
    if(req.query?.id){
      await Product.deleteOne({_id: req.query?.id})
      res.json(true)
    }
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findById(req.query.id));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const { title, description, price, images, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images });
    res.json(true)
  }
}
