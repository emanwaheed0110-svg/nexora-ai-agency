const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./backend/.env" });

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "NEXORA AI AGENCY Backend is running!"
    });
});

app.post("/api/contact", async (req, res) => {
    try {
        const {
            name,
            email,
            company,
            service,
            message
        } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        const { data, error } = await supabase
            .from("contacts")
            .insert([{
                name,
                email,
                company: company || null,
                service: service || null,
                message
            }])
            .select();

        if (error) {
            console.error("SUPABASE ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Message could not be saved."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Message saved successfully!"
        });

    } catch (error) {
        console.error("SERVER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
});

module.exports = app;
