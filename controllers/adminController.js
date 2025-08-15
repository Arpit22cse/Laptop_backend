const Laptop = require('../models/Laptop');
const Order = require('../models/Order');
const User = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');
const streamifier = require('streamifier');

class AdminController{
    
    async getOrders(req,res){
        try {
            const orders = await Order.find().limit(10);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error });
        }
    }

    async addLaptop(req, res) {
        try {
            
            const laptopData = {
                name: req.body.name,
                brand: req.body.brand,
                processor: req.body.processor,
                ram: req.body.ram,
                storage: req.body.storage,
                graphics: req.body.graphics,
                display: req.body.display,
                price: parseFloat(req.body.price),
                originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : undefined,
                description: req.body.description,
                features: Array.isArray(req.body.features) ? req.body.features : req.body.features?.split('\n').filter(f => f.trim()) || [],
                rating: parseFloat(req.body.rating) || 4.5,
                reviews: parseInt(req.body.reviews) || 0,
                image: req.body.image || 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
                images: []
            };
            
            const laptop = new Laptop(laptopData);
            const savedLaptop = await laptop.save();

            const uploadedUrls = [];
            
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map((file, index) => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = require('cloudinary').v2.uploader.upload_stream(
                            {
                                folder: 'laptops',
                                public_id: `${savedLaptop._id}_${index}`,
                                overwrite: true,
                                resource_type: 'image'
                            },
                            (error, result) => {
                                if (result) resolve(result.secure_url);
                                else reject(error);
                            }
                        );
                        streamifier.createReadStream(file.buffer).pipe(uploadStream);
                    });
                });

                const results = await Promise.all(uploadPromises);
                uploadedUrls.push(...results);
            }

            savedLaptop.images = uploadedUrls;
            await savedLaptop.save();

            res.status(201).json(savedLaptop);
        } catch (error) {
            console.error('Error adding laptop:', error);
            res.status(400).json({ 
                message: 'Error adding laptop', 
                error: error.message 
            });
        }
    }

    async updateLaptop(req, res) {
        try {
            const { id } = req.params;
            const updatedLaptop = await Laptop.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedLaptop) {
                return res.status(404).json({ message: 'Laptop not found' });
            }
            res.status(200).json(updatedLaptop);
        } catch (error) {
            res.status(400).json({ message: 'Error updating laptop', error });
        }
    }

    async deleteLaptop(req, res) {
        try {
            const { id } = req.params;
            const deletedLaptop = await Laptop.findByIdAndDelete(id);
            if (!deletedLaptop) {
                return res.status(404).json({ message: 'Laptop not found' });
            }
            res.status(200).json({ message: 'Laptop deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting laptop', error });
        }
    }
}

module.exports = new AdminController();
