import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // Vérification du webhook
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        
        await whook.verify(JSON.stringify(req.body), headers);

        // Extraction des données
        const { data, type } = req.body;
        
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.name,
            image: data.image_url,
        };

        // Gestion des différents types d'événements
        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
                
            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
                
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
                
            default:
                return res.status(400).json({ message: "Event type not supported" });
        }

        // Réponse en cas de succès
        res.status(200).json({ message: "success" });

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(500).json({ message: "failed", error: error.message });
    }
};

export default clerkWebhooks;