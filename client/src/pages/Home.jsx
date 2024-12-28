import React from 'react';
import {Link} from "react-router";

function Home() {
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
            },
            {
                id: 4,
                title: "The USB-C charging mandate arrives in the EU — here’s what that means",
                content: "The common charging standard brings USB PD support, improved labelling, and less e-waste.",
                image_url: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/640x640/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/16294981/akrales_190522_3440_0067.jpg"
            }
        ]

    return (
        <div className="homepage">
            <div className="posts">
                {posts.map( post => (
                    <div className="post" key={post.id}>
                        <div className="image">
                            <img src={post.image_url} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <button>Read more</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;