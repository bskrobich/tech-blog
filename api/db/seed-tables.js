import {closeDatabaseConnection, connectToDatabase, db} from './db.js';
import bcrypt from "bcryptjs";
import moment from "moment";

const roles = [
    { name: 'Admin' },
    { name: 'Author' },
    { name: 'User' }
];

const categories = [
    { name: 'Tech' },
    { name: 'Politics' },
    { name: 'Science' },
    { name: 'Entertainment' },
    { name: 'AI' }
];

const users = [
    { username: 'admin', password: 'admin', email: 'admin@geekspeak.com', role_id: 1 },
    { username: 'author_a', password: 'author_a', email: 'author_a@geekspeak.com', role_id: 2 },
    { username: 'author_b', password: 'author_b', email: 'author_b@geekspeak.com', role_id: 2 },
    { username: 'user_a', password: 'user_a', email: 'user_a@geekspeak.com', role_id: 3 },
    { username: 'user_b', password: 'user_b', email: 'user_b@geekspeak.com', role_id: 3 },
];

const posts = [
    {
        title: 'Trump asks the Supreme Court to let him rescue TikTok',
        content: 'The President-elect wants to save TikTok from a US ban through “political means once he takes office.”',
        image_url: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1334/750x500/filters:focal(1020x667:1021x668):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25334825/STK466_ELECTION_2024_CVirginia_E.jpg',
        user_id: 2,
        category_id: 2
    },
    {
        title: 'Instagram profile grids are going to feature rectangles',
        content: 'Instagram’s profile grids will display content as rectangles instead of squares as part of a change rolling out “over the weekend,” Instagram chief Adam Mosseri said in an Instagram Story on Friday.',
        image_url: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/1200x800/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/23904518/VRG_Illo_K_Radtke_STK070_Instagram_1.jpg',
        user_id: 3,
        category_id: 1
    },
    {
        title: 'A first look at Nvidia’s flagship RTX 5090 compared to the RTX 4090',
        content: 'Nvidia has squeezed its latest GPU into a two-slot card that’s a lot smaller than the previous generation.',
        image_url: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2640x1749/1200x800/filters:focal(1320x875:1321x876):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25838981/twarren_rtx5090_3.jpg',
        user_id: 2,
        category_id: 1
    },
    {
        title: 'TikTok says it will go offline on Sunday if Biden doesn’t intervene',
        content: 'TikTok wants the outgoing administration to assure its ‘most critical service providers’ that they won’t be liable for breaking the law.',
        image_url: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1334/1200x800/filters:focal(1020x667:1021x668):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25829977/STK051_TIKTOKBAN_B_CVirginia_C.jpg',
        user_id: 3,
        category_id: 2
    },
];

const comments = [
    {
        content: 'Great article!',
        user_id: 4,
        post_id: 1
    },
    {
        content: 'Very informative.',
        user_id: 5,
        post_id: 1
    },
    {
        content: 'Is there a ‘Like’ button for comments? Because this one deserves one.',
        user_id: 4,
        post_id: 2
    },
    {
        content: 'Well, you’ve officially convinced me to read more from you. Consider me a fan now!',
        user_id: 5,
        post_id: 2
    },
    {
        content: 'This was a solid read!',
        user_id: 4,
        post_id: 3
    },
    {
        content: 'I really liked the article.',
        user_id: 5,
        post_id: 3
    },
    {
        content: 'Is there a ‘Like’ button for comments? Because this one deserves one.',
        user_id: 4,
        post_id: 4
    },
    {
        content: 'Well, you’ve officially convinced me to read more from you. Consider me a fan now!',
        user_id: 5,
        post_id: 4
    }
];

async function seedRoles() {
    for (const role of roles) {
        const sql = `INSERT INTO role (name) VALUES ($1)`;
        try {
            await db.query(sql, [role.name]);
        } catch (error) {
            console.error('Error inserting roles:', err);
        }
    }
    console.log(`Roles insert complete.`);
}

async function seedCategories() {
    for (const category of categories) {
        const sql = `INSERT INTO category (name) VALUES ($1)`;
        try {
            await db.query(sql, [category.name]);
        } catch (err) {
            console.error('Error inserting category:', err);
        }
    }
    console.log(`Categories insert complete.`);
}

async function seedUsers() {
    for (const user of users) {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        const sql = `INSERT INTO "user" (username, password, email, role_id) VALUES ($1, $2, $3, $4)`;
        try {
            const values = [
                user.username,
                hash,
                user.email,
                user.role_id
            ]
            await db.query(sql, values);
        } catch (err) {
            console.error('Error inserting user:', err);
        }
    }
    console.log(`Users insert complete.`);
}

async function seedPosts() {
    for (const post of posts) {
        const sql = `INSERT INTO post (title, content, image_url, created_at, updated_at, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        try {
            const values = [
                post.title,
                post.content,
                post.image_url,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                post.user_id,
                post.category_id
            ];
            await db.query(sql, values);
        } catch (err) {
            console.error('Error inserting post:', err);
        }
    }
    console.log(`Posts insert complete.`);
}

async function seedComments() {
    for (const comment of comments) {
        const sql = `INSERT INTO comment (content, created_at, user_id, post_id) VALUES ($1, $2, $3, $4)`;
        try {
            const values = [
                comment.content,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                comment.user_id,
                comment.post_id
            ];
            await db.query(sql, values);
        } catch (err) {
            console.error('Error inserting comment:', err);
        }
    }
    console.log(`Comments insert complete.`);
}

export const seedDatabase = async () => {
    try {
        await connectToDatabase();
        await seedRoles();
        await seedCategories();
        await seedUsers();
        await seedPosts();
        await seedComments();
        console.log("Tables seeded successfully.");
    } catch (err) {
        console.error("Error creating tables:", err.message);
    } finally {
        await closeDatabaseConnection();
        process.exit(0);
    }
};

seedDatabase();