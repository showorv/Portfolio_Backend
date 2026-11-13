import { Schema, model } from "mongoose";

// One document holds all the editable text and links of the landing page.
// The frontend falls back to its built-in defaults until this is first saved.

export interface ISite {
    key: string
    hero: {
        name: string
        roles: string[]
        badge: string
        intro: string
        image: string
        experience: string
        resumeUrl: string
    }
    about: {
        subtitle: string
        image: string
        paragraphs: string[]
        traits: string[]
    }
    education: { year: string; title: string; institute: string; details: string[] }[]
    certificates: { title: string; org: string; year: string; link: string }[]
    contact: {
        email: string
        phone: string
        github: string
        linkedin: string
    }
}

const text = { type: String, trim: true, default: "" }

const siteSchema = new Schema<ISite>(
    {
        key: { type: String, default: "main", unique: true },
        hero: {
            name: text,
            roles: { type: [String], default: [] },
            badge: text,
            intro: text,
            image: text,
            experience: text,
            resumeUrl: text,
        },
        about: {
            subtitle: text,
            image: text,
            paragraphs: { type: [String], default: [] },
            traits: { type: [String], default: [] },
        },
        education: [
            {
                _id: false,
                year: text,
                title: text,
                institute: text,
                details: { type: [String], default: [] },
            },
        ],
        certificates: [
            {
                _id: false,
                title: text,
                org: text,
                year: text,
                link: text,
            },
        ],
        contact: {
            email: text,
            phone: text,
            github: text,
            linkedin: text,
        },
    },
    { timestamps: true, minimize: false }
);

export const Site = model<ISite>("Site", siteSchema);
