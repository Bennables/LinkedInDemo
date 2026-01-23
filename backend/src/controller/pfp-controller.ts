import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = './uploads/pfp';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const pfpEndpoint: Endpoint = {
    async get(req, res){
        try {
            const id = req.params.id || 0;
            if (!id) {
                return res.status(400).json({error: "Image ID required"});
            }
            
            const image = await prisma.accountImages.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            console.log(image)
            
            if (!image) {
                return res.status(404).json({error: "Image not found"});
            }
            
            res.status(200).json({data: image});
            
        } catch(e: any) {
            res.status(400).json({error: e.message});
        }
    },
    async post(req, res){
        try {
            const { userId } = req.body;
            const file = req.file || null;
            
            if (!userId || !file) {
                return res.status(400).json({error: "userId and image file required"});
            }
            
            // Get user's current profile pic
            const user = await prisma.user.findUnique({
                where: { id: parseInt(userId) },
                select: { prof_pic_id: true }
            });
            
            // Generate unique filename
            const timestamp = Date.now();
            const filename = `${userId}-${timestamp}-${file.originalname}`;
            const filepath = path.join(UPLOAD_DIR, filename);
            
            // Save file to disk
            fs.writeFileSync(filepath, file.buffer);
            
            // Create new image record with path
            const newImage = await prisma.accountImages.create({
                data: {
                    imgpath: `/uploads/pfp/${filename}`
                }
            });
            
            // Delete old image file and database record if it exists
            if (user?.prof_pic_id) {
                try {
                    const oldImage = await prisma.accountImages.findUnique({
                        where: { id: user.prof_pic_id }
                    });
                    
                    if (oldImage?.imgpath) {
                        const oldFilepath = path.join('.', oldImage.imgpath);
                        if (fs.existsSync(oldFilepath)) {
                            fs.unlinkSync(oldFilepath);
                        }
                    }
                    
                    await prisma.accountImages.delete({
                        where: { id: user.prof_pic_id }
                    });
                } catch(e) {
                    console.log("Could not delete old image");
                }
            }
            
            // Update user with new image
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(userId) },
                data: { prof_pic_id: newImage.id }
            });
            
            res.status(200).json({data: {image: newImage, user: updatedUser}});
        } catch(e: any) {
            res.status(400).json({error: e.message});
        }
    },
    async put(req, res){
        console.log("UPDATE endpoint has not been implemented")
    },
    async delete(req, res){
        console.log("DELETE endpoint has not been implemented")
    }
}

export default pfpEndpoint as Endpoint;