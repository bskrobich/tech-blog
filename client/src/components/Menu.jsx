import React from 'react';

function Menu() {
    const posts =
        [
            {
                id: 1,
                title: "Kindle Scribe (2024) review: nothing to write home about",
                content: "Amazon’s finally added a key feature to the Scribe, but it has a long way to go before it’s actually useful.",
                image_url: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2590x1788/750x500/filters:focal(1295x894:1296x895):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25803641/247455_Kindle_Scribe_SVasani_0001.jpg"
            },
            {
                id: 2,
                title: "Trump asks the Supreme Court to let him rescue TikTok",
                content: "The President-elect wants to save TikTok from a US ban through “political means once he takes office.”",
                image_url: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1334/750x500/filters:focal(1020x667:1021x668):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25334825/STK466_ELECTION_2024_CVirginia_E.jpg"
            },
            {
                id: 3,
                title: "Hackers hijacked legitimate Chrome extensions to try to steal data",
                content: "A phishing attack that put malicious code in the Cyberhaven data protection extension appears to be part of a broader campaign.",
                image_url: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/750x500/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/23249791/VRG_ILLO_STK001_carlo_cadenas_cybersecurity_virus.jpg"
            }
        ]

    return (
        <div className="menu">
            <h1>More from Geek Speak</h1>
            {posts.map( post => (
                <div className="post" key={post.id}>
                    <img src={post.image_url} alt=""/>
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>
            ))}
        </div>
    );
}

export default Menu;