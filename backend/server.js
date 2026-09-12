const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const { createClient } = require("@supabase/supabase-js");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// SUPABASE CONNECTION
// ================================

console.log(
    "SUPABASE URL:",
    process.env.SUPABASE_URL ? "FOUND" : "MISSING"
);

console.log(
    "SUPABASE KEY:",
    process.env.SUPABASE_KEY ? "FOUND" : "MISSING"
);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "NEXORA AI AGENCY Backend is running!"
    });
});

// ================================
// CONTACT FORM
// ================================

app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            company,
            service,
            message
        } = req.body;

        console.log("");
        console.log("CONTACT REQUEST RECEIVED");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Company:", company);
        console.log("Service:", service);
        console.log("Message:", message);

        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });

        }

        const { data, error } = await supabase
            .from("contacts")
            .insert([
                {
                    name: name,
                    email: email,
                    company: company || null,
                    service: service || null,
                    message: message
                }
            ])
            .select();

        if (error) {

            console.error("");
            console.error("========== SUPABASE ERROR ==========");
            console.error(error);
            console.error("====================================");
            console.error("");

            return res.status(500).json({
                success: false,
                message: "Message could not be saved."
            });
        }

        console.log("");
        console.log("MESSAGE SAVED TO SUPABASE ✅");
        console.log(data);
        console.log("");

        return res.status(201).json({
            success: true,
            message: "Message saved successfully!"
        });

    } catch (error) {

        console.error("");
        console.error("========== SERVER ERROR ==========");
        console.error(error);
        console.error("==================================");
        console.error("");

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
});

// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

    console.log("");
    console.log(
        `NEXORA AI AGENCY Backend running on http://localhost:${PORT}`
    );
    console.log("");

});

